## 打包

```shell
cd entry
pnpm build
```

## 发布

```shell
cd entry
npm pack --dry-run
npm publish --access public --registry https://registry.npmjs.org/
```