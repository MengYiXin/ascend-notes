# Ascend Notes · 昇腾实测档案

> 学术型个人网站，记录昇腾 3500 G3 / 910B4 / 910C / 950 的模型适配与实测性能数据。
> 风格克制，数据可追溯，参考 Linux / Stripe / Anthropic Docs。

**站点地址**：https://ascend.mengyx.com.cn

---

## ✨ 特性

- **Astro 4.x** 静态生成，超快首屏
- **MDX** + **Tailwind CSS** + **ECharts**
- **Pagefind** 静态全文搜索
- **暗色模式**：默认浅色 + 跟随系统 + 可手动切换
- **响应式**：移动端 / 平板 / 桌面
- **数据驱动**：所有数字在 `src/content/chips/*.yaml`，与展示解耦

---

## 📦 项目结构

```
ascend-notes/
├── astro.config.mjs          # Astro 配置（site: ascend.mengyx.com.cn）
├── tailwind.config.mjs       # 主题（克制的 Optima + Ascend 蓝 #06c）
├── tsconfig.json             # 路径别名 @/* @components/* @layouts/*
├── CNAME                     # GitHub Pages 自定义域
├── .github/workflows/
│   └── deploy.yml            # 推 main → 自动部署到 GitHub Pages
├── public/
│   └── favicon.svg
└── src/
    ├── content/
    │   ├── config.ts         # Zod schema 校验 YAML
    │   └── chips/
    │       ├── 3500-g3.yaml  # 3500 G3 (DS-R1-671B Int8)
    │       ├── 910b4.yaml    # Atlas 800I A2 (Qwen3 / V4)
    │       ├── 910c.yaml     # Atlas 800I A3 (V4-Flash/Pro/GLM5)
    │       ├── 950.yaml      # 昇腾 950 路线图
    │       └── _sources.yaml # 资料来源清单
    ├── components/           # TopNav / LeftNav / RightToc / DataTable / ChartBlock / ...
    ├── layouts/
    │   ├── BaseLayout.astro  # 顶层布局 + 主题
    │   └── ChipLayout.astro  # 芯片页布局（左导航 / 中内容 / 右目录）
    ├── pages/
    │   ├── index.astro
    │   ├── chips/{3500-g3,910b4,910c,950}.astro
    │   ├── models.astro
    │   ├── benchmarks/{ttft,throughput,e2e}.astro
    │   ├── sources.astro
    │   ├── methodology.astro
    │   └── changelog.astro
    ├── scripts/theme-toggle.ts
    └── styles/global.css
```

---

## 🚀 本地开发

```bash
# Node 18+ / npm 10+
npm install
npm run dev          # 启动开发服务 http://localhost:4321
```

## 🔨 构建

```bash
npm run build        # 输出到 dist/
npm run preview      # 预览构建结果
```

`npm run build` 后会自动跑 `pagefind` 生成搜索索引（在 `dist/_pagefind/`）。

---

## 🌐 部署到 GitHub Pages

### 一次性配置

1. **新建仓库** `MengYiXin/ascend-notes`（公开或私有均可）
2. **首次推送**：
   ```bash
   cd ascend-notes
   git init
   git add .
   git commit -m "feat: ascend-notes v0.1"
   git branch -M main
   git remote add origin git@github.com:MengYiXin/ascend-notes.git
   git push -u origin main
   ```

3. **配置 GitHub Pages**：
   - 仓库 → Settings → Pages → Source = **GitHub Actions**
   - Workflow 会自动跑 `deploy.yml`，把 `dist/` 部署到 Pages

4. **配置自定义域**：
   - 仓库根目录已放 `CNAME` 文件，内容 `ascend.mengyx.com.cn`
   - Cloudflare DNS 添加 CNAME 记录：
     ```
     类型: CNAME
     名称: ascend
     目标: mengyxin.github.io
     代理: 仅 DNS（灰色云朵）
     ```
   - GitHub → Settings → Pages → Custom domain 填 `ascend.mengyx.com.cn`
   - 勾选 **Enforce HTTPS**（证书自动签发）

### 后续部署

每次 `git push origin main`，GitHub Actions 自动构建 + 部署，约 1-2 分钟生效。

---

## 📝 数据更新流程

1. 编辑 `src/content/chips/*.yaml`
2. 编辑 `src/content/chips/_sources.yaml`（如新增资料）
3. 必要时改对应页面的 `ChartBlock` 数据
4. 改 `src/pages/changelog.astro` 加一行
5. `git commit -m "data: 新增 910C V4-Flash 8k/2k 实测" && git push`

数据用 Zod schema 校验，写错字段会在 build 时报错。

---

## 🎨 设计语言

| 项 | 选择 |
|---|---|
| 字体 | Optima (正文) + Source Code Pro (数字/命令) |
| 主色 | `#06c` (Ascend 蓝)，深色模式 `#4d9bff` |
| 浅色 | 背景 `#fff`，正文 `#484853` |
| 深色 | 背景 `#0f1115`，正文 `#d2d2d7` |
| 字号 | 12 / 14 / 16 / 20 / 28 / 40 px |
| 行宽 | 正文 ≤ 72ch，表格自适应 |
| 动效 | 几乎无（仅主题切换 + ECharts 渐变） |

参考 Linux kernel.org / Stripe Docs / Anthropic Docs 的克制风格。

---

## 📊 数据可信度

- 所有数字都标注来源（src-001 等），指向 `/sources` 页
- 原始资料包括：内部 PPT/Excel/Word 笔记 + vLLM Ascend 官方文档
- 不构成采购建议，采购决策以官方报价单 + POC 为准

---

## 📄 License

内部数据归蒙沂鑫所有，转载请保留来源标注。
代码采用 MIT License。
