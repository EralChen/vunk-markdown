<script lang="ts" setup>
import type { AnyFunc } from '@vunk/core'
import type { Ref } from 'vue'
import { SkAppIcon } from '@skzz/platform/components/app-icon'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from '_c/MenuLink/index.vue'
import { ElMenu } from 'element-plus'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { routes as constRoutes } from '@/router'
import { useLayoutStore } from '@/stores/layout'
import { useViewsStore } from '@/stores/views'
import CollapseVue from './Collapse.vue'

const emit = defineEmits({
  load: null,
})

const viewsStore = useViewsStore()
const layoutStore = useLayoutStore()
const route = useRoute()
const menuNode = ref() as Ref<{ open: AnyFunc }>

const finalRoutes = computed(() => {
  return viewsStore.currentBaseView?.children || [...constRoutes]
})

function initOpenMenu () {
  if (layoutStore.asideInfo.menuCollapse) {
    return
  }
  const testIndex = route.matched.map(item => item.path)
  for (let i = 0; i < testIndex.length; i++) {
    const index = testIndex[i]
    try {
      menuNode.value.open(index)
      break
    }
    catch {
      continue
    }
  }
}

onMounted(async () => {
  watch(() => viewsStore.currentBaseView, async () => {
    await nextTick()
    initOpenMenu()
  }, { immediate: true })
  emit('load')
})
</script>

<template>
  <div class="layout-default-aside h-100%">
    <ElScrollbar>
      <ElMenu
        ref="menuNode"
        class="layout-default-aside-menu"
        :collapse="layoutStore.asideInfo.menuCollapse"
      >
        <VkRoutesMenuContent
          :data="finalRoutes"
          :base-path="viewsStore.currentBaseView?.fullPath || ''"
          popper-class="layout-default-aside-popper"
        >
          <template #item="{ data, href }">
            <LinkVue
              :is-menu="false"
              :data="data"
              :to="href"
            >
              <SkAppIcon
                v-if="data.meta?.icon"
                class="layout-default-aside-item-icon"
                :icon="data.meta.icon"
              />
            </LinkVue>
          </template>

          <template #itemTitle="{ data }">
            <span>{{ data.meta?.title || data.meta?.name }}</span>
          </template>

          <template #menuTitle="{ data, href }">
            <LinkVue
              :is-menu="true"
              :data="data"
              :to="href"
            >
              <SkAppIcon
                v-if="data.meta?.icon"
                class="layout-default-aside-item-icon"
                :icon="data.meta.icon"
              />
            </LinkVue>

            <span class="layout-default-aside-item-span"> {{ data.meta?.title || data.meta?.name }}</span>
          </template>
        </VkRoutesMenuContent>
      </ElMenu>
    </ElScrollbar>

    <CollapseVue class="layout-default-aside-collapse" />
  </div>
</template>

<style>
.layout-default-aside-menu[style*="--el-menu-level: 0"] > li{
  font-weight: bold;
}

.layout-default-aside-menu[style*="--el-menu-level: 0"] > li > ul{
  font-weight: initial;
}

.layout-default-aside-menu[style*="--el-menu-level:0"] > li{
  font-weight: bold;
}

.layout-default-aside-menu[style*="--el-menu-level:0"] > li > ul{
  font-weight: initial;
}

.layout-default-aside-collapse{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
  cursor: pointer;
  z-index: 2;
}
.layout-default-aside{
  position: relative;
}

.layout-default-aside-menu:not(.el-menu--collapse) {
  width: var(--layout-aside-width);
}
.layout-default-aside-menu {
  min-height: var(--vk-duplex-calc-resize-height);
}
.layout-default-aside-item-icon{
  margin-bottom: .2em;
}

.layout-default-aside:hover .layout-default-aside-collapse{
  opacity: 1;
}
.layout-default-aside-collapse{
  opacity: 0;
  transition: opacity 3s cubic-bezier(.15,.84,0,1.06);
}
</style>
