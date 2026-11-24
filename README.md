# page2401/quartz

独立静态站点对比子模块 —— **Quartz v4 (`4.5.2`)**（Obsidian 数字花园与双向链接知识库生成器）。

- **线上预览地址**：`https://page.2401.xyz/quartz/`
- **对比总站地址**：`https://page.2401.xyz/`
- **分支模型**：
  - `main`：仅保存纯工程源码（`quartz/`、`quartz.config.ts`、`quartz.layout.ts`）与 Obsidian Flavored Markdown 适配版 `content/*.md` 基准文档（挂载为主仓库 `sites/quartz` 子模块）
  - `page`：由 GitHub Actions 自动构建并强制覆盖的纯静态产物孤儿分支（供 GitHub Pages 发布）

## 精确锁定依赖版本

- `@jackyzha0/quartz`: `4.5.2`（自包含源码仓库形态，版本号记录于 `package.json` 顶层 `version`）
- `preact` / `preact-render-to-string`: `10.28.2` / `6.6.5`
- `d3` / `pixi.js`: `7.9.0` / `8.15.0`（交互式双向链接关系图谱 Graph View）
- `flexsearch`: `0.8.205`（本地全文与标签检索索引）
- `remark-math` / `rehype-katex`: `6.0.0` / `7.0.1`
- `katex`: `0.19.1`（零 CDN 本地化 `static/katex/` 样式表、`copy-tex` 与 Webfont 字体）
- `mermaid`: `12.3.0`（零 CDN 本地化 `static/mermaid/` 按需 ESM 图表分块 + 内置拖拽缩放弹窗）
- `shiki` / `rehype-pretty-code`: `1.26.2` / `0.14.1`

## 本地开发与独立构建

```bash
npm ci
npm run dev      # 本地监听预览 (npx quartz build --serve)
npm run build    # 构建静态站点至 public/ (baseUrl: page.2401.xyz/quartz)
```
