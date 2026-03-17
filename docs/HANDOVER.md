# 🤝 AI Wrapper Template - 交接与开发指南 (Handover & Development Guide)

## 1. 项目概况 (Project Overview)
**项目名称**: AI Wrapper Template (Apple-Style)
**核心定位**: 专为“超级个体”设计的 AI 资产孵化母版。
**核心理念**: 
- **极简审美**: Apple 级 Glassmorphism 设计。
- **验证优先**: Ghost Pay 策略优先验证需求，而非堆砌功能。
- **自我修复**: 内置 The Ralph Loop 自愈协议。

## 2. 技术栈 (Tech Stack)
- **Frontend**: Next.js (App Router), Tailwind CSS, Lucide React
- **Backend**: Next.js Route Handlers (Edge/Serverless)
- **Database**: Supabase (PostgreSQL) - *仅在第三阶段启用*
- **Auth**: Supabase Auth - *仅在第三阶段启用*
- **Payment**: 
  - `TEST`: Ghost Pay (Email Collection)
  - `LAUNCH`: Paddle (MoR)
  - `SCALE`: Stripe Atlas
- **Testing**: Playwright (E2E), Python (Auto Engine)

## 3. 核心目录结构 (Key Directory Structure)
```
AI-Wrapper-Template/
├── .trae/rules/               # 🚨 核心规则库 (Trae 必须遵守的红线)
│   ├── architect_prohibitions.md  # 架构师禁令
│   ├── rapid_dev_standards.md     # 极速开发准则
│   └── product_logic.md           # 产品逻辑规则
├── docs/                      # 📚 团队 SOP 文档库
│   ├── SOP.md                 # 资产工厂全流程
│   ├── PRODUCTION_PROTOCOL.md # 生产线调度协议 (角色 & 阶段)
│   ├── GLOBAL_PAYMENT_SOP.md  # 支付与合规 SOP
│   ├── AUTO_ENGINE.md         # The Ralph Loop 自愈协议
│   └── TEMPLATE_INTRODUCTION.md # 模板详细介绍
├── src/
│   ├── app/
│   │   ├── page.tsx           # 主页 (核心逻辑: 持久化, 10条限制)
│   │   └── api/generate/      # AI 接口 (DeepSeek/OpenAI)
│   └── components/
│       ├── Paywall.tsx        # 付费墙组件
│       └── GlobalPaySystem.tsx # 全局支付路由系统
├── tests/
│   ├── paywall.spec.ts        # The Ralph Loop 核心测试脚本
│   └── auto_engine_test.py    # Python 版自愈脚本
└── .env.local                 # 🔑 环境变量配置
```

## 4. 开发流程与生命周期 (Development Lifecycle)

### 🔴 Phase 1: Ghost Pay 验证 (0-2小时)
- **目标**: 快速上线 Vercel 二级域名。
- **配置**: `.env.local` 设置 `NEXT_PUBLIC_PAY_STRATEGY=TEST`。
- **验证**: 运行 `npx playwright test` 确保通过 **The Ralph Loop**。
- **功能**: LocalStorage 持久化 + 10条消息触发 Ghost Pay 弹窗。

### 🟡 Phase 2: 生死裁决 (48小时)
- **监控**: 观察 GA 数据。
- **指标**: 
  - 邮箱收集 < 50 且 CTR < 3% ➡️ **Kill Project** (删除 Vercel)。
  - 邮箱收集 >= 50 ➡️ **Proceed to Phase 3**。

### 🟢 Phase 3: 商业化 (Scale)
- **目标**: 接入真实支付与数据库。
- **配置**: 
  - `.env.local` 设置 `NEXT_PUBLIC_PAY_STRATEGY=LIVE`。
  - 启用 Supabase (`profiles`, `app_assets` 表)。
  - 接入 Paddle API。

## 5. 交接注意事项 (Handover Checklist)

### ✅ 环境配置
1.  确保 Node.js > 18, Python > 3.8。
2.  复制 `.env.example` 到 `.env.local` 并填入:
    - `DEEPSEEK_API_KEY`
    - `NEXT_PUBLIC_GA_ID`
    - `NEXT_PUBLIC_THEME` (默认: `apple_minimalist`)
    - `NEXT_PUBLIC_PAY_STRATEGY`

### ✅ 自动化测试 (The Ralph Loop)
接手后，**必须**首先运行一次自动化测试以确保代码健康：
```bash
# 1. 启动本地服务
npm run dev

# 2. 在新终端运行测试
npx playwright test tests/paywall.spec.ts
```
**注意**: 如果测试失败，Trae 会尝试自动修复。请勿在测试通过前提交代码。

### ✅ 规则与禁令
接手人**必须阅读** `.trae/rules/` 下的所有文件：
- **严禁**: WebSocket, Redis, 自建后端, AntD。
- **强制**: Next.js Route Handlers, Supabase Auth, Tailwind CSS.

### ✅ 部署
- 项目已配置 Vercel 自动部署。
- 推送 `main` 分支即可触发构建。
- 确保 Vercel 后台环境变量与 `.env.local` 一致。

---
*Document created by Trae on 2026-02-15.*
