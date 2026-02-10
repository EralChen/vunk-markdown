<script lang="ts" setup>
import { ref } from 'vue'
import { SegmentView } from './core'
</script>

<template>
  <SegmentView>
    <template #default="{ items }">
      <template v-for="(item, index) in items" :key="index">
        <component :is="item.slots.chart" />
      </template>
    </template>
  </SegmentView>
</template>
