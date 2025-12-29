# 🚀 版本發布指南

## 快速發布（推薦）

```bash
# 一鍵發布 patch 版本（bug 修復）
npm version patch && git push origin main --tags

# 一鍵發布 minor 版本（新功能）
npm version minor && git push origin main --tags

# 一鍵發布 major 版本（重大更新）
npm version major && git push origin main --tags
```

---

## 📝 詳細步驟

### 步驟 1：準備發布

```bash
# 確認所有變更都已提交
git status

# 查看當前版本
cat package.json | grep version

# 查看即將包含的變更
git log --oneline
```

### 步驟 2：選擇版本號

根據變更類型選擇：

| 變更類型 | 版本 | 命令 | 範例 |
|---------|------|------|------|
| 🐛 只有 bug 修復 | Patch | `npm version patch` | 0.0.0 → 0.0.1 |
| ✨ 新功能（兼容） | Minor | `npm version minor` | 0.0.0 → 0.1.0 |
| 💥 重大變更（不兼容） | Major | `npm version major` | 0.0.0 → 1.0.0 |

### 步驟 3：發布

```bash
# 執行版本更新（會自動生成 changelog）
npm version patch

# 推送到遠端
git push origin main --tags
```

---

## 🔍 版本號說明

### Semantic Versioning (語義化版本)

格式：`主版本號.次版本號.修訂號` (MAJOR.MINOR.PATCH)

```
1.2.3
│ │ │
│ │ └─ Patch: 修復 bug
│ └─── Minor: 新增功能（向後兼容）
└───── Major: 重大變更（不向後兼容）
```

### 範例

```
0.0.1  # 初始開發，第一個 patch
0.1.0  # 新增第一個功能
0.2.0  # 新增第二個功能
1.0.0  # 正式發布
1.0.1  # 修復 bug
1.1.0  # 新增功能
2.0.0  # 重大變更（破壞性更新）
```

---

## 🛠️ 進階用法

### 查看所有 tags

```bash
# 列出所有 tags
git tag -l

# 查看特定 tag 的詳細信息
git show v1.0.0
```

### 刪除錯誤的 tag

```bash
# 刪除本地 tag
git tag -d v1.0.0

# 刪除遠端 tag
git push origin :refs/tags/v1.0.0
```

### 創建帶說明的 tag

```bash
# 創建帶詳細說明的 tag
git tag -a v1.0.0 -m "Release v1.0.0

主要變更：
- 新增用戶登入功能
- 修復資料丟失問題
- 優化性能"
```

### 推送特定 tag

```bash
# 只推送一個 tag
git push origin v1.0.0

# 推送所有 tags
git push origin --tags
```

---

## 📦 發布到 GitHub Release

### 方法一：使用 GitHub 網頁介面

1. 進入 GitHub 專案頁面
2. 點擊右側 "Releases"
3. 點擊 "Create a new release"
4. 選擇剛推送的 tag（如 v1.0.0）
5. 填寫 Release 標題和說明
6. 可以附加檔案（如打包好的 dist）
7. 點擊 "Publish release"

### 方法二：使用 GitHub CLI

```bash
# 安裝 GitHub CLI（如果還沒安裝）
# macOS: brew install gh
# Windows: choco install gh

# 登入
gh auth login

# 創建 release
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes "查看 CHANGELOG.md 了解詳細變更"

# 或從 CHANGELOG 自動生成說明
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes-file CHANGELOG.md
```

---

## ✅ 發布檢查清單

### 發布前

- [ ] 所有功能都已完成並測試
- [ ] 所有 commit 訊息符合規範
- [ ] 代碼已經過 lint 檢查
- [ ] 沒有未提交的變更 (`git status` 乾淨)
- [ ] 已確認要發布的內容

### 發布中

- [ ] 更新版本號（自動或手動）
- [ ] 生成 CHANGELOG
- [ ] 創建 git tag
- [ ] 推送到遠端

### 發布後

- [ ] 確認 tag 已推送成功
- [ ] 確認 CHANGELOG 正確
- [ ] （可選）在 GitHub 創建 Release
- [ ] （可選）通知團隊成員

---

## 🎯 常見場景

### 場景 1：第一次發布

```bash
# 從 0.0.0 發布到 1.0.0
npm version major  # 0.0.0 → 1.0.0
git push origin main --tags
```

### 場景 2：修復 bug 後發布

```bash
# 修復 bug 後發布 patch 版本
npm version patch  # 1.0.0 → 1.0.1
git push origin main --tags
```

### 場景 3：新增功能後發布

```bash
# 新增功能後發布 minor 版本
npm version minor  # 1.0.1 → 1.1.0
git push origin main --tags
```

### 場景 4：重大更新

```bash
# API 重大變更，不向後兼容
npm version major  # 1.1.0 → 2.0.0
git push origin main --tags
```

---

## 🔄 npm version 做了什麼？

當你執行 `npm version patch` 時：

1. ✅ 更新 `package.json` 中的 `version` 欄位
2. ✅ 執行 `version` script（生成 CHANGELOG）
3. ✅ 執行 `git add` 添加變更
4. ✅ 執行 `git commit` 創建提交
5. ✅ 創建 git tag（如 v1.0.1）

之後你只需要：
```bash
git push origin main --tags
```

---

## 💡 提示

1. **使用 npm version 最方便**：自動化所有步驟
2. **記得推送 tags**：`git push` 默認不推送 tags，要加 `--tags`
3. **版本號要語義化**：遵循 Semantic Versioning 規範
4. **發布前檢查 CHANGELOG**：確保變更記錄正確
5. **tag 名稱加 v 前綴**：如 v1.0.0（業界慣例）

---

## 📚 參考資料

- [Semantic Versioning](https://semver.org/)
- [npm version 文檔](https://docs.npmjs.com/cli/v10/commands/npm-version)
- [Git Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

---

**下一步**：查看 [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md) 了解 commit 規範

