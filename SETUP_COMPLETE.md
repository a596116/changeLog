# ✅ Commitlint 與 Changelog 配置完成

恭喜！您的專案已成功配置 commitlint 和 changelog 生成功能。

## 📦 已安裝的套件

- `@commitlint/cli` - Commit 訊息檢查工具
- `@commitlint/config-conventional` - Conventional Commits 規範配置
- `husky` - Git hooks 管理工具
- `conventional-changelog-cli` - Changelog 生成工具

## 📁 已創建的文件

1. **commitlint.config.ts** - Commitlint 配置文件
2. **.husky/commit-msg** - Git commit-msg hook
3. **CHANGELOG.md** - 變更日誌文件
4. **COMMIT_CONVENTION.md** - 詳細的使用說明文檔
5. **README.md** - 已更新，包含 commit 規範和 changelog 使用說明

## 🎯 工作流程示範

### 1. 提交代碼（會自動檢查格式）

```bash
# ✅ 正確的提交格式
git commit -m "feat: 新增用戶登入功能"
git commit -m "fix(auth): 修復密碼驗證問題"
git commit -m "docs: 更新 API 文檔"

# ❌ 錯誤的提交格式（會被拒絕）
git commit -m "update code"           # 缺少類型
git commit -m "feat 新增功能"         # 格式錯誤
git commit -m "UPDATE: new feature"   # 類型必須小寫
```

### 2. 生成 Changelog

```bash
# 生成最新版本的變更記錄
pnpm run changelog

# 或重新生成完整的 changelog
pnpm run changelog:all
```

### 3. 版本發布流程

```bash
# 方式一：使用 npm version（推薦）
npm version patch  # 0.0.0 -> 0.0.1
npm version minor  # 0.0.0 -> 0.1.0
npm version major  # 0.0.0 -> 1.0.0

# 方式二：手動更新
# 1. 編輯 package.json 更新版本號
# 2. 生成 changelog
pnpm run changelog
# 3. 提交並打標籤
git add CHANGELOG.md package.json
git commit -m "chore: 發布 v1.0.0"
git tag -a v1.0.0 -m "Release v1.0.0"
# 4. 推送到遠端
git push origin main --tags
```

## 🎨 Commit 類型說明

| 類型 | 說明 | 出現在 CHANGELOG |
|------|------|-----------------|
| **feat** | 新功能 | ✅ |
| **fix** | 修復 bug | ✅ |
| **docs** | 文檔更新 | ❌ |
| **style** | 代碼格式（不影響功能） | ❌ |
| **refactor** | 代碼重構 | ❌ |
| **perf** | 性能優化 | ✅ |
| **test** | 測試相關 | ❌ |
| **chore** | 其他雜項 | ❌ |
| **build** | 構建系統變更 | ❌ |
| **ci** | CI 配置變更 | ❌ |

## 📝 實際範例

查看 `CHANGELOG.md` 文件，裡面已經有一些示例 commits 生成的變更記錄：

- ✨ Features (新功能)
- 🐛 Bug Fixes (修復)

## 🔍 測試驗證

您可以測試一下配置是否正常工作：

```bash
# 測試錯誤的提交（會被拒絕）
git commit --allow-empty -m "test"

# 測試正確的提交（會成功）
git commit --allow-empty -m "feat: 測試功能"

# 查看生成的 changelog
cat CHANGELOG.md
```

## 📚 更多資訊

- 詳細使用說明：查看 [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md)
- Conventional Commits 官方文檔：https://www.conventionalcommits.org/
- Commitlint 文檔：https://commitlint.js.org/

## 💡 提示

1. 每次 commit 時，husky 會自動運行 commitlint 檢查
2. 只有 `feat`、`fix`、`perf`、`revert` 會出現在 changelog 中
3. commit 訊息的 subject 可以使用中文
4. 如果有重大變更（Breaking Changes），記得在訊息中加上 `BREAKING CHANGE:`

---

🎉 配置完成！開始使用規範的 Git commit 訊息吧！

