<script lang="ts" setup>
import { katex } from '@mdit/plugin-katex'
import { VkMarkdown, VkRendererTemplate, VkRendererTemplates, VkTemplatesDefault } from '@vunk/markdown'
import txt from './demo.txt?raw'

const data = txt
</script>

<template>
  <VkRendererTemplates>
    <VkTemplatesDefault />
    <VkRendererTemplate type="math_block">
      <template #default="{ raw, md }">
        <div
          class="vk-math-block"
          v-html="md.renderer.render([raw])"
        ></div>
      </template>
    </VkRendererTemplate>

    <VkRendererTemplate type="math_inline">
      <template #default="{ raw, md }">
        <span
          class="vk-math-inline"
          v-html="md.renderer.render([raw])"
        ></span>
      </template>
    </VkRendererTemplate>

    <VkMarkdown
      :source="data"
      :markdown-it-setup="md => md.use(katex)"
      :dev="true"
    >
    </VkMarkdown>
  </VkRendererTemplates>
</template>
