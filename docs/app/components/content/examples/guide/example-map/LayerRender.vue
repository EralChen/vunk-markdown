<script lang="ts" setup>
import LayerItem from './LayerItem.vue'

interface LayerData {
  url: string
  label: string
  visible?: boolean
}

defineProps({
  data: {
    type: Array<LayerData>,
    required: true,
  },
})
</script>

<template>
  <LayerItem
    v-for="layer in data" :key="layer.url"
    :url="layer.url"
    :label="layer.label"
  >
  </LayerItem>
</template>
