import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { distDir } from '@lib-env/path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const entries: Record<string, string> = {}
const dirs = readdirSync(__dirname)

for (const dir of dirs) {
  const fullPath = resolve(__dirname, dir)
  if (statSync(fullPath).isDirectory() && dir !== 'node_modules') {
    const entryPath = join(fullPath, 'index.ts')
    if (existsSync(entryPath)) {
      entries[dir] = entryPath
    }
  }
}

export default defineConfig({
  build: {
    lib: {
      entry: entries,
      fileName: (format, entryName) => `${entryName}/index.mjs`,
      cssFileName: 'index.css',
      formats: ['es'],
    },
    assetsDir: '',
    outDir: resolve(distDir, 'react'),
    rollupOptions: {
      external: [
        'vue',
        '@vunk/markdown',
      ],
    },
  },
  plugins: [
    vue(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
    }),
  ],
})
