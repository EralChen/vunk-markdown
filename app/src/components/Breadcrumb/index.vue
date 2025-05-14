<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { compile } from 'path-to-regexp'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const levelList = computed(() => {
  const matched = route.matched.filter((item) => {
    return item.meta
      && item.meta.title
      && (item.meta.breadcrumb ?? true)
  })
  return matched
})

function pathCompile (path: string) {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
function handleLink (item: RouteLocationMatched) {
  const { redirect, path } = item
  if (redirect) {
    typeof redirect !== 'function'
    && router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}
</script>

<template>
  <ElBreadcrumb
    class="pa-page breadcrumb"
    separator=">"
  >
    <ElBreadcrumbItem
      v-for="(item, index) in levelList"
      :key="item.path + index"
    >
      <a
        @click.prevent="handleLink(item)"
      >
        {{ item.meta.title }}
      </a>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style scoped>
.breadcrumb{
  height: 40px;
}
</style>
