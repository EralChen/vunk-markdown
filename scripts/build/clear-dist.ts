import fsp from 'node:fs/promises'
import { distDir } from '@lib-env/path'
import { gulpTask } from '@vunk/shared/function'
import { series } from 'gulp'

export default series(
  gulpTask('clear-dist', async () => {
    await fsp.rm(distDir, {
      recursive: true,
      force: true,
    })
  }),

)
