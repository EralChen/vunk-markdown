export default defineNuxtConfig({
  extends: ['@movk/nuxt-docs'],

  css: [
    'element-plus/dist/index.css',
    '@vunk/markdown/index.css',
    '@vunk/echarts/index.css',
    '@vunk/plus/index.css'
  ],

  modules: [
    '@unocss/nuxt'
  ],

  devServer: {
    port: 9895
  },

  routeRules: {
    '/docs/guide': { redirect: '/docs/guide/start/introduction', prerender: false },
    '/docs/guide/': { redirect: '/docs/guide/start/introduction', prerender: false },
    '/docs/component': { redirect: '/docs/component/basic/markdown', prerender: false },
    '/docs/component/': { redirect: '/docs/component/basic/markdown', prerender: false }
  },

  compatibilityDate: 'latest',

  aiChat: {
    model: 'zai/glm-4.7',
    models: [
      'zai/glm-4.7',
      'anthropic/claude-sonnet-4.6',
      'google/gemini-3-flash'
    ]
  },

  mcp: {
    name: 'Movk Nuxt Docs'
  },
  movkNuxtDocs: {
    a11y: false
  },
  vite: {
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        define: {
          global: 'globalThis'
        },
        supported: {
          bigint: true
        }
      },
      include: [
        '@element-plus/icons-vue',
        'element-plus',
        'markdown-exit',
      ],
      exclude: [
        'monaco-editor',
        '@antv/gpt-vis',
      ]
    }
  }
})
