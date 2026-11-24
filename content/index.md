---
title: "00. Quartz v4 数字花园基准总览"
description: "锁定版本 @jackyzha0/quartz@4.5.2 · Obsidian Flavored Markdown + 双向链接 [[Wikilinks]] + 交互式图谱 + 本地化 KaTeX / Mermaid 12 实测"
tags:
  - benchmark
  - quartz-v4
  - obsidian
---

# Quartz v4 数字花园静态生成基准实测

本站点由独立仓库 [`page2401/quartz`](https://github.com/page2401/quartz) 构建，基于主仓库 `page2401.github.io/docs/` 的标准 GFM 原始母版派生适配而来，用于实测 **Quartz v4 (`4.5.2`)** 在 **Obsidian Flavored Markdown (OFM)** 双向链接 `[[Wikilinks]]`、可折叠标注块（Collapsible Callouts）、反向链接（Backlinks）、交互式知识图谱（Graph View）、Mermaid 图表与 KaTeX 数学公式上的真实工程表现。

> [!tip]+ 数字花园特色：双向链接、悬浮预览与关系图谱
> 将鼠标悬停在任意内部链接（如 [[01-annotations|专属标注]] 或 [[04-directory/nested/01-order-and-url|嵌套子页 A]]）上即可触发原生 **Popover 页内预览**；右侧面板实时渲染基于 `d3` + `pixi.js` 的交互式知识图谱与自动聚合的 **反向链接（Backlinks）**。

## 五大基准测试章节导航

| 章节入口 | 测试维度 | Quartz v4 (`4.5.2`) 核心实测特征 |
| :--- | :--- | :--- |
| [[01-annotations\|01. 专属标注与元数据]] | 专属标注与 OFM 语法 | 原生兼容 GFM `> [!NOTE]` 零改造直通，额外支持 Obsidian `> [!note]+` / `> [!warning]-` 正负号折叠标注、`==高亮标记==` 与 `[[Wikilinks]]` |
| [[02-diagrams\|02. 流程图与时序图]] | 流程图与时序图 | 内置 Mermaid 全屏拖拽缩放容器（`DiagramPanZoom`）与深浅色联动，本基准站将上游 CDN 动态导入改造为本地 `mermaid@12.3.0` ESM 按需加载 |
| [[03-math\|03. 数学公式排版]] | 数学公式排版 | `remark-math@6.0.0` + `rehype-katex@7.0.1` 构建期预渲染 HTML，配合本地化 `katex@0.19.1` 字体与 `copy-tex` 复制还原 LaTeX 源码 |
| [[04-directory/index\|04. 目录结构与路由取舍]] | 目录结构与 Vault 路由 | `content/` 独立知识库隔离、`FolderPage` 目录索引页、同时兼容相对路径 `.md` 与最短路径 `[[Wikilinks]]`，通过 `Explorer` 自定义 `sortFn` 修正文件夹置顶问题 |

## 子模块精确锁定版本档案

| 依赖模块 | 精确锁定版本 | 在本子站中的职责 |
| :--- | :--- | :--- |
| `@jackyzha0/quartz` | `4.5.2` | 自包含源码仓库架构核心引擎（Preact SSR + Unified AST + Micromorph SPA） |
| `preact` / `micromorph` | `10.28.2` / `0.4.5` | 构建期静态组件模板渲染与客户端无刷新 DOM 差分路由 |
| `d3` / `pixi.js` | `7.9.0` / `8.15.0` | 右侧双向链接力导向知识图谱（支持局部与全局全屏图谱切换） |
| `flexsearch` | `0.8.205` | 纯静态本地全文检索与 `#tag` 标签过滤索引 |
| `mermaid` | `12.3.0` | 本地静态托管 `static/mermaid/` 第 12 代流程图、时序图与状态机引擎 |
| `remark-math` / `rehype-katex` | `6.0.0` / `7.0.1` | 构建期 LaTeX 公式 AST 解析与 KaTeX 静态标记生成 |
| `katex` | `0.19.1` | 本地静态托管 `static/katex/` 样式表、`copy-tex` 与 Webfont 字体（零外部 CDN） |
| `shiki` / `rehype-pretty-code` | `1.26.2` / `0.14.1` | 构建期双主题（`github-light` / `github-dark`）语法高亮 |
