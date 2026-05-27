<script lang="ts" setup>
import { VkTablesV1 } from '@vunk/plus/components/tables-v1'
import { computed, ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const currentPage = ref(1)
const pageSize = ref(5)

const theData = computed(() => { // 前端分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return props.data.slice(start, end)
})
</script>

<template>
  <VkTablesV1
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :data="theData"
    :background="true"
    :total="data.length"
    :duplex-full="false"
  ></VkTablesV1>
</template>
