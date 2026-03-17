# ✋ 开发者宣誓区 (Developer Oath)
> **任何通过 Trae 进行的修改，必须首先阅读并执行 `.trae/rules/` 下的所有准则。**
> 
> *PM，我已加载《全栈极速开发准则》和《架构师禁令》，将确保 2 小时内完成部署。*

# Apple-Style AI Wrapper Master Template 🍏

## 核心理念 (Core Philosophy)
这是一款专为**“超级个体”**设计的 Web AI 套壳产品母版。旨在帮助开发者以极低的成本、极高的审美标准，快速构建和验证 AI 产品创意。

## 视觉规范 (Visual Guidelines)
- **极简审美**：严格遵循 Apple 级设计语言，强调留白、呼吸感与视觉层级。
- **质感工艺**：
  - 采用 **Glassmorphism（玻璃拟态）** 设计，通过 `backdrop-blur` 和半透明背景营造通透的高级感。
  - 使用系统级高质感字体（如 SF Pro），确保阅读体验的流畅与优雅。

## 技术架构 (Technical Architecture)
- **核心框架**：Next.js (App Router) + Tailwind CSS + TypeScript
- **后端接口**：
  - **AI 接入**：预置标准路由 [`app/api/generate`](src/app/api/generate/route.ts)，兼容 DeepSeek / OpenAI 接口标准。
  - **数据存储**：预留 Supabase 接口占位符 `saveToSupabase`，方便后续接入用户档案存储。
- **组件库**：集成 `lucide-react` 图标库，配合 Tailwind 实现动态交互效果。

## 量产指南 (SOP)

### 1. 克隆与初始化
```bash
git clone https://github.com/your-repo/AI-Wrapper-Template.git
cd AI-Wrapper-Template
npm install
npm run dev
```

### 2. 定制你的 AI 业务
核心逻辑位于 [`src/app/api/generate/route.ts`](src/app/api/generate/route.ts)。
通过修改 System Prompt，你可以瞬间将此模版转化为不同的垂直领域产品：
- **算命/八字**：*"你是一位精通易经的算命大师..."*
- **解梦**：*"你是一位弗洛伊德流派的心理分析师..."*
- **简历优化**：*"你是一位拥有 10 年经验的 FAANG 招聘官..."*

### 3. 定价策略配置
前端页面 [`src/app/page.tsx`](src/app/page.tsx) 已预置符合刘小排策略的阶梯定价模组：
- **Starter**: $1.99 (尝鲜)
- **Pro**: $9.99 (主力，高亮推荐)
- **Elite**: $29.99 (高客单)

## 开发者备注 (Developer Notes)
> ⚠️ **关于验证与变现**
> 
> 本项目主要用于 **Web 端快速验证需求（MVP）**。
> Web 端传播速度快，适合测试 PMF (Product-Market Fit)。
> 一旦验证成功，建议迅速迁移至 **iOS App**，利用 App Store 生态实现更丝滑的闭环收钱。

## ☠️【Xiaopai Matrix 验证决策盘】(生死状)

请团队成员上线后每天对着这个表填数据。

| 部署日期 | 项目名称 | Day 1 PV | Day 2 PV | 48H 目标 | 支付点击率 (CTR) | CTR 目标 | 决策 (继续/止损) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| YYYY-MM-DD | Project-Name | 0 | 0 | **> 50** | 0% | **> 2%** | 待定 |
| | | | | | | | |
