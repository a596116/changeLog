module.exports = {
  preset: {
    name: 'conventionalcommits',
    types: [
      { type: 'feat', section: '✨ Features' },
      { type: 'fix', section: '🐛 Bug Fixes' },
      { type: 'perf', section: '⚡ Performance' },
      { type: 'revert', section: '⏪ Reverts' },
      // 以下類型不會出現在 changelog 中
      { type: 'docs', hidden: true },
      { type: 'style', hidden: true },
      { type: 'chore', hidden: true },
      { type: 'refactor', hidden: true },
      { type: 'test', hidden: true },
      { type: 'build', hidden: true },
      { type: 'ci', hidden: true },
    ],
  },
  writerOpts: {
    // 過濾掉包含 [skip-changelog] 標記的 commits
    transform: (commit) => {
      // 如果 commit message 包含 [skip-changelog]，則跳過
      if (commit.header && commit.header.includes('[skip-changelog]')) {
        return null;
      }
      
      // 如果 commit body 包含 skip-changelog，則跳過
      if (commit.body && commit.body.includes('skip-changelog')) {
        return null;
      }
      
      return commit;
    },
  },
};

