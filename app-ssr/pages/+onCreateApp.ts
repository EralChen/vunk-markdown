import type { OnCreateAppSync } from 'vike-vue'
import ElmentPlus from 'element-plus'

import '../api/init'
import '../client/styles'

import 'uno.css'

export const onCreateApp: OnCreateAppSync = (pageContext) => {
  const { app } = pageContext
  app.use(ElmentPlus)
}
