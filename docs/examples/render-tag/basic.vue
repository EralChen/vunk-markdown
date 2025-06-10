<script lang="ts" setup>
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'
import { computed, ref } from 'vue'
import TableResolver from './table-resolver.vue'

const text = `
### Table

---

| Header 1 | Code Header 2 |
| --------- | -------------- |
| Row 1    | Code Row 1  |
| Row 2    | Code Row 2  |
`

const currentIndex = ref(0)
const currentText = computed(() => {
  return text.slice(0, currentIndex.value + 1)
})

const interval = setInterval(() => {
  if (currentIndex.value < text.length) {
    currentIndex.value++
  }
  else {
    clearInterval(interval)
  }
}, 50)
</script>

<template>
  <VkMarkdown :source="currentText" :tags="['table']">
    <VkTemplatesDefault />

    <VkRendererTemplate type="tag:table">
      <template #default="{ raw }">
        <TableResolver :source="raw.children">
          <template #default="{ data: tableData, columns }">
            <el-table :data="tableData">
              <el-table-column
                v-for="col in columns"
                :key="col.prop"
                :prop="col.prop"
                :label="col.label"
              ></el-table-column>
            </el-table>
          </template>
        </TableResolver>
      </template>
    </VkRendererTemplate>
  </VkMarkdown>
</template>
