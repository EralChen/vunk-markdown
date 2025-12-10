import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { distDir } from '@lib-env/path'
import replace from '@rollup/plugin-replace'
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

    /* [TODO] 需要更好的解决方案
      vite lib 打包 ts， 产物生成了
      ```ts
      spawnWorker() {
        this.proxy = MHe(
          new Worker(new URL( "/worker-xxx.js", import.meta.url ), { type: "module" }) ),
          this.running && (this.running = !1, this.execute()
        );
      }
      ```
      导致别人使用的时候报错了
      ✗ Build failed in 1m 21s error during build: [vite:worker-import-meta-url] Could not resolve entry module "public/worker-xxx.js"
    */
    replace({
      values: {
        '/worker-': './worker-',
      },
      delimiters: ['', ''],
    }),
  ],
})
