import path from 'node:path'
import { filePathIgnore } from '@lib-env/build-constants'
import { genTypes, rollupFiles } from '@lib-env/build-utils'
import { distDir } from '@lib-env/path'
import { createTsPlugins, createVuePlugins } from '@vunk/shared/build/rollup/plugins'
import { gulpTask } from '@vunk/shared/function'
import { sync } from 'fast-glob'
import { parallel } from 'gulp'

const buildFile = '**/index.ts'
const baseDirname = __dirname.split(path.sep).pop() as string
const external = [
  'mermaid',
  'echarts',
]

const filePaths = sync(buildFile, {
  cwd: path.resolve(__dirname, './'),
  onlyFiles: true,
  absolute: true,
  ignore: filePathIgnore,
})

export default parallel(
  gulpTask(`bundle ${baseDirname}`, async () => {
    await rollupFiles({
      input: filePaths,
      outputDir: path.resolve(distDir, baseDirname),
      external,
      plugins: [
        ...createTsPlugins(),
        ...createVuePlugins(),
      ],
    })
  }),
  gulpTask(`gen ${baseDirname} types`, async () => {
    await genTypes({
      filesRoot: path.resolve(__dirname),
      outDir: baseDirname,
    })
  }),
)
