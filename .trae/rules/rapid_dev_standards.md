# 全栈极速开发准则 (Rapid Dev Standards)

## 1. 2小时闭环 (2-Hour Loop)
- **核心原则**: 所有功能必须能在 **2小时内** 完成开发并上线。
- **验收标准**: 不懂代码的产品经理 (PM) 必须能看懂代码逻辑和提交记录。如果逻辑过于复杂，说明设计过度，必须简化。

## 2. 万能 Schema (Universal Schema)
- **强制结构**:
  - `profiles`: 存储用户基础信息 (ID, email, subscription_tier)。
  - `app_assets`: 存储应用核心数据 (content, generation_result, metadata)。
- **安全策略**: 严禁绕过 RLS (Row Level Security)。所有数据库操作必须经过 Supabase Auth 鉴权。

## 3. 三段式支付 (Tri-Stage Payment)
- **控制开关**: 环境变量 `NEXT_PUBLIC_PAY_STRATEGY`。
- **模式**:
  - `GHOST`: 假支付 (GhostPay)，仅收集邮箱。
  - `PADDLE`: Paddle 支付 (个人/MoR 模式)。
  - `STRIPE`: Stripe 支付 (公司模式)。
- **严禁硬编码**: 禁止在代码中写死具体的支付逻辑，必须通过策略模式切换。

## 4. 出厂必检项 (Mandatory Pre-Flight Checks)
- **多语言基座 (Global SEO)**:
  - 必须配置 `next-intl`。
  - `layout.tsx` 必须预设中英双语切换逻辑。
- **OG 动态制图 (Viral Engine)**:
  - 必须存在 `/api/og` 接口。
  - 使用 `satori` 和 `resvg-js` 生成动态社交卡片。
- **财富闭环 (Wealth Loop)**:
  - 支付成功回调必须触发 Webhook 信号发送至 whiteAI。
  - 确保每一笔交易都被实时记录。

## 5. 收割组件 (Harvesting Components)
- **Dopamine Loader (伪装进度条)**:
  - 必须使用 `DopamineLoader` 组件。
  - 强制 8 秒以上的加载动画（Initializing -> Analyzing -> Searching -> Synthesizing），模拟 AI 深度思考，提升用户价值感知。
- **Blur-to-Pay (物理遮罩)**:
  - 必须使用 `BlurToPay` 组件。
  - 遵循“损失厌恶”原则：免费展示 30% 内容，剩余 70% 必须高斯模糊并覆盖解锁按钮。
  - 严禁一次性锁死所有内容，必须给用户“尝甜头”的机会。
- **Trust Catalyst (社会证明)**:
  - 必须在核心转化区（如 Hero Section 或支付按钮旁）挂载 `TrustBanner`。
  - 必须模拟“实时交易流”（如“2分钟前有人购买了Pro版”），消除用户决策焦虑。

## 6. 48小时强制赚钱协议 (48-Hour Profit Protocol)
- **极简主义原则**: 禁止使用任何需要配置超过 30 分钟的第三方库。
- **MVP 单机原则**: 验证期（头 48 小时）严禁配置 Supabase 或数据库。仅允许 LocalStorage 存储。
- **B2C 走量铁律**:
  - 选品关键词必须覆盖大众痛点。
  - 坚决不做回不了本的极客生意。
- **试用限额锁死 (The 10-Message Hook)**:
  - 对话类：强制设定 10 条免费消息限额。满额后触发 GhostPay。
  - 报告类：仅展示前 30% 内容，核心结果必须点击“获取完整版”触发布控。
- **部署与域名红线**: 严禁在验证期购买顶级域名。必须使用 Vercel 免费子域名进行暴力测试。
- **自动生成生死状**: Header 处必须显示开发者可见的倒计时“裁决还剩 XX 小时”。
- **数据金库**: 必须默认集成 Google Analytics 和 GhostPay 记录器。
- **盈利公式锁死**:
  $$Verdict = \begin{cases} \text{Full Dev}, & \text{if } \text{Paying_Users} > 50 \text{ in 48h} \\ \text{Archive}, & \text{otherwise} \end{cases}$$
- **48小时裁决标准**: 
  - 4 小时开发完成，48 小时验证。
  - 邮箱数 < 50 则停止流量供给。
  - 若 72 小时后邮箱数 < 10，代码直接 Archive，禁止任何优化行为。
- **部署指令**: 代码写完后，Trae 必须强制建议开发者执行 `vercel --prod`，确保 4 小时内从“本地”变成“全球可用”。
