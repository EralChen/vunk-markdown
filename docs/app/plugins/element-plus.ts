import { ElScrollbar } from 'element-plus'
import { ID_INJECTION_KEY } from 'element-plus'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0
  })
  nuxtApp.vueApp.use(ElScrollbar)
})