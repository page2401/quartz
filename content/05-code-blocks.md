---
title: "05. 高阶代码块与语法高亮"
description: "实测 Quartz v4 (4.5.2) 内置 Plugin.SyntaxHighlighting (rehype-pretty-code + Shiki) 的双主题 CSS 变量、title 标题栏、{3,7-9} 行高亮、/word/ 词级高亮与 OFM 折叠组。"
tags:
  - code-blocks
  - shiki
  - rehype-pretty-code
aliases:
  - code-blocks
---

# 05. 高阶代码块与语法高亮（Quartz v4 · `rehype-pretty-code` 派生版）

技术文档中超过 40% 的篇幅由代码块构成。在数字花园工具链中，**Quartz v4 (`4.5.2`)** 内置了 `Plugin.SyntaxHighlighting()` 转换器，底层直接驱动 **`rehype-pretty-code@0.14.1` + `shiki@1.26.2`**，在构建期生成同时携带 `--shiki-light` 与 `--shiki-dark` 双主题 CSS 内联变量的纯静态 HTML（可回溯 [[01-annotations|01. 专属标注与元数据]] 与 [[04-directory/index|04. 目录结构与路由取舍]] 查看全站双链关系图谱联动）。

> [!tip]+ 构建期零运行时 JS + 原生一键复制按钮
> Quartz v4 在 `quartz/styles/base.scss` 中完整预置了 `figure[data-rehype-pretty-code-figure]`、`[data-rehype-pretty-code-title]`、`[data-highlighted-line]` 与 `[data-highlighted-chars]` 样式，并自动为每个代码块挂载右上角剪贴板复制按钮，无需安装任何第三方插件。

## 1. 代码块文件名标题栏与行号（`title="..." showLineNumbers`）

在母版 GFM 中只能在代码块上方手写粗体路径，而派生至 Quartz v4 后，只需在围栏信息串追加 `title="scripts/resolve-route.ts" showLineNumbers`，`rehype-pretty-code` 即自动生成 `<figcaption data-rehype-pretty-code-title>` 标题胶囊与 CSS 计数器行号列：

```ts title="scripts/resolve-route.ts" showLineNumbers
export interface RouteContext {
  basePath: string
  slug: string
  cleanUrls: boolean
}

export function formatDocRoute(ctx: RouteContext): string {
  const prefix = ctx.basePath.endsWith('/') ? ctx.basePath : `${ctx.basePath}/`
  const normalized = ctx.slug.replace(/^\/+|\/+$/g, '')
  if (!normalized || normalized === 'index') return prefix
  return ctx.cleanUrls ? `${prefix}${normalized}/` : `${prefix}${normalized}.html`
}
```

## 2. 关键行聚焦与词级高亮（`{3,7-9}` 与 `/strictZeroCdn/`）

`rehype-pretty-code` 不仅原生支持 `{3,7-9}` 指定行高亮（编译为 `<span data-line data-highlighted-line>` 并附带左侧强调色竖条），还支持在同一信息串内通过正则字面量 `/strictZeroCdn/` 精准圈出==行内特定标识符==（编译为 `<mark data-highlighted-chars>`）：

```json title="benchmark.config.json" showLineNumbers {3,7-9} /strictZeroCdn/
{
  "id": "ssg-benchmark",
  "routeStyle": "clean",
  "strictZeroCdn": true,
  "markdown": {
    "mathEngine": "katex",
    "diagramEngine": "mermaid",
    "lineHighlight": true,
    "codeTransformers": ["diff", "focus"]
  }
}
```

## 3. 代码增删对比着色（Diff Highlighting 与转换器边界）

> [!note]- 细微边界：`rehype-pretty-code` 默认未挂载 `@shikijs/transformers`
> 虽然 Quartz v4 底层同样基于 Shiki，但其 `quartz/plugins/transformers/syntax.ts` 默认仅向 `rehype-pretty-code` 传入双主题配置，并未注册 VitePress 默认开启的 `transformerNotationDiff()`（即 `// [!code --]` / `// [!code ++]` 注释指令）。因此在默认零改配置下，表达补丁增删仍以标准 `diff` 语法块结合 `title="..."` 最为稳妥：

```diff title="scripts/mount-subsite.diff"
 export function mountSubsite(baseDir: string, subPath: string): string | null {
-  const cleanRel = decodeURIComponent(subPath).replace(/\.\./g, '')
-  return `${baseDir}/${cleanRel}`
+  const resolvedBase = path.resolve(baseDir)
+  const target = path.resolve(resolvedBase, decodeURIComponent(subPath).replace(/^\/+/, ''))
+  return target.startsWith(`${resolvedBase}${path.sep}`) ? target : null
 }
```

## 4. 多语言运行时命令组（Obsidian 可折叠 Callouts 方案）

由于 Quartz v4 坚持纯 Markdown / OFM 路线而非 MDX JSX 组件体系（无内置 `<Tabs>` 组件），面对跨语言工具链安装命令组，数字花园生态最地道的做法是利用 Obsidian 原生 **`> [!example]+`（首项默认展开）与 `> [!example]-`（其余按需展开）** 折叠标注块——既在网页端实现清爽收纳，又能在本地 Obsidian 客户端 100% 同构交互：

> [!example]+ Node.js (`package.json`) — 默认展开
> ```bash title="terminal"
> npm ci && npm run build
> ```

> [!example]- Deno 2 (`deno.json`) — 点击展开
> ```bash title="terminal"
> deno task build
> ```

> [!example]- Python (`requirements.txt`) — 点击展开
> ```bash title="terminal"
> pip install -r requirements.txt && sphinx-build -b dirhtml . _build/dirhtml
> ```

> [!example]- Ruby (`Gemfile`) — 点击展开
> ```bash title="terminal"
> bundle install && bundle exec jekyll build
> ```

## 5. 四大底层高亮引擎能力对照小结

| 高亮引擎代表 | 典型采用框架 | 构建期零运行时 JS | 原生行号 / 行高亮 | 保留词法着色的 Diff |
| :--- | :--- | :--- | :--- | :--- |
| **Shiki / `rehype-pretty-code`** | **Quartz v4**、Fumadocs、Nextra、VitePress、Starlight | ✅ 纯静态双主题 CSS 变量 | ✅ `showLineNumbers` + `{3,7-9}` + `/word/` | ⚠️ 需额外挂载 `transformerNotationDiff`（默认支持 `diff` 块） |
| **Prism.js** | Docusaurus、VuePress、Eleventy (plugin)、Gatsby | ✅ 静态 Token 类名 | ✅ `{1,3-5}` / 魔法注释 | ⚠️ 需配 diff-highlight 插件 |
| **Pygments / Rouge** | MkDocs Material、Sphinx、Pelican、Jekyll | ✅ Python/Ruby 编译直出 | ✅ `hl_lines` / `emphasize-lines` | ⚠️ 仅标准 `diff` 块红绿 |
| **Chroma / Giallo / hljs** | Hugo (Go Chroma)、Zola (Rust Giallo)、mdBook / HonKit (hljs) | ✅ (HonKit 为构建期 hljs) | ✅ Hugo/Zola 原生 `hl_lines` | ⚠️ 仅标准 `diff` 块红绿 |
