<script lang="ts" setup>
import { Hide, View } from '@element-plus/icons-vue'
import { VaGeojsonLayer } from '@vuesri/core'
import { VkAvatar } from '@vunk/plus/components/avatar'
import { ref } from 'vue'

defineProps({
  url: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

const visible = ref(false)
</script>

<template>
  <li sk-flex-row-between-center w-200px>
    <el-text size="large" class="select-none">
      {{ label }}
    </el-text>

    <VaGeojsonLayer
      :visible="visible"
      :url="url"
      geometry-type="polygon"
    ></VaGeojsonLayer>

    <VkAvatar
      :icon="View"
      cursor-pointer
      :color="visible ? 'var(--el-color-primary)' : 'var(--el-color-text-secondary)'"
      @click="visible = !visible"
    ></VkAvatar>
  </li>
</template>
