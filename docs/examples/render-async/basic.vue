<script lang="ts" setup>
import { VkMarkdown, VkRendererTemplate, VkRendererTemplates, VkTemplatesDefault } from '@vunk/markdown'
import { codeToHtml } from 'shiki'
import { computed, ref } from 'vue'
import txt from './demo.txt?raw'
import FenceRender from './fence-render.vue'

const text = txt

// ref: https://markdown-exit.pages.dev/guide/rendering.html#async-rendering
async function highlight (code: string, lang: string) {
  return await codeToHtml(code, { lang, theme: 'nord' })
}

const currentIndex = ref(1)
const currentText = computed(() => {
  return text.slice(0, currentIndex.value + 1)
})

const interval = setInterval(() => {
  if (currentIndex.value < text.length) {
    currentIndex.value++
  }
  else {
    clearInterval(interval)
  }
}, 50)
</script>

<template>
  <VkRendererTemplates>
    <VkTemplatesDefault />

    <!-- 使用 async-rendering 覆写 fence 渲染 -->
    <VkRendererTemplate type="fence">
      <template #default="{ raw, md }">
        <FenceRender
          :md="md"
          :token="raw"
        ></FenceRender>
      </template>
    </VkRendererTemplate>

    <VkMarkdown
      :source="currentText"
      :markdown-it-options="{
        highlight,
      }"
      :dev="true"
    >
    </VkMarkdown>
  </VkRendererTemplates>
</template>
