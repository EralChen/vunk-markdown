<script lang="ts" setup>
import type { MenuOptions } from '@imengyu/vue3-context-menu'
import type { AnyFunc } from '@vunk/core'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { Close } from '@element-plus/icons-vue'
import { ContextMenu, ContextMenuItem } from '@imengyu/vue3-context-menu'
import { ElScrollbar } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useViewsStore } from '@/stores/views'
import ActiveEffect from './active-effect.vue'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

interface ContextmenuState {
  current: RouteLocationNormalizedLoaded | null
  show: boolean
  options: MenuOptions
}

const router = useRouter()
const viewsStore = useViewsStore()

/* vue3 监听路由变化 */
viewsStore.collectingVisitedViews()

function linkClose (e: MouseEvent, route: RouteLocationNormalizedLoaded) {
  e.preventDefault()
  e.stopPropagation()
  handleCloseCurrent(route)
}
function linkClick (e: MouseEvent, navigate: AnyFunc) {
  e.preventDefault()
  navigate()
}

const contextmenuState = reactive({
  current: null,
  options: {
    x: 0,
    y: 0,
    minWidth: 210,
  },
  show: false,
}) as ContextmenuState

function onContextMenu (e: MouseEvent, route: RouteLocationNormalizedLoaded) {
  e.preventDefault()
  contextmenuState.current = route
  contextmenuState.options.x = e.x
  contextmenuState.options.y = e.y
  contextmenuState.show = true
}
function handleCloseCurrent (route: RouteLocationNormalizedLoaded | null) {
  if (!route)
    return
  const { item, index } = viewsStore.delVisitedView({
    fullPath: route.fullPath,
  })

  if (!item)
    return
  if (item.fullPath === route.fullPath) { // 将要关闭的路由是当前路由
    // 将路由跳转到 该路由的上一个路由
    const prevItem = viewsStore.visitedViews[index - 1]
    if (prevItem) {
      router.push(prevItem.fullPath)
    }
    else {
      // 如果没有上一个路由，跳转到后面的路由
      const nextItem = viewsStore.visitedViews[index]
      if (nextItem) {
        router.push(nextItem.fullPath)
      }
      else {
        // 如果没有后面的路由，跳转到首页
        router.push('/')
      }
    }
  }
}
function handleCloseOther (route: RouteLocationNormalizedLoaded | null) {
  if (!route)
    return
  viewsStore.setVisitedViews([route])

  if (route.fullPath !== router.currentRoute.value.fullPath) {
    router.replace(route.fullPath)
  }
}

function handleCloseRight (route: RouteLocationNormalizedLoaded | null) {
  if (!route)
    return
  const index = viewsStore.visitedViews.findIndex(
    item => item.fullPath === route.fullPath,
  )
  if (index === -1)
    return

  const leftViews = viewsStore.visitedViews.slice(0, index + 1)
  const rightViews = viewsStore.visitedViews.slice(index + 1)
  viewsStore.setVisitedViews(leftViews)

  // 如果当前路由在右侧，则说明当前路由已经被关闭了，需要跳转到左侧最后一个路由
  const inRight = rightViews.some(
    item => item.fullPath === router.currentRoute.value.fullPath,
  )

  if (inRight) {
    const lastLeft = leftViews[leftViews.length - 1]
    if (lastLeft) {
      router.replace(lastLeft.fullPath)
    }
  }
}

/* item 激活时 滚动条调整 */
const scrollbarNode = ref<InstanceType<typeof ElScrollbar>>()
function handleItemActive (itemInfo: {

  containerWidth: number
  scrollLeft: number

  offsetLeft: number
}) {
  const { containerWidth, scrollLeft, offsetLeft } = itemInfo

  const currentVisibleLeft = scrollLeft
  const currentVisibleRight = scrollLeft + containerWidth

  //  offsetLeft 在不在可视区域内
  if (
    offsetLeft < currentVisibleLeft
    || offsetLeft > currentVisibleRight
  ) {
    // 动画滚动
    scrollbarNode.value?.scrollTo({
      left: offsetLeft,
      behavior: 'smooth',
    })
  }
}
/* end of    item 激活时 滚动条调整 */
</script>

<template>
  <ElScrollbar
    ref="scrollbarNode"
    class="bg-bg-overlay tags-view"
  >
    <div sk-flex>
      <RouterLink
        v-for="item of viewsStore.visitedViews"
        :key="item.fullPath"
        :to="item.fullPath"
        :custom="true"
      >
        <template #default="{ navigate, href, isActive, isExactActive }">
          <a
            draggable="false"
            :href="href"
            class="decoration-none text-text-secondary ptb-s plr-m
           tags-view-item"
            sk-flex="row-around-center"
            :class="{
              'router-link-active': isActive,
              'router-link-exact-active': isExactActive,
            }"
            sub:ml-xxs
            @click="linkClick($event, navigate)"
            @contextmenu="onContextMenu($event, item)"
          >

            <ActiveEffect
              :is-active="isExactActive"
              @active="handleItemActive"
            >
            </ActiveEffect>

            <span>{{ item.meta.title || '未命名' }}</span>

            <span
              sk-flex="row_center"
              @click="linkClose($event, item)"
            >
              <ElIcon
                class="tags-view-icon-close"
                hover="bg-fill-darker"
              >
                <Close />
              </ElIcon>
            </span>

          </a>
        </template>
      </RouterLink>
    </div>

    <ContextMenu
      v-model:show="contextmenuState.show"
      :options="contextmenuState.options"
    >
      <ContextMenuItem
        @click="handleCloseCurrent(contextmenuState.current)"
      >
        关闭标签页
      </ContextMenuItem>

      <ContextMenuItem
        @click="handleCloseOther(contextmenuState.current)"
      >
        关闭其他标签页
      </ContextMenuItem>

      <ContextMenuItem
        @click="handleCloseRight(contextmenuState.current)"
      >
        关闭右侧标签页
      </ContextMenuItem>
    </ContextMenu>
  </ElScrollbar>
</template>

<style scoped>
.tags-view{
  overflow: initial;
}
.tags-view :deep(.el-scrollbar__bar.is-horizontal){
  margin-bottom: -8px;
}
</style>

<style>
.tags-view-item {
  flex-shrink: 0;
  min-width: 10em;
  height: 40px;
}

.tags-view-icon-close {
  visibility: hidden;
}

.tags-view-item:hover .tags-view-icon-close {
  visibility: initial;
}

.tags-view-item:hover {
  color: var(--el-color-primary);
}

.tags-view-item.router-link-exact-active {
  color: var(--el-color-primary);
  font-weight: bold;
}

.tags-view-item.router-link-exact-active .tags-view-icon-close {
  color: var(--el-text-color-secondary);
  visibility: initial;
}

.tags-view-item.router-link-exact-active .tags-view-icon-close:hover {
  color: var(--el-text-color-secondary);
}

.tags-view-icon-close {
  box-sizing: content-box;
  padding: 2px;
  border-radius: 50%;

}
</style>
