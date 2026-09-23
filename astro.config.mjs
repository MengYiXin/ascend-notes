import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// 站点部署在 mengyx.com.cn/ascend-notes/ 子路径,所有静态资源 URL 必须带 /ascend-notes 前缀
export default defineConfig({
  site: 'https://mengyx.com.cn/ascend-notes',
  base: '/ascend-notes',
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true
    }
  },
  vite: {
    ssr: { noExternal: ['echarts', 'echarts-for-react'] }
  }
});