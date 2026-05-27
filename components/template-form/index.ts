import type { App } from 'vue'
import VkTemplateForm from './src/index.vue'

export * as __VkTemplateForm from './src/types'

VkTemplateForm.install = (app: App): void => {
  app.component(VkTemplateForm.name || 'VkTemplateForm', VkTemplateForm)
}
export {
  VkTemplateForm,
}
export default VkTemplateForm
