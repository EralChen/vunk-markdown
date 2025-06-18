<script lang="ts" setup>
import type { Ref } from 'vue'
import { VkDuplexCalc } from '@vunk/core'
import { ElScrollbar } from 'element-plus'
import { defineAsyncComponent, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const AppMain = defineAsyncComponent(() => import('./app-main.vue'))
const LayoutHeader = defineAsyncComponent(() => import('_c/LayoutTop/index.vue'))
const TagsView = defineAsyncComponent(() => import('_c/TagsView/index.vue'))
const LayoutAside = defineAsyncComponent(() => import('_c/LayoutAside/index.vue'))
const BreadcrumbVue = defineAsyncComponent(() => import('_c/Breadcrumb/index.vue'))

const headerReady = ref(false)
const asideReady = ref(false)
const scrollbarNode = ref() as Ref<InstanceType<typeof ElScrollbar>>

onBeforeRouteUpdate(() => {
  setTimeout(() => {
    scrollbarNode.value?.update()
  }, 400)
})
</script>

<template>
  <VkDuplexCalc class="layout-default">
    <template #one>
      <LayoutHeader
        @load="headerReady = true"
      ></LayoutHeader>
    </template>

    <div
      sk-flex
      class="h-100%"
    >
      <div class="layout-default-aside-x">
        <LayoutAside
          v-if="headerReady"
          @load="asideReady = true"
        ></LayoutAside>
      </div>

      <VkDuplexCalc
        v-if="asideReady"
        class="flex-1 overflow-hidden"
        height-property="--zz-page-height"
      >
        <template #one>
          <TagsView></TagsView>
          <!-- <BreadcrumbVue></BreadcrumbVue> -->
        </template>

        <ElScrollbar ref="scrollbarNode">
          <AppMain></AppMain>
        </ElScrollbar>
      </VkDuplexCalc>
    </div>
  </VkDuplexCalc>
</template>

<style>
.layout-default {
  --layout-aside-width: 250px;
}

.layout-default>.vk-duplex-calc-two {
  background-color: var(--el-fill-color);
}
</style>

<style>
.layout-default-aside-x,
.layout-default {
  height: 100%;

}

.layout-default-main {
  width: 100%;
}
</style>
