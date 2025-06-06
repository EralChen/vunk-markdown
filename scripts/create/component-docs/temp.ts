import { capitalize } from 'vue'
import { LIB_PRE } from '@lib-env/build-constants'
export const createMd = (t: string, l: string) => `--- 
title: ${t}
lang: zh-CN
---

# ${t}

${t}


## Basic

:::demo 
${l}/basic
:::

## ${t} 其他
`

export const createVue = (mriData: {
  t: string
  l: string
}) => `<script lang="ts" setup>
import { ${capitalize(LIB_PRE)}${mriData.t} } from '@vunk-markdown/components/${mriData.l}'
</script>
<template>
  <div></div>
</template>`