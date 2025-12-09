import { existsSync } from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { distDir, entryPackage } from '@lib-env/path'

import { gulpTask } from '@vunk/shared/function'
import { readdirAsFlattenedTree, readJsonSync, writeJsonSync } from '@vunk/shared/node/fs'
import { run } from '@vunk/shared/node/process'
import { replaceRight } from '@vunk/shared/string'
import { series } from 'gulp'

export default series(
  // gulpTask('update:vision', async () => {
  //   const fileObj = readJsonSync(entryPackage) as { version: string, module: string }

  //   // 默认小版本+1
  //   const versionList = fileObj.version.split('.')
  //   const sVersion = versionList.at(-1)
  //   if (sVersion) {
  //     versionList[versionList.length - 1] = `${+sVersion + 1}`
  //   }
  //   fileObj.version = versionList.join('.')

  //   writeJsonSync(entryPackage, fileObj, 2)
  // }),
  gulpTask('destPkg', async () => {
    const distPkgFile = path.resolve(distDir, './package.json')

    await fsp.cp(
      entryPackage,
      distPkgFile,
    )
    // 处理 pkg
    const jsonObj = readJsonSync(distPkgFile) as {
      module: string
      main: string
      exports: Record<string, {
        import?: string
        types?: string
        require?: string
      }>
    }

    jsonObj.module = 'index.esm.js'
    jsonObj.main = 'index.esm.js'
    jsonObj.exports = {
      '.': {
        import: './index.esm.js',
        types: './index.d.ts',
      },
    }

    const distTree = readdirAsFlattenedTree(distDir)
    const modelEntries = distTree
      .filter(item => item.filename === 'index.mjs')

    modelEntries.forEach((item) => {
      const cjsPath = replaceRight(item.id, '.mjs', '.cjs')

      let relativePath = path.relative(distDir, item.pid ?? '').replace(/\\/g, '/')

      relativePath = relativePath
        ? `./${relativePath}`
        : '.'

      jsonObj.exports[relativePath] = {
        import: `${relativePath}` + `/${item.filename}`,
        types: `${relativePath}` + `/${item.filename.replace('.mjs', '.d.ts')}`,
      }

      if (existsSync(cjsPath)) {
        jsonObj.exports[relativePath].require = `${relativePath}` + `/${item.filename.replace('.mjs', '.cjs')}`
      }
    })

    const cssEntries = distTree
      .filter(item => item.filename === 'index.css')

    cssEntries.forEach((item) => {
      let relativePath = path.relative(distDir, item.pid ?? '').replace(/\\/g, '/')

      relativePath = relativePath
        ? `./${relativePath}`
        : '.'

      const relativeFile = `${relativePath}` + `/${item.filename}`

      jsonObj.exports[relativeFile] = {
        import: relativeFile,
      }
    })

    writeJsonSync(distPkgFile, jsonObj, 2)
  }),

  // gulpTask('publish', async () => {
  //   // --tag alpha
  //   run(
  //     'npm publish  --registry https://registry.npmjs.org --access public',
  //     distDir,
  //   )
  // }),
)
