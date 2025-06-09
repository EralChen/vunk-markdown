# @vunk/markdown 介绍

@vunk/markdown 是一个基于 markdown-it 的增强型 Markdown 渲染库，专为现代 Vue3 应用设计。它的核心使命是 **增强 Markdown 内容在页面中的表现力**，通过 **自定义渲染策略** 将传统的 Markdown 文本转换为丰富的交互式组件。

## 🎯 核心价值

### 解决什么问题？

在现代应用中，特别是与 AI 大模型交互的场景下，我们经常需要：

- **渲染大模型的 Markdown 输出**：将 ChatGPT、Claude 等大模型生成的 Markdown 内容美观地展示在页面中
- **增强 Markdown 表现力**：超越传统 HTML 渲染，支持自定义组件、交互式元素
- **实时内容渲染**：支持流式渲染，适配打字机效果等动态展示需求
- **灵活的扩展能力**：根据业务需求定制特殊的 Markdown 语法和渲染效果

### 与传统方案的区别

| 传统 Markdown 渲染器 | @vunk/markdown |
|---------------------|----------------|
| 直接输出 HTML 字符串 | 输出 Vue 组件树 |
| 固定的渲染样式 | 完全可定制的组件模板 |
| 静态内容展示 | 支持交互式组件 |
| 扩展性有限 | 基于策略模式的无限扩展 |

## 🚀 快速上手

:::demo
introduction/basic
:::

```vue
<VkMarkdown
  :source="markdownContent"
  :containers="['echarts']"
>
  <VkTemplatesDefault />
  <VkTemplatesContainer />
</VkMarkdown>
```

`TemplatesDefault` 和 `TemplatesContainer` 是组件库提供的 **默认渲染策略**

+ [TemplatesDefault](https://github.com/EralChen/vunk-markdown/blob/master/packages/components/templates-default/src/index.vue) 用于渲染常规 Markdown 内容
+ [TemplatesContainer](https://github.com/EralChen/vunk-markdown/blob/master/packages/components/templates-container/src/index.vue) 用于渲染容器类组件, 需要 `Markdown props containers` 显式声明

:::tip
在流式数据中, 你可以使用 `yaml` 代码块, 来展示 `echarts` 的渲染过程
[查看示例](../../component/templates-container/+Page.md#basic)
:::

## 🌟 为什么选择 @vunk/markdown？

- **🎯 专为现代应用设计**：完美适配 Vue3 生态和组件化开发
- **🚀 性能优异**：基于 Vue 的响应式系统，只重渲染变化的部分
- **🎨 高度可定制**：从样式到逻辑，一切都可以自定义
- **🔌 易于扩展**：插件化架构，轻松添加新功能
- **💡 面向未来**：专为 AI 时代的内容展示需求而设计
