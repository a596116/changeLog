# 🚀 GitHub Release 發布指南

## 📦 方法總覽

有三種方法可以創建 GitHub Release：

| 方法 | 難度 | 自動化程度 | 推薦度 |
|------|------|-----------|--------|
| 方法一：GitHub 網頁 | ⭐ 簡單 | 手動 | ⭐⭐⭐⭐⭐ 新手推薦 |
| 方法二：自動化腳本 + GitHub CLI | ⭐⭐ 中等 | 半自動 | ⭐⭐⭐⭐ 推薦 |
| 方法三：完全自動化 | ⭐⭐⭐ 進階 | 全自動 | ⭐⭐⭐ 進階用戶 |

---

## 🎯 方法一：使用 GitHub 網頁介面（最簡單）

### 完整步驟

#### 1️⃣ 確保 tag 已推送到 GitHub

```bash
# 先創建版本和 tag
npm version patch  # 或 minor / major

# 推送到 GitHub（包含 tags）
git push origin master --tags
```

#### 2️⃣ 打開 GitHub Release 頁面

**方式 A：從專案頁面進入**
1. 進入你的 GitHub 專案：`https://github.com/你的用戶名/changeLog`
2. 點擊右側的 **"Releases"** 或 **"版本"**
3. 點擊 **"Create a new release"** 或 **"Draft a new release"**

**方式 B：直接訪問**
```
https://github.com/你的用戶名/changeLog/releases/new
```

#### 3️⃣ 填寫 Release 資訊

**A. Choose a tag（選擇標籤）**
- 點擊下拉選單
- 選擇你剛推送的 tag（例如：`v1.0.0`）

**B. Release title（發行版標題）**

範例：
```
Release v1.0.0
```
或更詳細：
```
v1.0.0 - 首次正式發布 🎉
```

**C. Describe this release（描述發行版）**

打開你的 `CHANGELOG.md`，複製對應版本的內容：

```markdown
## ✨ 新功能 (Features)

- **router:** 新增路由配置
- 初始化專案結構
- 重要的新功能 - 添加搜索功能

## 🐛 Bug 修復 (Bug Fixes)

- **app:** 修復應用初始化問題
- 修復嚴重的資料丟失問題

---

**完整變更記錄**：[查看 CHANGELOG.md](https://github.com/你的用戶名/changeLog/blob/main/CHANGELOG.md)
```

**D. 附加檔案（可選）**

如果有編譯好的檔案、打包好的程式等：
- 直接拖曳到描述框
- 或點擊底部的 "Attach binaries..." 上傳

**E. 其他選項**

- ☑️ **Set as the latest release**（設為最新版本）
  - 第一次發布或正式版本請勾選
  
- ☐ **Set as a pre-release**（設為預發布版本）
  - 測試版、Beta 版才勾選
  - 例如：v1.0.0-beta.1

#### 4️⃣ 發布

點擊綠色按鈕 **"Publish release"**

✅ 完成！你的 Release 已經發布了！

---

## ⚡ 方法二：使用 GitHub CLI + 腳本（推薦）

### 前置安裝

#### 安裝 GitHub CLI

```bash
# macOS
brew install gh

# Windows (使用 Chocolatey)
choco install gh

# Windows (使用 Scoop)
scoop install gh

# Linux (Debian/Ubuntu)
sudo apt install gh

# Linux (Fedora/CentOS)
sudo dnf install gh
```

#### 登入 GitHub

```bash
gh auth login
```

按照提示操作：
1. 選擇 `GitHub.com`
2. 選擇 `HTTPS`
3. 選擇 `Login with a web browser`（推薦）
4. 複製顯示的代碼
5. 按 Enter 打開瀏覽器
6. 輸入代碼並授權

### 使用方式

#### 方式 A：使用我們的自動化腳本（最簡單）

```bash
# 1. 創建版本並推送
npm version patch  # 或 minor / major
# (自動推送，因為有 postversion script)

# 2. 創建 GitHub Release
pnpm run release v1.0.0
```

#### 方式 B：使用 gh 命令（更靈活）

```bash
# 1. 創建版本並推送
npm version patch
git push origin master --tags

# 2. 從 CHANGELOG 自動提取內容創建 Release
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes-file CHANGELOG.md

# 或手動輸入說明
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes "## 新功能
- 新增用戶登入功能
- 新增資料導出功能

## Bug 修復
- 修復登入問題"
```

#### 方式 C：互動式創建

```bash
# 互動式創建 Release（會問你問題）
gh release create v1.0.0
```

---

## 🤖 方法三：完全自動化發布

### 更新 package.json

添加自動化腳本（已為你配置）：

```json
{
  "scripts": {
    "postversion": "git push origin master --tags",
    "release": "bash scripts/create-release.sh"
  }
}
```

### 一鍵發布流程

```bash
# 方式 A：發布 patch 版本
npm version patch && pnpm run release v1.0.1

# 方式 B：發布 minor 版本
npm version minor && pnpm run release v1.1.0

# 方式 C：發布 major 版本
npm version major && pnpm run release v2.0.0
```

這會自動：
1. ✅ 更新版本號
2. ✅ 生成 CHANGELOG
3. ✅ 創建 commit 和 tag
4. ✅ 推送到 GitHub
5. ✅ 創建 GitHub Release

---

## 📝 Release 描述範本

### 範本一：簡潔版

```markdown
## 🎉 v1.0.0

### ✨ 新功能
- 新增用戶登入功能
- 新增資料導出功能

### 🐛 修復
- 修復資料丟失問題
- 修復登入失敗問題

### 📚 完整變更
查看 [CHANGELOG.md](https://github.com/你的用戶名/changeLog/blob/main/CHANGELOG.md)
```

### 範本二：詳細版

