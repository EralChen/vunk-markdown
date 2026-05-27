import type { PropType } from 'vue'
import type { TemplateVisOptions } from './types'



export const props = {
	defaultOptions: {
		type: Object as PropType<Partial<TemplateVisOptions>>,
		default: () => ({  }),
	},
  warning: {
    
  }
}

export const emits = {
}