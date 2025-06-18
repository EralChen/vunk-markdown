import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { distDir, distTypesDir } from '@lib-env/path'
import { gulpTask } from '@vunk/shared/function'
import { readdirAsFlattenedTree } from '@vunk/shared/node/fs'
import { series } from 'gulp'
import { isEqual } from 'lodash'

export default series(

  gulpTask('to-dist-type', async () => {
    const distDirFiles = await fsp.readdir(
      distDir,
      { withFileTypes: true },
    )

    // 找到 dist 下打包目录
    const coreDirNames = distDirFiles.filter((item) => {
      return item.isDirectory()
        && path.resolve(distDir, item.name) !== distTypesDir
    }).map(item => item.name)

    // 根据打包目录找到 distTypesDir 中对应的目录
    // 根据打包目录找到 distTypesDir 中对应的目录
    for (const dir of coreDirNames) {
      const coreDir = path.resolve(distDir, dir)
      let typeDir = path.resolve(distTypesDir, dir)
      let isExist = fs.existsSync(typeDir)

      // 有时候类型声明文件在 packages 目录下， 它直接对应 distDir
      const packagesTypeDir = path.resolve(typeDir, 'packages')
      if (
        fs.existsSync(packagesTypeDir)
      ) {
        await fsp.cp(packagesTypeDir, distDir, {
          recursive: true,
        })

        continue
      }

      while (
        isExist
        && !isSameDirStructure(coreDir, typeDir)
      ) {
        typeDir = path.resolve(typeDir, dir)
        isExist = fs.existsSync(typeDir)
      }

      if (!isExist) {
        console.warn(`[to-dist-type] 
          coreDir: ${coreDir}
          typeDir: ${typeDir}
          can not find typeDir
        `)
      }
      else {
        // 拷贝类型声明文件
        await fsp.cp(typeDir, coreDir, {
          recursive: true,
        })
      }
    }
  }),

  gulpTask('clear types', async () => {
    await fsp.rm(distTypesDir, {
      force: true,
      recursive: true,
    })
  }),
)

function isSameDirStructure (
  dir1: string,
  dir2: string,
) {
  const dir1FlattenedTree = readdirAsFlattenedTree(dir1, {
    recursive: false,
  })
  const dir2FlattenedTree = readdirAsFlattenedTree(dir2, {
    recursive: false,
  })

  const dir1SubSet = new Set(
    dir1FlattenedTree
      .filter( // 过滤掉入口文件外的其他文件
        item => item.isDirectory
          || item.filename.includes('index'),
      )
      .map(item => item.filename.split('.').shift()),
  )
  const dir2SubSet = new Set(
    dir2FlattenedTree
      .filter(
        item => item.isDirectory
          || item.filename.includes('index'),
      )
      .map(item => item.filename.split('.').shift()),
  )

  return isEqual(dir1SubSet, dir2SubSet)
}
