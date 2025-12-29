#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

/**
 * 生成 changelog 並過濾掉包含 [skip-changelog] 標記的 commits
 */
function generateChangelog(regenerateAll = false) {
  console.log('🚀 生成 Changelog...');
  
  // 生成原始 changelog
  const cmd = regenerateAll
    ? 'pnpm exec conventional-changelog -p angular -i CHANGELOG.md -s -r 0'
    : 'pnpm exec conventional-changelog -p angular -i CHANGELOG.md -s';
  
  try {
    execSync(cmd, { stdio: 'inherit' });
    
    // 讀取生成的 changelog
    let changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');
    
    // 過濾掉包含 [skip-changelog] 的行
    const lines = changelog.split('\n');
    const filteredLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // 如果這一行包含 [skip-changelog]，跳過它
      if (line.includes('[skip-changelog]')) {
        continue;
      }
      filteredLines.push(line);
    }
    
    // 移除 [skip-changelog] 標記（如果有殘留）
    const cleanedChangelog = filteredLines
      .map(line => line.replace(/\[skip-changelog\]/g, '').trim())
      .join('\n');
    
    // 寫回文件
    fs.writeFileSync('CHANGELOG.md', cleanedChangelog);
    
    console.log('✅ Changelog 生成完成！');
    console.log('💡 提示：包含 [skip-changelog] 標記的 commits 已被過濾');
  } catch (error) {
    console.error('❌ 生成 Changelog 失敗：', error.message);
    process.exit(1);
  }
}

// 檢查命令行參數
const regenerateAll = process.argv.includes('--all');
generateChangelog(regenerateAll);

