<script lang="ts" setup>
import type { __VkMarkdown } from '@vunk/markdown'
import type { __VkTableColumns } from '@vunk/plus/components/table-columns'
import type { NormalObject } from '@vunk/shared'
import type { Token } from 'markdown-it'
import { eachDeep } from 'deepdash-es/standalone'
import { computed } from 'vue'

const props = defineProps({
  source: {
    type: null,
    default: () => [],
  },
})

const columns = computed(() => {
  const thead = props.source[0] ?? []
  const res: __VkTableColumns.Source[] = []
  eachDeep(thead, (value: Token) => {
    res.push({
      prop: value.content,
      label: value.content,
    })
  }, {
    childrenPath: ['children'],
    leavesOnly: true,
  })
  return res
})

const data = computed(() => {
  const tbody = props.source[1] ?? []
  const res: Record<string, any>[] = []
  const trs: __VkMarkdown.GroupToken[] = tbody?.children ?? []

  trs.forEach((item) => {
    const data: NormalObject = {}
    eachDeep(item, (value: Token, _a, _b, { parents }) => {
      const td = parents?.findLast(p => p.value.tag === 'td')
      if (!td || !td.key)
        return
      const key = columns.value[+td.key].prop

      if (!key)
        return
      data[key] = value.content
    }, {
      childrenPath: ['children'],
      leavesOnly: true,
    })
    res.push(data)
  })

  return res
})
</script>

<template>
  <slot :data="data" :columns="columns"></slot>
</template>
