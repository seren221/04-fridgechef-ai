# 🤖 AI 资产工厂：全自动化项目执行 SOP (V4.0)

**适用环境**：TRAE (Solo Mode) + 4人天才团队
**核心目标**：2小时上线，48小时生死裁决，日收益目标 $100

## 1. 指挥官入口：TRAE 环境配置 (Environment Keys)
TRAE 必须在 `.env.local` 中识别以下变量才能自主完成部署（参考 Image 3）：
*   `DEEPSEEK_API_KEY`: 核心逻辑调用。
*   `NEXT_PUBLIC_GA_ID`: 必须填写。用于流量监控与 Paddle 审核背书。
*   `NEXT_PUBLIC_PAY_STRATEGY`: 设置为 `TEST` (激活 Ghost Pay 弹窗) 或 `LIVE` (接入 Paddle)。
*   `NEXT_PUBLIC_THEME`: 统一风格（推荐 `apple_minimalist` 以提升溢价感）。

## 2. 团队成员全自动化任务单 (No-Communication Tasks)

### 🛰️ Operator A (情报员)：自动化选品
*   **TRAE 指令**：运行 `scripts/crawler.py`，抓取 Product Hunt 排名 50-150 的产品。
*   **输出要求**：提交一个包含 `Target_Pain_Point`（痛点）和 `Competitor_URL`（竞品）的 JSON 文件。
*   **生死裁决预判**：若竞品在 App Store 无内购或网页版无流量，直接标记为 KILL。

### 🏗️ Operator B (架构师)：TRAE 核心开发
*   **TRAE 指令**：根据情报员的 JSON，调用 Trae 自动生成前后端代码。
*   **强制逻辑（参考 Image 1）**：
    *   **Memory 模块**：利用 `LocalStorage` 实现对话持久化。
    *   **Paywall 模块**：设置消息阈值（如 10 条），触发升级弹窗。
    *   **Ghost Pay 逻辑**：点击“支付”后，若 `PAY_STRATEGY=TEST`，则弹出邮箱收集框。

### 🎨 Operator C (UI/UX)：溢价感包装
*   **TRAE 指令**：调用 v0.dev 或内置 UI Agent，美化 `page.tsx`。
*   **必备组件**：首页必须包含 FAQ、Testimonials (评价) 和 底部合规三板斧 (Privacy, Terms, Refund Policy)。

### 📢 Operator D (内容官)：Karma 营销引流
*   **自动化流**：利用 AI 抓取项目完成的截图，生成“19岁团队创业故事”文案。
*   **发布目标**：自动/手动分发至小红书、X (Twitter)、即刻。
*   **追踪**：所有链接必须带 UTM 参数，以便在 Google Analytics 中区分流量来源。

## 3. 为什么要填 Google Analytics ID (GA ID)？
在你的模板中，这是**“数据驱动生存”**的唯一出口：
1.  **防爆破审核**：Paddle 的审核员会查看你的源码。如果没有统计代码，网站会被判定为“临时钓鱼站”而拒绝。
2.  **Ghost Pay 漏斗分析**：你需要看 GA 中的“点击升级按钮”人数。
    *   公式：点击人数 / 独立访客(Users) > 3% $\rightarrow$ 继续投入。
    *   公式：转化率 < 1% $\rightarrow$ 立刻杀死项目。
3.  **流量溯源**：判断 Operator D 发的哪个帖子带了“矿”，从而决定下一步的资源倾斜。

## 4. 财务合拢方案 (Final Payout)
当项目通过 48 小时验证（即有人点击 Ghost Pay 留下邮箱）后：
*   **身份切换**：打开 Paddle Live 申请，选 Individual。
*   **税号操作**：在 W-8BEN 表格中，Foreign TIN 直接填你的 18 位中国身份证号。
*   **资金链路**：Paddle (美金) $\rightarrow$ Airwallex (空中云汇) 美国虚拟账户 $\rightarrow$ 提到你国内卡。
