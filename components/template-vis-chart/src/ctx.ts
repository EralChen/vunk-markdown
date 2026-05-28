import type { PropType } from 'vue'
import type { TemplateVisChartOptions } from './types'


export const props = {
  defaultOptions: {
    type: Object as PropType<Partial<TemplateVisChartOptions>>,
    default: () => ({  }),
  },
}

export const emits = {
}