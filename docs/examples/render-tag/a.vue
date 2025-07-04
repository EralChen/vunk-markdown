<script lang="ts" setup>
import type { __VkMarkdown } from '@vunk/markdown'
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'
import { ref } from 'vue'

const currentText = ref(`
### Link
[Baidu](https://www.baidu.com)

`)

function getAttrsObj (raw: __VkMarkdown.GroupToken) {
  return raw.open.attrs
    ? raw.open.attrs.reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    : {}
}
</script>

<template>
  <div h-140px>
    <VkMarkdown :source="currentText" :tags="['a']">
      <VkTemplatesDefault />

      <VkRendererTemplate
        type="tag:a"
      >
        <template #default="{ raw }">
          <el-link
            v-bind="getAttrsObj(raw)"
            target="_blank"
          >
            {{ raw.children[0].content }}
          </el-link>
        </template>
      </VkRendererTemplate>
    </VkMarkdown>
  </div>
</template>
