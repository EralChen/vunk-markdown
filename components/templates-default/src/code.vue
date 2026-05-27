<script lang="ts" setup>
import { VkMonacoEditor } from '@vunk/plus/components/monaco-editor'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'javascript',
  },
})
</script>

<template>
  <div :style="{ height: '300px' }">
    <VkMonacoEditor
      :model-value="modelValue"
      :default-options="{
        language: 'javascript',
      }"
    ></VkMonacoEditor>
  </div>
</template>