```markdown
# Release v1.0.0 - 首次正式發布 🎉

這是我們的第一個正式版本！經過數週的開發和測試，我們很高興能發布這個穩定版本。

## ✨ 新功能 (Features)

### 用戶系統
- ✅ 新增用戶註冊功能
- ✅ 新增用戶登入功能
- ✅ 新增密碼重置功能

### 資料管理
- ✅ 新增資料導入功能
- ✅ 新增資料導出功能
- ✅ 支援批量操作

## 🐛 Bug 修復 (Bug Fixes)

- 🔧 修復登入時的資料丟失問題
- 🔧 修復 Safari 瀏覽器兼容性問題
- 🔧 修復移動端顯示異常

## 🎨 改進 (Improvements)

- 優化頁面載入速度（提升 40%）
- 改進 UI 設計
- 提升移動端體驗

## 📝 文檔

- 新增使用文檔
- 新增 API 文檔

## 🙏 致謝

感謝所有貢獻者的辛勤付出！

---

**完整變更記錄**：[CHANGELOG.md](https://github.com/你的用戶名/changeLog/blob/main/CHANGELOG.md)

**安裝方式**：
\`\`\`bash
pnpm install
pnpm dev
\`\`\`
```

### 範本三：帶圖片和連結

```markdown
# 🎉 Release v1.0.0

![Release Banner](https://your-image-url.com/banner.png)

## 亮點功能

### 🔐 全新的用戶系統
完整的用戶認證功能，支援註冊、登入、密碼重置。

![Login Screenshot](https://your-image-url.com/login.png)

### 📊 資料管理
強大的資料管理功能，支援導入、導出、批量操作。

## 📦 安裝

\`\`\`bash
pnpm install
\`\`\`

## 🔗 相關連結

- 📖 [完整文檔](https://your-docs-url.com)
- 🐛 [回報問題](https://github.com/你的用戶名/changeLog/issues)
- 💬 [討論區](https://github.com/你的用戶名/changeLog/discussions)

## 📝 變更記錄

查看完整變更：[CHANGELOG.md](https://github.com/你的用戶名/changeLog/blob/main/CHANGELOG.md)
```

---

## 🎯 實際演練

### 場景：發布第一個正式版本 v1.0.0

```bash
# 步驟 1：確保所有改動已提交
git status

# 步驟 2：創建版本
npm version major  # 0.0.0 → 1.0.0

# 步驟 3A：使用網頁（簡單）
# 1. 訪問 GitHub Release 頁面
# 2. 選擇 tag: v1.0.0
# 3. 填寫標題和描述
# 4. 點擊 Publish

# 步驟 3B：使用 CLI（快速）
gh release create v1.0.0 \
  --title "Release v1.0.0 - 首次正式發布 🎉" \
  --notes "查看 CHANGELOG.md 了解完整變更記錄"
```

---

## 🔍 管理已發布的 Release

### 查看所有 Releases

```bash
# 列出所有 releases
gh release list

# 查看特定 release 的詳情
gh release view v1.0.0
```

### 編輯 Release

```bash
# 在瀏覽器中編輯
gh release edit v1.0.0 --web

# 或直接修改標題
gh release edit v1.0.0 --title "新標題"

# 修改說明
gh release edit v1.0.0 --notes "新的說明內容"
```

### 刪除 Release

```bash
# 刪除 release（但保留 tag）
gh release delete v1.0.0

# 同時刪除 tag
gh release delete v1.0.0 --yes
git push origin :refs/tags/v1.0.0
```

### 上傳附件

```bash
# 上傳檔案到已存在的 release
gh release upload v1.0.0 dist/app.zip

# 上傳多個檔案
gh release upload v1.0.0 dist/*.zip
```

---

## ⚠️ 常見問題

### Q1: tag 推送了但 GitHub 沒顯示？

**解決方式**：
```bash
# 檢查 remote 設置
git remote -v

# 重新推送 tags
git push origin --tags
```

### Q2: Release 創建失敗？

**可能原因**：
1. GitHub CLI 沒有正確登入
2. tag 不存在或沒推送
3. 沒有倉庫權限

**解決方式**：
```bash
# 重新登入
gh auth login

# 檢查 tag
git tag -l

# 推送 tag
git push origin v1.0.0
```

### Q3: 想修改已發布的 Release？

直接在 GitHub 網頁上編輯，或使用：
```bash
gh release edit v1.0.0 --web
```

### Q4: 如何創建預發布版本？

```bash
# 網頁：勾選 "Set as a pre-release"

# CLI：
gh release create v1.0.0-beta.1 --prerelease
```

---

## 📚 更多資源

### 官方文檔
- [GitHub Releases 文檔](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [GitHub CLI 文檔](https://cli.github.com/manual/gh_release)

### 相關文件
- [RELEASE_GUIDE.md](./RELEASE_GUIDE.md) - Tag 和版本管理
- [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md) - Commit 規範
- [CHANGELOG.md](./CHANGELOG.md) - 變更記錄

---

## ✅ 快速檢查清單

發布前確認：

- [ ] 所有功能已完成並測試
- [ ] 所有改動已提交
- [ ] CHANGELOG 已更新
- [ ] 版本號已更新（使用 npm version）
- [ ] Tag 已推送到 GitHub
- [ ] 準備好 Release 描述內容
- [ ] （可選）準備好要附加的檔案

發布後確認：

- [ ] Release 在 GitHub 上正確顯示
- [ ] 版本號正確
- [ ] 描述內容正確
- [ ] 附件已上傳（如有）
- [ ] 設為 Latest release（正式版本）

---

**下一步**：查看 [RELEASE_GUIDE.md](./RELEASE_GUIDE.md) 了解版本管理的詳細信息！

