# 🤖 生产线调度协议 (Production Line Scheduling Protocol)

## 1. 团队角色定义 (Team Roles)
由 TRAE 自动调用对应的脚本/文档执行任务：

- **🕵️ 情报员 (Operator A)**
  - **职责**: 负责提供 `spec.json`，定义产品核心功能与数据结构。
  - **交付**: 市场调研报告与初始需求文档。

- **🏗️ 架构师 (Operator B)**
  - **职责**: 负责 API 接口定义、Supabase 数据库建模及代码合拢。
  - **红线**: 严格遵守 `.trae/rules/architect_prohibitions.md`。

- **🎨 UI/UX (Operator C)**
  - **职责**: 负责可视化溢价感设计。
  - **风格**: `apple_minimalist` (Apple 极简风)，强调玻璃拟态与留白。

- **📢 内容官 (Operator D)**
  - **职责**: 负责抓取自动化测试视频进行 Karma 营销。
  - **产出**: 社交媒体素材与传播计划。

## 2. 开发三阶段：硬性质量门禁 (The 3 Stages)

### 第一阶段：Ghost Pay 验证 (0-2小时)
- **核心逻辑**:
  - ✅ **LocalStorage 对话持久化**: 刷新页面不丢失历史。
  - ✅ **10条消息阈值**: 用户发送第 11 条消息时触发拦截。
  - ✅ **Ghost Pay 弹窗**: 弹出邮箱收集框，模拟支付流程。
- **环境变量**: `NEXT_PUBLIC_PAY_STRATEGY=TEST`
- **发布目标**: Vercel 二级域名 (`project-name.vercel.app`)。

### 第二阶段：生死裁决期 (48小时)
- **数据源**: Google Analytics (GA) 后台数据流。
- **硬性指标**:
  - 🔴 **Kill**: 邮箱收集数 < 50 且 点击率 (CTR) < 3% -> **立刻删除 Vercel 站点，杀死项目。**
  - 🟢 **Pass**: 邮箱收集数 >= 50 -> **触发第二阶段：Supabase 合拢。**

### 第三阶段：商业化转型 (2小时)
- **后端指令**: 启用 Supabase，创建 `profiles` 和 `app_assets` 表。
- **财务指令**: 
  - 环境变量变更为 `NEXT_PUBLIC_PAY_STRATEGY=LIVE`。
  - 接入 **Paddle** 个人卖家接口 (MoR 模式)。
