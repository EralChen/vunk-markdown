<script lang="ts" setup>
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'
import { computed, ref } from 'vue'
import TableResolver from './table-resolver.vue'
import MyTables from './tables.vue'

const text = `
### Table

---

| Header 1 | Code Header 2 |
| --------- | -------------- |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
`

const currentIndex = ref(0)
const currentText = computed(() => {
  return text.slice(0, currentIndex.value)
})

const interval = setInterval(() => {
  if (currentIndex.value < text.length) {
    currentIndex.value += 5
  }
  else {
    clearInterval(interval)
  }
}, 50)
</script>

<template>
  <div h-400px>
    <VkMarkdown :source="currentText" :tags="['table']">
      <VkTemplatesDefault />

      <VkRendererTemplate type="tag:table">
        <template #default="{ raw }">
          <TableResolver :source="raw.children">
            <template #default="{ data: tableData, columns }">
              <MyTables
                :data="tableData"
                :columns="columns"
              >
              </MyTables>
            </template>
          </TableResolver>
        </template>
      </VkRendererTemplate>
    </VkMarkdown>
  </div>
</template>
