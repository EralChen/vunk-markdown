import type { OnCreateAppSync } from 'vike-vue/types'
import esriConfig from '@arcgis/core/config'
import { VkClientOnly } from '@vunk/core/components/client-only'
import { restFetch } from '@vunk/shared/fetch'
import ElmentPlus, { ID_INJECTION_KEY } from 'element-plus'

import '#/src/styles'
import 'uno.css'

esriConfig.assetsPath = `${import.meta.env.VITE_BASE_URL}/Esri`

restFetch.baseURL = 'https://llm.geosophon.com/api'

export const onCreateApp: OnCreateAppSync = (pageContext) => {
  const { app } = pageContext
  app.use(ElmentPlus)
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  })
  app.component('ClientOnly', VkClientOnly)
}
