import fs from 'node:fs'
import path from 'node:path'
import { workRoot } from '@lib-env/path'
import { gulpTask } from '@vunk/shared/function'
import { parallel } from 'gulp'

const outputAssets = path.resolve(workRoot, './dist')

export default parallel(
  gulpTask('copy readme', async () => {
    const inputAssets = path.resolve(workRoot, './README.md')
    fs.copyFileSync(
      inputAssets,
      path.resolve(outputAssets, 'README.md'),
    )
  }),

  gulpTask('copy assets', async () => {
    const inputAssets = path.resolve(workRoot, './pierender.gif')

    fs.copyFileSync(
      inputAssets,
      path.resolve(outputAssets, 'pierender.gif'),
    )
  }),

  gulpTask('copy v image', async () => {
    const inputAssets = path.resolve(workRoot, './v.jpg')

    fs.copyFileSync(
      inputAssets,
      path.resolve(outputAssets, 'v.jpg'),
    )
  }),

  gulpTask('copy LICENSE', async () => {
    const inputAssets = path.resolve(workRoot, './LICENSE')
    fs.copyFileSync(
      inputAssets,
      path.resolve(outputAssets, 'LICENSE'),
    )
  }),
)
