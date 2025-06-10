<script lang="ts" setup>
import type { __VkMarkdown } from '@vunk/markdown'
import type { NormalObject } from '@vunk/shared'
import type { FeatureCollection } from 'geojson'
import type { Ref } from 'vue'
import { SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol } from '@vuesri/core/arcgis'
import { noop } from '@vunk/shared/function'
import { geojsonToArcGIS } from '@vunk/shared/gis'
import Geometry from 'esri/geometry/Geometry'
import { jsonrepair } from 'jsonrepair'
import { computed, nextTick, ref, watchEffect } from 'vue'

const props = defineProps({
  source: {
    type: Array<__VkMarkdown.RendererToken>,
    default: () => [],
  },
})

function trimToLastBrace (str: string) {
  const lastIndex = str.lastIndexOf('}')
  if (lastIndex === -1)
    return str // 如果没找到 '}'，返回原字符串
  return str.slice(0, lastIndex + 1) // 包含最后一个 '}'
}

const jsonStr = computed<string>(() => {
  return trimToLastBrace(
    props.source
      .find(item => item.info && item.info.includes('json'))
      ?.content || '',
  )
})

const currentCollection = ref({
  type: 'FeatureCollection',
  features: [],
}) as Ref<FeatureCollection>

function parse (value: string) {
  const json = JSON.parse(value) as FeatureCollection
  const last = json.features.at(-1)
  // 如果最后一个不完整则删除它
  if (last && !last.geometry) {
    json.features.pop()
  }
  return json
}

const geoToEsriType = {
  Point: 'point',
  MultiPoint: 'multipoint',
  LineString: 'polyline',
  MultiLineString: 'polyline',
  Polygon: 'polygon',
  MultiPolygon: 'polygon',
  GeometryCollection: 'geometrycollection',
}

const esriTypeToSymbol: Record<string, __esri.Symbol> = {
  point: new SimpleMarkerSymbol({
    color: [255, 0, 0],
    size: '12px',
    outline: {
      color: [255, 255, 255],
      width: 1,
    },
  }),
  multipoint: new SimpleMarkerSymbol({
    color: [0, 255, 0],
    size: '12px',
    outline: {
      color: [255, 255, 255],
      width: 1,
    },
  }),
  polyline: new SimpleLineSymbol({
    color: [0, 0, 255],
    width: 2,
  }),
  polygon: new SimpleFillSymbol({
    color: [255, 255, 0, 0.5],
    outline: {
      color: [0, 0, 0],
      width: 1,
    },
  }),
}

const data = computed(() => {
  const res = currentCollection.value.features.map((feature) => {
    const geometry: NormalObject = geojsonToArcGIS(feature.geometry)
    const type = geoToEsriType[feature.geometry.type]
    geometry.type = geoToEsriType[feature.geometry.type]
    return {
      geometry,
      attributes: feature.properties || {},
      symbol: esriTypeToSymbol[type],
    } as __esri.Graphic
  })
  return res
})

watchEffect(async () => {
  noop(jsonStr.value)

  await nextTick()

  try {
    currentCollection.value = parse(jsonStr.value)
  }
  catch {
    try {
      const repairedJson = jsonrepair(jsonStr.value)
      currentCollection.value = parse(repairedJson)
    }
    catch {}
  }
})
</script>

<template>
  <slot
    :data="data"
  ></slot>
</template>
