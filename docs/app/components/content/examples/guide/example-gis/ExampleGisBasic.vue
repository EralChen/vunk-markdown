<script lang="ts" setup>
import { VaGeojsonLayer, VaGraphicsLayer, VaMapView } from '@vuesri/core'
import { Map } from '@vuesri/core/arcgis'
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'
import { computed, onBeforeUnmount, ref } from 'vue'
import chinaGeoJSON from './china.json?raw'
import JsonResolver from './json-resolver.vue'

const data = `

This is a basic example of using the \`VkMarkdown\` component with a custom map.

--- 
:::map
\`\`\`json
${chinaGeoJSON}
\`\`\`
:::


This example demonstrates how to render a map with a GeoJSON layer using the \`VaMapView\` component from the Vuesri library.
`

const map: __esri.Map = new Map({
  basemap: 'hybrid',
})
const defaultOptions: __esri.MapViewProperties = {
  map,
  zoom: 4,
  center: [104.033060, 36.61771], // Center of China
}

const currentIndex = ref(0)
const currentText = computed(() => {
  return data.slice(0, currentIndex.value + 1)
})

const interval = setInterval(() => {
  if (currentIndex.value < 50) {
    currentIndex.value += 1
  }
  else if (currentIndex.value < data.length) {
    currentIndex.value += 800
  }
  else {
    clearInterval(interval)
  }
}, 50)

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <VkMarkdown
    :containers="['map']" :source="currentText"
  >
    <VkTemplatesDefault />

    <VkRendererTemplate type="container:map">
      <template #default="{ raw }">
        <VaMapView h-500px :default-options="defaultOptions">
          <JsonResolver
            :source="raw.children"
          >
            <template #default="{ data: graphics }">
              <VaGraphicsLayer
                :graphics="graphics"
              ></VaGraphicsLayer>
            </template>
          </JsonResolver>
        </VaMapView>
      </template>
    </VkRendererTemplate>
  </VkMarkdown>
</template>
