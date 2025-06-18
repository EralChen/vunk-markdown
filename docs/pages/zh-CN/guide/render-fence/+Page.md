# Render Fence 渲染围栏

@vunk/markdown 允许你将特定的 ` ```{type} ` 代码围栏语法转换为自定义的 Vue 组件。

## 基础用法

下面展示如何将代码围栏转换为 Element Plus 的卡片组件：

:::demo
render-fence/basic
:::

## 使用方法

`markdown-it` 解析的 `fence`, 将包含在 `type="fence"`的 Token 中, 默认由 [Templatetype fence](../../component/templates-default/+Page.md#templatesdefault-核心代码) 对应的渲染器渲染。

在 `VkMarkdown` 组件中通过 `fences` 属性指定要自定义渲染的围栏类型：

```vue
<VkRendererTemplate type="fence:card">
  <template #default="{ raw }">
    <el-card :header="raw.info">
      <pre>{{ raw.content }}</pre>
    </el-card>
  </template>
</VkRendererTemplate>
```

则 `VkRendererTemplate` 的 `type` 属性遵循 `fence:{围栏类型}` 的格式进行匹配。

## TemplatesFence

你可以使用组件库为你提供的 `容器渲染策略`, 按需引入 [TemplatesFence](../../component/templates-fence/+Page.md) 来使用

```ts
import { VkTemplatesFence } from '@vunk/markdown/components/templates-fence'
```

```vue
<VkMarkdown :fences="['mermaid']">
  <VkTemplatesFence />
</VkMarkdown>
```

:::demo
render-fence/mermaid
:::

:::tip
你可能会遇到 `mermaid` 等其他依赖缺失，手动安装即可！

可以查阅 [TemplatesFence 核心代码](../../component/templates-fence/+Page.md#templatesfence-核心代码), 查看可用的渲染策略。但不要忘记传递 `fences` 启用策略哦.
:::
