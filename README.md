# changeLog

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Git Commit 規範

本專案使用 [Conventional Commits](https://www.conventionalcommits.org/) 規範來管理 Git commit 訊息。

### Commit 訊息格式

```
<type>(<scope>): <subject>
```

### 常用類型

- `feat`: 新功能
- `fix`: 修復 bug
- `docs`: 文檔更新
- `style`: 代碼格式調整
- `refactor`: 代碼重構
- `perf`: 性能優化
- `test`: 測試相關
- `chore`: 其他雜項

### 範例

```bash
git commit -m "feat: 新增用戶登入功能"
git commit -m "fix(auth): 修復登入驗證失敗的問題"
git commit -m "docs: 更新 README"
```

**詳細說明請參閱 [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md)**

## Changelog 生成

### 生成最新版本的變更記錄

```sh
pnpm run changelog
```

### 重新生成完整的 CHANGELOG

```sh
pnpm run changelog:all
```

更多關於版本發布流程，請參閱 [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md)
