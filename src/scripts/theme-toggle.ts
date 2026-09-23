// 暗色模式切换：跟随系统 / 浅色 / 暗色
const KEY = 'ascend-notes-theme';

function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme, isDark } }));
}

export function initTheme() {
  const saved = (localStorage.getItem(KEY) as 'light' | 'dark' | 'system' | null) ?? 'system';
  applyTheme(saved);

  // 监听系统主题变化（仅在 system 模式下）
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const cur = (localStorage.getItem(KEY) as 'light' | 'dark' | 'system' | null) ?? 'system';
    if (cur === 'system') applyTheme('system');
  });
}

export function setTheme(theme: 'light' | 'dark' | 'system') {
  localStorage.setItem(KEY, theme);
  applyTheme(theme);
}

export function getTheme(): 'light' | 'dark' | 'system' {
  return (localStorage.getItem(KEY) as 'light' | 'dark' | 'system' | null) ?? 'system';
}
