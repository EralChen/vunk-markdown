<script lang="ts">
import type { __SkAppTablesV1 } from '@skzz/platform'
import type { Row } from './types'
import { SkTablesCheckbox } from '@skzz/platform/components/tables-checkbox'
import { rUsers } from '@vunk-markdown/api/user'
import { defineComponent, onMounted, ref } from 'vue'
import { emits, props } from './ctx'

type Col = __SkAppTablesV1.Column<Row>

export default defineComponent({
  name: 'SkUserSelectTables',
  components: {
    SkTablesCheckbox,
  },
  props,
  emits,
  setup () {
    const data = ref<Row[]>([])

    const cols: Col[] = [
      {
        prop: 'id',
        label: 'ID',
      },
      {
        prop: 'name',
        label: '姓名',
      },
      {
        prop: 'email',
        label: '邮箱',
      },
    ]

    onMounted(() => {
      read()
    })
    function read () {
      rUsers().then((res) => {
        data.value = res
      })
    }
    return {
      data,
      cols,
    }
  },
})
</script>

<template>
  <SkTablesCheckbox
    oid-field="id"
    :modules="[]"
    :multiple="multiple"
    :data="data"
    :columns="cols"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
  </SkTablesCheckbox>
</template>
