<script lang="ts" setup>
import { VaSceneView, VaViewUi } from '@vuesri/core'
import { Map } from '@vuesri/core/arcgis'
import VkAgentChatProvider from './AgentChatProvider.vue'
import View from './view.vue'

const map = new Map({
  basemap: 'gray',
}) as __esri.MapProperties

const defaultOptions: __esri.SceneViewProperties = {
  map,
  center: [104, 30],
  zoom: 5,
}
</script>

<template>
  <div h500px>
    <VaSceneView
      :default-options="defaultOptions"
    >
      <VkAgentChatProvider>
        <VaViewUi position="manual" class="h-full w-400px bg-bg-base">
          <View></View>
        </VaViewUi>
      </VkAgentChatProvider>
    </VaSceneView>
  </div>
</template>
