export const props = {
  source: {
    type: String,
    default: '',
  },

  containers: {
    type: Array<string>,
    default: () => [],
  },
}

export const emits = {
}
