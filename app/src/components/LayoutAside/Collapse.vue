<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
</script>

<template>
  <div
    class="layout-default-aside-collapse"
    @click="layoutStore.asideInfo.menuCollapse = !layoutStore.asideInfo.menuCollapse"
  >
    <el-icon
      size="1.2em"
    >
      <component :is="layoutStore.asideInfo.menuCollapse ? ArrowRight : ArrowLeft" />
    </el-icon>
  </div>
</template>

<style>
.layout-default-aside-collapse{
  width: 1em;
  height: 1em;
  padding: 2em 0em;
  display: flex;
  align-items: center;
}
</style>
