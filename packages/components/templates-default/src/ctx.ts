import { PropType } from 'vue'

export const props = {
  modelValue: {
    type: Object as PropType<unknown>,
    default: () => ({}),
  },
}

export const emits = {
}