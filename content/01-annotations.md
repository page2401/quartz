---
title: "01. 专属标注与元数据"
description: "实测 Quartz v4 (4.5.2) 的 Obsidian Flavored Markdown 可折叠标注 (> [!note]+/-)、==高亮标记==、双向 [[Wikilinks]] 与 GFM Alerts 零改造直通。"
tags:
  - annotations
  - ofm
  - callouts
aliases:
  - annotations
---

# 01. 专属标注与元数据（Quartz v4 · OFM 派生版）

不同静态网站生成器对“提示框 / 标注（Callouts / Admonitions）”和页面元数据的语法约定存在显著分歧。本文件由原始 GFM 母版派生适配至 **Quartz v4 (`4.5.2`)**，重点展示 **Obsidian Flavored Markdown (OFM)** 与标准 GFM 的天然同源优势。

## 1. Frontmatter 元数据与 Obsidian 特有内联标记

Quartz v4 通过 `Plugin.FrontMatter()` 与 `Plugin.ObsidianFlavoredMarkdown()` 解析笔记元数据及双链语法：

- **当前页标题字段**：`title: "01. 专属标注与元数据"`
- **页面摘要字段**：`description: "..."`
- **数字花园扩展字段**：原生支持 `tags`（生成顶部可点击标签胶囊并汇入检索索引）、`aliases`（通过 `Plugin.AliasRedirects()` 自动生成旧路径重定向 HTML）与 `draft: true` 草稿过滤。
- **OFM 内联增强实测**：原生支持 Obsidian 双等号 ==高亮标记==（渲染为 `<span class="text-highlight">`），以及跨章节双向链接如 [[02-diagrams|02. 流程图与时序图]]、[[03-math|03. 数学公式排版]] 与深层节点 [[04-directory/nested/01-order-and-url]]（目标页底部将自动生成指向本页的反向链接）。

## 2. 标准提示语义块与 Obsidian 正负号折叠标注（Callouts）

不同于 VitePress / Docusaurus 需要改写为三冒号 `:::` 容器，Obsidian 与 Quartz v4 原生采用与 GitHub Alerts 同源的 `> [!type]` 引用语法，并支持多达十余种语义别名及 **`+`（默认展开）/ `-`（默认收起）** 折叠修饰符：

> [!note]+ 可折叠提示（`> [!note]+` 默认展开，点击标题可收起）
> 默认信息提示块：静态站点对比平台的每个子模块均独立维护 `main`（源码）与 `page`（构建产物）双分支，互不污染提交历史。

> [!tip] 性能优化建议（自定义标题紧随其后）
> 在派生到三冒号体系时，VitePress 写作 `::: tip 性能优化建议`，Starlight 必须写作 `:::tip[性能优化建议]`；而在 Quartz v4 中直接沿用 `> [!tip] 性能优化建议` 即可原生渲染图标与配色。

> [!warning]- 默认收起警告（`> [!warning]-` 点击展开查看版本边界）
> 注意区分各派系关键字命名——Quartz v4 的 `calloutMapping` 同时将 `warning`、`attention`、`caution` 映射为警告样式，并将 `danger`、`error` 映射为高危样式，容错度极高。

> [!danger] 不可逆分支覆盖警告
> 自动化流水线在向 `page` 分支推送构建产物时会启用 `force_orphan: true`，切勿在 `page` 分支直接手工修改代码！

## 3. 可折叠详情容器（原生 HTML `<details>` 与 OFM 混排）

除了上方的 `> [!warning]-` 语法糖外，Quartz v4 内置 `rehype-raw`，同样完整兼容母版标准 HTML `<details>` 与 `<summary>` 标签，且内部空行后可正常渲染代码块与 KaTeX 数学公式：

<details>
<summary>点击展开查看母版原生 HTML 折叠容器与公式混排效果</summary>

```markdown
> [!note]+ Obsidian 可折叠标注
> 在 Obsidian 本地库与 Quartz v4 网页端均可零插件双向折叠。
```

除了代码块，折叠容器内同样支持列表、==重点高亮== 与数学公式 $f(x) = x^2 + 1$。

</details>

## 4. GitHub 风格引用警报（GFM Alerts）跨框架直通测试

以下三段在**所有派生子模块中均保持一字不改**，用于测试：如果不做任何方言改写、直接把母版 `.md` 丢进目标生成器，哪些框架能原样渲染，哪些会退化为普通引用文本（Quartz v4 可 **100% 零改造原生直通**）：

> [!NOTE]
> 这是一段标准的 GitHub Flavored Markdown `[!NOTE]` 警报文本，用于检验各生成器对母版语法的零改造直通能力。

> [!IMPORTANT]
> 跨平台迁移 Markdown 文档时，是否原生兼容 `> [!IMPORTANT]` 与 `> [!WARNING]` 直接决定了母版文档的派生改造成本。

> [!CAUTION]
> 若目标生成器未内置 GFM Alert 解析器（如 VuePress v1、Starlight 默认配置、Docsify v4 旧插件），上方标记会退化为普通引用块并原样露出 `[!CAUTION]` 字符串。
