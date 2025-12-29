#!/bin/bash

# 創建 GitHub Release 的腳本
# 使用方式：./scripts/create-release.sh v1.0.0

set -e

# 檢查是否提供了版本號
if [ -z "$1" ]; then
  echo "❌ 錯誤：請提供版本號"
  echo "使用方式：./scripts/create-release.sh v1.0.0"
  exit 1
fi

VERSION=$1

echo "🚀 正在為 $VERSION 創建 GitHub Release..."

# 檢查 tag 是否存在
if ! git rev-parse "$VERSION" >/dev/null 2>&1; then
  echo "❌ 錯誤：tag $VERSION 不存在"
  echo "請先運行：npm version [patch|minor|major]"
  exit 1
fi

# 從 CHANGELOG.md 提取當前版本的變更記錄
echo "📝 從 CHANGELOG.md 提取變更記錄..."

# 創建臨時文件存放 release notes
RELEASE_NOTES=$(mktemp)

# 提取版本號（去掉 v 前綴）
VERSION_NUMBER=${VERSION#v}

# 從 CHANGELOG 提取對應版本的內容
awk "/^# $VERSION_NUMBER /,/^# [0-9]/" CHANGELOG.md | head -n -1 > "$RELEASE_NOTES"

# 如果提取失敗，使用默認內容
if [ ! -s "$RELEASE_NOTES" ]; then
  echo "查看完整變更記錄：[CHANGELOG.md](https://github.com/a596116/changeLog/blob/main/CHANGELOG.md)" > "$RELEASE_NOTES"
fi

# 創建 GitHub Release
echo "🎉 創建 Release..."
gh release create "$VERSION" \
  --title "Release $VERSION" \
  --notes-file "$RELEASE_NOTES" \
  --latest

# 清理臨時文件
rm -f "$RELEASE_NOTES"

echo "✅ Release 創建成功！"
echo "🔗 查看：https://github.com/a596116/changeLog/releases/tag/$VERSION"

