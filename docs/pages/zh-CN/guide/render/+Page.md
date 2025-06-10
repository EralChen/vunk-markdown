# Render 渲染

@vunk/markdown 的渲染系统是其核心特性之一，允许你完全自定义 Markdown 内容的渲染方式。通过 **渲染模板（RendererTemplate）**，你可以将 Markdown 元素转换为任何你想要的 Vue 组件。

## 🎯 核心概念

### 什么是自定义渲染？

传统的 Markdown 渲染器只能输出固定的 HTML 结构，而 @vunk/markdown 允许你：

- **替换默认渲染**：为任何 Markdown 元素自定义渲染逻辑
- **增强交互性**：将静态内容转换为交互式组件
- **集成第三方库**：轻松集成语法高亮、图表等功能
- **保持响应式**：利用 Vue 的响应式系统实现动态更新

## 🚀 基础用法

最简单的自定义渲染示例，展示如何替换代码块的默认渲染：

:::demo
render/basic
>>>subs
[render/shiki-fence]
>>>
:::

在这个例子中，我们使用 `RendererTemplate` 组件来：
1. 指定要自定义的元素类型（`type="fence"`）
2. 通过默认插槽接收原始数据
3. 渲染自定义的语法高亮组件

## RendererTemplate

```ts
export interface SlotArguments {
  /**
   * 匹配到的原始数据
   */
  raw: SourceItem

  /**
   * 传递 source: SourceItem[] 可渲染内容
   */
  Renderer: Component
}
```

## TemplatesDefault

`TemplatesDefault`  用于渲染常规 Markdown 内容, 它匹配了以下 `templateTyle`

- GroupToken
- inline
- softbreak
- text
- fence
- code_inline
- ...

:::tip
可以查阅 [TemplatesDefault 核心代码](../../component/templates-default/+Page.md#templatesdefault-核心代码), 查看具体的渲染策略
:::
