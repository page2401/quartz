---
title: "04. 目录结构与路由取舍"
description: "实测 Quartz v4 的 content/ 知识库隔离、FolderPage 目录笔记 (index.md)、Explorer 自定义排序与双向 [[Wikilinks]] 路由机制。"
tags:
  - directory
  - routing
  - explorer
---

# 04. 目录结构与路由取舍（Quartz `content/` 数字花园模式）

本章节基于母版 `04-directory/` 多级嵌套子目录 `nested/`，实测 **Quartz v4 (`4.5.2`)** 将 Obsidian 本地知识库（Vault）直接映射为静态网站时的目录架构与侧边栏权衡：

1. **`content/` 独立 Vault 隔离 + 自包含源码仓**：所有 Markdown 笔记集中存放在 `content/` 目录，与根目录 `README.md`、`quartz.config.ts`、`quartz.layout.ts` 及 `quartz/` 编译器源码彻底分离；即使子目录缺失 `index.md`（如 `nested/`），`Plugin.FolderPage()` 也会自动为其生成目录聚合索引页。
2. **双轨链接兼容（`[[Wikilinks]]` + 标准相对路径 `.md`）**：启用 `Plugin.CrawlLinks({ markdownLinkResolution: "shortest" })` 后，既可使用 Obsidian 原生最短路径双链 `[[01-order-and-url]]` / `[[04-directory/nested/01-order-and-url|子文档 A]]`，也可直接保留母版的标准相对链接 `[...](./nested/01-order-and-url.md)`，并自动汇总全站反向链接与关系图谱。
3. **`Explorer` 默认“文件夹优先”排序陷阱与修正**：Quartz 左侧资源管理器默认将所有文件夹排在单文件之前（会导致 `04. 目录结构与路由取舍` 排到 `01. 专属标注` 上方），且无 `_category_.json` 配置文件；必须在 `quartz.layout.ts` 的 `Component.Explorer({ sortFn, mapFn })` 中编写纯函数覆盖默认排序并为英文子目录 `nested` 映射中文标题。

## 嵌套子文档实测入口（双轨链接对照）

- **Obsidian 双向链接语法**：[[04-directory/nested/01-order-and-url|进入子文档 A：排序前缀与 URL 纯净度权衡]] · [[04-directory/nested/02-sidebar-sync|进入子文档 B：多级子目录与侧边栏同步机制]]
- **母版标准相对路径语法**：[进入子文档 A（标准 Markdown 链接）](./nested/01-order-and-url.md) · [进入子文档 B（标准 Markdown 链接）](./nested/02-sidebar-sync.md)
