<script lang="ts" setup>
import type MarkdownIt from 'markdown-exit'
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { VkMarkdown } from '@vunk/markdown'

const source = `
[baidu](https://www.baidu.com)
`

function handleMarkdownItSetup (md: MarkdownIt) {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    // 添加 target="_blank" 属性
    token.attrSet('target', '_blank')

    return self.renderToken(tokens, idx, options)
  }
}
</script>

<template>
  <VkMarkdown
    :source="source"
    :markdown-it-setup="handleMarkdownItSetup"
  >
    <VkTemplatesDefault />
  </VkMarkdown>
</template>
