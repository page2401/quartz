---
title: "嵌套子页 A：排序前缀与 URL 纯净度权衡"
tags:
  - directory
  - routing
---

# 嵌套子页 A：排序前缀与 URL 纯净度权衡

在 `content/04-directory/nested/` 中，文件名保留 `01-order-and-url.md` 以确保在 Obsidian 文件树、VS Code 与 Git 中按阅读顺序排列。Quartz v4 将文件路径直接映射为无 `.html` 后缀的 Clean URL（`/quartz/04-directory/nested/01-order-and-url`），并通过 `markdownLinkResolution: "shortest"` 允许任意笔记仅凭唯一文件名 `[[01-order-and-url]]` 直接建立双向链接（例如来自 [[01-annotations|01. 专属标注与元数据]] 的跨层引用）。

- 双向链接返回：[[04-directory/index|返回《04. 目录结构与路由取舍》]]
- 下一篇：[[04-directory/nested/02-sidebar-sync|嵌套子页 B：多级子目录与侧边栏同步机制]]
- 母版相对路径对照：[返回上级目录 (`../index.md`)](../index.md) · [前往子页 B (`./02-sidebar-sync.md`)](./02-sidebar-sync.md)
