# 🍎 AI-Wrapper-Template 核心介绍与指南

## 1. 模板定位 (Identity)
这是一个**全栈式 AI 资产孵化母版**，专为追求“2小时上线、48小时验证”的超级个体和独立开发团队设计。它不仅仅是一套代码，更包含了一套完整的**产品验证方法论 (SOP)**。

**核心哲学**：
*   **Apple-Style Aesthetic**: 极简、玻璃拟态、高溢价感 UI。
*   **Verification First**: 优先验证需求，而非堆砌功能。
*   **Self-Healing**: 代码具备自我修复能力，减少维护成本。

## 2. 核心能力 (Core Capabilities)

### 🎨 极致 UI/UX
*   **Glassmorphism**: 预置高质感玻璃拟态组件 (`src/app/page.tsx`)。
*   **Theme System**: 支持一键切换主题（Apple Minimalist, Black Gold, Acid Aesthetic），由 `.env.local` 控制。
*   **Responsive**: 完美适配移动端与桌面端。

### 💰 变现与支付 (Monetization)
*   **Ghost Pay Protocol**: 
    *   在验证期 (`NEXT_PUBLIC_PAY_STRATEGY=TEST`)，支付按钮触发“邮箱收集弹窗”，无痛测试付费意愿。
*   **Global Pay System**:
    *   `src/components/GlobalPaySystem.tsx`: 智能切换 Ghost Pay (Test)、Paddle (Launch)、Stripe (Scale)。
*   **Smart Paywall**:
    *   `src/components/Paywall.tsx`: 基于本地存储的消息计数器，默认 10 条消息后强制拦截。

### 🛡️ 质量与自动化 (Quality & Automation)
*   **Self-Healing Protocol**:
    *   `AUTO_ENGINE.md`: 定义了自动化测试标准。
    *   `tests/auto_engine_test.py`: 自动验证持久化、付费墙和 Ghost Pay 逻辑。如果测试失败，Trae 会尝试自动修复。
*   **Data Persistence**:
    *   利用 `LocalStorage` 自动保存聊天记录，刷新不丢失。

### 📊 数据驱动 (Data Driven)
*   **Analytics Blocker**: 强制检查 `NEXT_PUBLIC_GA_ID`，确保上线即有数据监控。
*   **Conversion Tracking**: 专注于监控“Upgrade Button Click”转化率。

## 3. 目录结构概览 (Structure)

```
AI-Wrapper-Template/
├── .trae/rules/           # Trae 智能体的行为准则 (Product Logic)
├── docs/                  # 团队协作 SOP 文档库
│   ├── SOP.md             # 全流程执行 SOP
│   ├── DEPLOY_SOP.md      # 部署指南
│   ├── AUTO_ENGINE.md     # 自愈协议
│   └── GLOBAL_PAYMENT_SOP.md # 支付策略
├── src/
│   ├── app/               # Next.js App Router 页面
│   │   ├── page.tsx       # 主页 (UI + 逻辑)
│   │   └── api/           # 后端 API (DeepSeek 接入点)
│   └── components/        # UI 组件 (Paywall, GlobalPaySystem)
├── tests/                 # Playwright 自动化测试脚本
│   ├── auto_engine_test.py # 核心自愈测试脚本
│   └── smoke_test.py       # 基础烟雾测试
├── .env.local             # 环境变量配置 (Key, Theme, Strategy)
└── package.json           # 项目依赖
```

## 4. 快速启动 (Quick Start)

1.  **环境配置**:
    复制 `.env.example` 为 `.env.local`，填入 `DEEPSEEK_API_KEY` 和 `NEXT_PUBLIC_GA_ID`。

2.  **启动开发服**:
    ```bash
    npm run dev
    ```

3.  **运行自愈测试**:
    ```bash
    # 确保本地服务已在 localhost:3000 (或 3001) 启动
    python tests/auto_engine_test.py
    ```

4.  **部署**:
    遵循 `docs/DEPLOY_SOP.md` 指引，推送到 GitHub 并连接 Vercel。

---
*Created by Trae for the Super Individual.*
