<script setup lang="ts">
import { VkMarkdown } from '@vunk/markdown/components/markdown'
import { VkTemplatesDefault } from '@vunk/markdown/components/templates-default'
import 'github-markdown-css/github-markdown-light.css'

const data = `
## 为现代 Markdown 场景设计

把静态 Markdown 升级为可组合的 Vue 组件树，适合 AI 输出、富文本和协议驱动页面。

| 能力 | 说明 |
| --- | --- |
| 输出 Vue 组件树 | 不再停留在 HTML 字符串层，而是直接生成可组合的 Vue 渲染结果，更容易接入现有业务组件。 |
| 策略化渲染模板 | 通过 StrategyRenderer 与模板组件组合渲染规则，让默认 Markdown、容器与围栏代码块都能按业务方式输出。 |
| 标签与容器扩展 | 可定制 tag、fence、container 三类入口，把表格、代码块或自定义语法升级成真正的组件节点。 |
| 兼容异步渲染 | 支持 renderAsync 工作流，适合需要远程数据、动态模板或流式内容更新的页面。 |
| 结构化内容友好 | 内置 resolver-json、resolver-toon 等解析能力，适合把 Markdown 与结构化协议一起渲染。 |
| 模板可按需拼装 | 可以从默认模板起步，再按业务需要叠加图表、表单、Mermaid 等模板，不必重写整个渲染链路。 |

`
</script>

<template>
  <main
    class="markdown-body w-full overflow-x-auto rounded-2xl border border-default/70 bg-default/90 p-4 shadow-lg shadow-primary/5 backdrop-blur sm:p-5"
  >
    <VkMarkdown
      :source="data"
    >
      <VkTemplatesDefault />
    </VkMarkdown>
  </main>
</template>

