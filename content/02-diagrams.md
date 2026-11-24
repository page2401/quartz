---
title: "02. 流程图与时序图"
description: "实测 Quartz v4 (4.5.2) 内置 Mermaid 拖拽缩放弹窗与本地化 mermaid@12.3.0 ESM 按需渲染。"
tags:
  - diagrams
  - mermaid
---

# 02. 流程图与时序图（Quartz v4 · Mermaid 12 基准）

Quartz v4 在 `Plugin.ObsidianFlavoredMarkdown()` 中开箱内置了 ```` ```mermaid ```` 识别、深浅色主题变量自动映射以及右上角全屏拖拽缩放模态框（`DiagramPanZoom`）。

> [!info]+ 零外部 CDN 与 `<id>` 尖括号吞噬修复实录
> 1. **离线本地化**：上游 Quartz v4 默认在浏览器运行时从 `cdnjs.cloudflare.com` 动态加载 `mermaid@11.4.0`；本基准站将其升级并改造为本地 `static/mermaid/mermaid.esm.min.mjs`（精确锁定 `mermaid@12.3.0`）。
> 2. **尖括号 `<id>` 解析陷阱**：上游 `mermaid.inline.ts` 读取 `node.innerText` 后误用 `node.innerHTML = oldText` 写回源码，导致母版节点标签中的 `<id>` 被浏览器当作未闭合 HTML 标签并在末尾自动补全 `</id></id>` 触发语法报错；改用 `node.textContent = oldText` 后完美原样渲染。可结合 [[01-annotations|专属标注]] 与 [[03-math|数学公式排版]] 对比构建策略。

## 1. 复杂子图与架构流程图（`flowchart TD`）

测试中文节点标签、子图嵌套（`subgraph`）、虚线边与条件分支：

```mermaid
flowchart TD
    subgraph MainRepo["主仓库 page2401.github.io"]
        Master["母版 docs/*.md (Pure GFM)"]
        SubPtr["Git Submodule 指针 (sites/*)"]
        Workbench["对比工作台源码 (main)"]
    end

    subgraph SubRepo["各独立派生子仓库 (sites/<id>)"]
        SrcBranch["main 分支: 框架配置 + 派生适配版 *.md"]
        Actions{"GitHub Actions 构建"}
        PageBranch["page 孤儿分支: 纯静态产物 + .nojekyll"]
        SrcBranch --> Actions
        Actions -->|"自动构建发布"| PageBranch
    end

    Master -.->|"按各框架方言派生"| SrcBranch
    SubPtr -.->|"跟踪 main 分支"| SrcBranch
    Workbench -->|"对比母版与各派生版差异"| Portal["https://page.2401.xyz/"]
    PageBranch -->|"GitHub Organization Pages"| SubSite["https://page.2401.xyz/<id>/"]
```

## 2. 编译管线交互时序图（`sequenceDiagram`）

测试多参与者生命线、`alt` 分支块及激活框（`activate`/`deactivate`）：

```mermaid
sequenceDiagram
    autonumber
    actor Author as 文档作者
    participant Master as 主仓母版 docs/*.md
    participant SubGit as 子模块 main 分支
    participant CI as GitHub Actions (Node 22)
    participant Pages as GitHub Pages (page 分支)

    Author->>Master: 编写标准 GFM 基准母版
    Master->>SubGit: 派生适配特定 SSG 版本语法
    SubGit->>CI: 触发 deploy-page.yml 工作流
    activate CI
    alt 编译型 SSG (Quartz / VitePress / Starlight)
        CI->>CI: 预编译静态 HTML + 公式 + 图表挂载点
    else 运行时引擎 (Docsify v4 / v5)
        CI->>CI: 组装原始 *.md + _sidebar.md + 锁定版本 vendor
    end
    CI->>Pages: force_orphan 推送至孤儿分支 page
    deactivate CI
    Pages-->>Author: 同源子路径 /<id>/ 即刻生效
```

## 3. 子模块同步状态机（`stateDiagram-v2`）

测试状态机语法与状态迁移说明标签：

```mermaid
stateDiagram-v2
    [*] --> MasterEdited: 更新主仓母版 docs/*.md
    MasterEdited --> SubmoduleDerived: 同步派生适配至各子模块 *.md
    SubmoduleDerived --> SubmodulePushed: 子模块 commit & push origin main
    SubmodulePushed --> PageDeploying: 子仓库 Actions 自动更新 page 分支
    SubmodulePushed --> MainRepoUpdated: 主仓库更新子模块指针并构建对比数据
    PageDeploying --> LiveSynced: 线上渲染与母版源码差异视图全部就绪
    MainRepoUpdated --> LiveSynced: 计算相对母版改动行数完成
    LiveSynced --> [*]
```
