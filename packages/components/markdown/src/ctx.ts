export const props = {
  source: {
    type: String,
    default: '',
  },

  containers: {
    type: Array<string>,
    default: () => [],
  },

  dev: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
}
