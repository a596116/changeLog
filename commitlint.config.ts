import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修復 bug
        'docs',     // 文檔更新
        'style',    // 代碼格式（不影響代碼運行的變動）
        'refactor', // 重構（既不是新增功能，也不是修改bug的代碼變動）
        'perf',     // 性能優化
        'test',     // 測試相關
        'chore',    // 構建過程或輔助工具的變動
        'revert',   // 回退
        'build',    // 構建系統或外部依賴的變更
        'ci',       // CI 配置文件和腳本的變動
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};

export default Configuration;

