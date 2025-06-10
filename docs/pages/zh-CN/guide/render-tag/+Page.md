# Render Tag 渲染标签

@vunk/markdown 允许你将特定的 HTML 标签转换为自定义的 Vue 组件。

通过 **标签渲染**，你可以将传统的 HTML 元素（如表格、列表等）转换为功能更强大的交互式组件。

## Basic

下面展示如何将 Markdown 表格转换为 Element Plus 的表格组件：

:::demo
render-tag/basic
:::

## 使用方法

`markdown-it` 解析的标签对, 将包含在 `GroupToken` 中, 由 [Templatetype GroupToken](../render/+Page.md#templatetype-grouptoken) 对应的渲染器渲染。

在 `VkMarkdown` 组件中通过 `tags` 属性指定要自定义渲染的标签：

```vue
<VkMarkdown :source="markdownText" :tags="['table']">
  <!-- 渲染模板 -->
</VkMarkdown>
```

则模板类型遵循 `tag:{标签名}` 的格式进行匹配

### 定义渲染模板

使用 `VkRendererTemplate` 组件定义标签的自定义渲染方式：

```vue
<VkRendererTemplate type="tag:table">
  <template #default="{ raw }">
    <!-- 自定义表格组件 -->
    <MyCustomTable :data="raw" />
  </template>
</VkRendererTemplate>
```
