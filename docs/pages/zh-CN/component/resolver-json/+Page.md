---
title: ResolverJson
lang: zh-CN
---

# ResolverJson

ResolverJson

## Basic

:::demo
resolver-json/basic
:::

## ResolverJson Props
:::props
resolver-json/src/ctx
:::

## ResolverJson Slot Default

| prop | type  | default | description |
| ---- | ----- | ------- | ----------- |
| language | String |    json     | 语言        |
| json | Object |    -     | 解析后的 JSON 对象        |
| error | Object |    -     | 解析错误对象        |
| repaired | Boolean |    false     | 是否修复过json      |
| description | String |    ''     | 描述 , ```json 后的内容       |
| attrs | Object |    null     | 额外属性, 当 description 可被 json 解析时        |
| content | String |    ''     | 原始内容        |
