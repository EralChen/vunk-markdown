# Render Container 渲染容器

@vunk/markdown 允许你将 Markdown 容器语法（如 `:::type` 语法）转换为自定义的 Vue 组件。

通过 **容器渲染**，你可以将特殊的 Markdown 容器块转换为功能强大的交互式组件，如图表、警告框、代码演示等。

## Basic

下面展示如何自定义渲染一个警告框

:::demo
render-container/basic
:::

## 使用方法

组件内置了 `markdown-it-container` 插件来处理 Markdown 容器语法。

在 `VkMarkdown` 组件中通过 `containers` 属性指定要自定义渲染的容器类型：

```vue
<VkMarkdown :source="markdownText" :containers="['warning']">
  <!-- 渲染模板 -->
</VkMarkdown>
```

则模板类型遵循 `container:{容器名}` 的格式进行匹配

### 定义渲染模板

使用 `VkRendererTemplate` 组件定义容器的自定义渲染方式：

```vue
<VkRendererTemplate type="container:warning">
  <template #default="{ raw, Renderer }">
    <!-- 自定义警告组件 -->
    <div class="warning-box">
      <h4>⚠️ 警告</h4>
      <Renderer :source="raw.children"></Renderer>
    </div>
  </template>
</VkRendererTemplate>
```

## TemplatesContainer

你可以使用组件库为你提供的 `容器渲染策略`, 按需引入 [TemplatesContainer](../../component/templates-container/+Page.md) 来使用

```ts
import { VkTemplatesContainer } from '@vunk/markdown/components/templates-container'
```

```vue
<VkMarkdown :containers="['echarts']">
  <VkTemplatesContainer />
</VkMarkdown>
```

:::demo
render-container/echarts
:::

:::tip
你可能会遇到 `echarts` 等其他依赖缺失，手动安装即可！

可以查阅 [TemplatesContainer 核心代码](../../component/templates-container/+Page.md#templatescontainer-核心代码), 查看可用的渲染策略。但不要忘记传递 `containers` 启用策略哦.
:::
