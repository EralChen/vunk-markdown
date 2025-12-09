import path from 'path'
import { distTypesDir, workRoot } from '@lib-env/path'
import { fixPath } from './alias'
import { genDtsFiles } from '@vunk/shared/build/morph'

export async function genTypes (opts = {} as {
  filesRoot: string
  source?: string
  outDir?: string
}) { // 生成一个 .d.ts

  const outDir = path.resolve(distTypesDir, opts.outDir ?? '')
  const globSource = opts.source ?? '**/*'
  const globCwd = opts.filesRoot

  await genDtsFiles({
    root: workRoot,
    compilerOptions: {
      outDir,
      jsxImportSource: "vue",
    },
    globSource,
    globCwd,
    transform: fixPath,
  })

}