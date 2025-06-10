import { LIB_ALIAS, LIB_NAME } from './name'

export const libExternal = [
  'vue',
  'echarts',
  new RegExp(`^${LIB_NAME}`),
  new RegExp(`^${LIB_ALIAS}`),
]

export const filePathIgnore = [
  'gulpfile.ts',
  'package.json',
  'node_modules',
  '**/README.md',
  '**/__tests__/**.ts',
]
