import { LIB_ALIAS, LIB_NAME } from './name'

export const external = [
  'vue',
  'element-plus',
  'markdown-exit',
  'mermaid',
  'echarts',
  new RegExp(`^${LIB_NAME}`),
  new RegExp(`^${LIB_ALIAS}`)
]