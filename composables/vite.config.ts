import { glob } from 'node:fs/promises'
import path from 'node:path'
import { defineConfig, type UserConfig } from 'vite'
import { external } from '@lib/internal'

export default defineConfig(async () => {
  const buildLibEntry = await getBuildLibEntry()

  return {
    build: {
      lib: {
        entry: buildLibEntry.reduce((entryObj, entry) => {
          const entryName = entry.split(path.sep)[0]
          entryObj[entryName] = entry
          return entryObj
        }, {} as Record<string, string>),
        formats: ['es'],
        fileName(format, entryName) {
          return `${entryName}/index.${format}.js`
        },
      },
      emptyOutDir: true,
      rolldownOptions: {
        external: [...external]
      },
    },
  } as UserConfig
})

async function getBuildLibEntry() {
  const buildLibEntry = []

  for await (const entry of glob('*/index.{ts,tsx}')) {
    buildLibEntry.push(entry)
  }

  return buildLibEntry
}
