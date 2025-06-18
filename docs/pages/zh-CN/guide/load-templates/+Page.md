# Load Templates 按需装载

由于 `Markdown` 渲染通常会使用到不同的第三方库。

虽然我们提供了 [TemplatesContainer](../../component/templates-container/+Page.md) 和 [TemplatesFence](../../component/templates-fence/+Page.md) 默认模板来支持常见的渲染需求，但这些模板可能会依赖于特定的第三方库。

通常情况下，我们并不需要全量的模板，而是根据实际需要按需装载。

## 单独引入

在 @vunk/markdown 中，依赖了第三方的模板你需要从 `@vunk/markdown/components/xxx` 中单独引入。

你可以从 组件 - [模板](../../component/template-echarts/+Page.md) 看到有哪些独立模板可用

+ [TemplateEcharts](../../component/template-echarts/+Page.md)
+ [TemplateMermaid](../../component/template-mermaid/+Page.md)
+ ...

实战中，只需要挑选你需要的模板组成渲染策略即可
```vue
<template>
  <VkRendererTemplates>
    <VkTemplatesDefault />
    <VkTemplateMermaid />

    <slot />
  </VkRendererTemplates>
</template>
```
