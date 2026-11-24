---
title: "嵌套子页 B：多级子目录与侧边栏同步机制"
tags:
  - directory
  - explorer
---

# 嵌套子页 B：多级子目录与侧边栏同步机制

在 Quartz v4 中，`Plugin.ContentIndex()` 在构建期扫描 `content/` 生成 `static/contentIndex.json`，左侧 `Explorer` 组件据此自动构建完整的多级目录树，彻底杜绝了手写侧边栏遗漏导致的“孤岛页”。由于 Quartz 不引入 `_category_.json` 或 `_meta.json` 等目录元数据文件，若需将物理子目录 `nested/` 显示为中文名称，需在 `quartz.layout.ts` 的 `Explorer({ mapFn })` 中统一映射（注意 `mapFn` 会被序列化至前端执行，不可引用外部闭包变量）。

- 返回上一篇：[[04-directory/nested/01-order-and-url|嵌套子页 A：排序前缀与 URL 纯净度权衡]]
- 返回章节首页：[[04-directory/index|04. 目录结构与路由取舍]] · [[index|返回 00. 基准总览]]
- 母版相对路径对照：[返回上一篇 (`./01-order-and-url.md`)](./01-order-and-url.md) · [返回上级 (`../index.md`)](../index.md)
