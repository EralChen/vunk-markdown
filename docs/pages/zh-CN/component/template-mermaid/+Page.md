---
title: TemplateMermaid
lang: zh-CN
---

# TemplateMermaid

TemplateMermaid

## Basic

:::demo
template-mermaid/basic
:::

## 注意事项

+ Mermaid render 的过程中，会在 body 上添加一个临时的元素。这可能会导致你的页面抖动, 你可以通过以下 CSS 来隐藏这个元素：

```css
body > [id^="dv-"] svg{
  position: fixed;
  top: 0;
  left: -9999px;
}
```
