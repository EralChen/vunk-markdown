<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import { SkAppIcon } from '@skzz/platform/components/app-icon'
import { VkRoutesMenuContent } from '@vunk/skzz/components/routes-menu-content'
import LinkVue from '_c/MenuLink/index.vue'
import { filterDeep } from 'deepdash-es/standalone'
import { ElMenu } from 'element-plus'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { routes as constRoutes } from '@/router'

import { useViewsStore } from '@/stores/views'

const emit = defineEmits({
  load: null,
})
const route = useRoute()

const viewsStore = useViewsStore()

const navRoutes = computed(() => {
  return filterDeep([...constRoutes], (v) => {
    if (v.meta?.header) {
      // 暂存原始 children
      v.meta._children = [...v.children]
      return true
    }
  }, {
    childrenPath: ['children'],
  })
})

/* set base view */
const defaultHref = ref('')
onMounted(() => {
  watch(route, (v) => {
    const baseView = viewsStore.findBaseViewByFullPath(v.fullPath)

    if (baseView) {
      if (viewsStore.currentBaseView?.fullPath !== baseView.fullPath) {
        defaultHref.value = baseView.fullPath

        viewsStore.setCurrentBaseView({
          ...baseView,
          children: baseView.meta?._children as RouteRecordRaw[],
          fullPath: baseView.fullPath,
        })
      }
    }
  }, { immediate: true })
  emit('load')
})
/* set base view /> */
</script>

<template>
  <ElMenu
    mode="horizontal"
    class="layout-top-menu"
    :default-active="defaultHref"
    background-color="transparent"
  >
    <VkRoutesMenuContent :data="navRoutes">
      <template #item="{ data, href }">
        <LinkVue
          :is-menu="false"
          :data="data"
          :to="href"
        >
          <SkAppIcon
            v-if="data.meta?.icon"
            class="mb-.2"
            :icon="data.meta.icon"
          ></SkAppIcon>

          {{ viewsStore.addBaseViewToRecord(href, data) }}
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
            class="mb-.2"
            :icon="data.meta.icon"
          ></SkAppIcon>
        </LinkVue>

        <span>
          {{ data.meta?.title || data.meta?.name }}
          {{ viewsStore.addBaseViewToRecord(href, data) }}
        </span>
      </template>
    </VkRoutesMenuContent>
  </ElMenu>
</template>

<style>
.layout-top-menu .el-menu-item.is-active{
  font-weight: bold;
}
.layout-top-menu.el-menu--horizontal{
  border-bottom: none;
  /* margin-bottom: -1px; */
}

.layout-top-menu.el-menu--horizontal>.el-menu-item{
    border-bottom: none;
    padding-left: var(--layout-top-menu-item-space, 50px);
    padding-right: var(--layout-top-menu-item-space, 50px);
    /* margin-left: var(--layout-top-menu-item-space, 50px); */
}
</style>
