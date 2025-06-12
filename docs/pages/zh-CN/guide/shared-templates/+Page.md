# Shared Templates 共享模板

通过 **VkRendererTemplates** 组件，你可以定义一套模板，然后在其子组件中的所有 `VkMarkdown` 实例都能自动使用这些模板。

## RendererTemplates

`RendererTemplates` 是共享模板的容器组件，它：

1. **提供模板上下文**：为子组件提供模板配置
2. **自动查找**：子组件中的 `VkMarkdown` 会自动查找最近的父级模板
3. **支持嵌套**：可以嵌套使用，最近的模板会被优先使用, `VkMarkdown`插槽内的模板有最高优先级

## 🚀 基础用法

下面展示如何使用共享模板来管理多个 Markdown 组件的渲染策略：

:::demo
shared-templates/basic
:::

在这个例子中：

1. **VkRendererTemplates** 作为模板容器，定义了共享的渲染策略
2. **VkTemplatesDefault** 提供默认的 Markdown 渲染
3. **VkTemplatesContainer** 提供容器语法的渲染支持
4. **VkRendererTemplate** 自定义了 `warning` 容器的渲染方式
5. 两个 **VkMarkdown** 组件都能使用这些共享的模板
