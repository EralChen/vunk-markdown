# 开发集成模板

前端 monorepo 项目开发模板，集成了 Vue3 应用、SSR 应用、组件库和自动化工具等多个功能模块。

## 目录结构

```
├── app/                    # 主应用 (Vue3 SPA)
├── app-ssr/               # SSR 应用
├── docs/                  # 文档站点
├── internal/              # 内部构建工具
│   ├── build-constants/   # - 构建常量
│   ├── build-utils/       # - 构建工具函数
│   └── path/             # - 路径处理工具
├── packages/              # 共享的包, 各应用可直接引用
│   ├── api/              # - API 接口
│   ├── components/       # - UI 组件
│   ├── composables/      # - 组合式函数
│   ├── entry/           # - 入口文件
│   ├── shared/          # - 共享工具/类型
│   ├── stores/          # - 状态管理
│   └── theme/           # - 主题相关
├── scripts/              # 项目脚本
│   ├── app/             # - 应用相关脚本
│   ├── build/           # - 构建脚本
│   ├── create/          # - 创建工具
│   ├── docker/          # - Docker 相关
│   └── docs/            # - 文档工具
├── slidev/              # 演示文稿
├── tips/                # 使用说明文档
├── typings/            # 全局类型定义
└── webdriver/          # 自动化测试
```

:::tip
`app-ssr` , `slidev`, `webdriver` 是可选的目录, 若你的项目不需要它们, 直接删除即可！
:::

## 技术栈

- Vue 3
- TypeScript
- Vite
- pnpm workspace
- UnoCSS
- ESLint
- Vitest

## 开发说明

1. 安装依赖
```bash
pnpm install
```

2. 运行主应用
```bash
pnpm --filter app dev
```

3. 运行 SSR 应用
```bash
pnpm --filter app-ssr dev
```

4. 运行文档站点
```bash
pnpm --filter docs dev
```

5. `packages/**` 可被打成 npm 包

```bash
pnpm build
```

