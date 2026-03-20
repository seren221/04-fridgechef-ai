# 📦 冰箱 AI 厨神 (FridgeChef AI) - 项目迁移指南

**创建日期**: 2026-03-20  
**最后更新**: 2026-03-20  
**项目状态**: ✅ 已部署到 Vercel

---

## 🎯 项目概述

**项目名称**: 冰箱 AI 厨神 (FridgeChef AI)  
**核心功能**: 拍照识别冰箱食材，AI 生成美味菜谱  
**技术栈**: Next.js 16 + TypeScript + Tailwind CSS + Supabase  
**部署平台**: Vercel (fridgechef-ai 项目)  
**GitHub**: https://github.com/seren221/04-fridgechef-ai

---

## 📋 迁移前检查清单

### 1. 环境准备 (Mac)

`ash
# 检查 Node.js 版本 (需要 18+)
node -v

# 检查 npm
npm -v

# 安装 Vercel CLI
npm install -g vercel
`

### 2. 克隆项目

`ash
# 克隆仓库
git clone https://github.com/seren221/04-fridgechef-ai.git
cd 04-fridgechef-ai

# 安装依赖
npm install
`

---

## 🔑 关键配置

### Supabase 配置

**项目 ID**: jmklaoafenaelialnhvk  
**URL**: https://jmklaoafenaelialnhvk.supabase.co

#### 环境变量 (.env.local)

创建 .env.local 文件（**不要提交到 Git**）:

`ash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jmklaoafenaelialnhvk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impta2xhb2FmZW5hZWxpYWxuaHZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDg5MjgsImV4cCI6MjA3OTgyNDkyOH0.Bz2b0tWUq3QaQeKVkDtLkTU8DfMuoLpRZJZPWxs0mY0
SUPABASE_SERVICE_ROLE_KEY=<从 Supabase 仪表板获取>

# Project Configuration
NEXT_PUBLIC_PROJECT_SLUG=fridge-chef
NEXT_PUBLIC_PAY_STRATEGY=GHOST

# Analytics (可选)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
`

#### 获取 SUPABASE_SERVICE_ROLE_KEY:

1. 登录 https://supabase.com/dashboard
2. 选择项目 jmklaoafenaelialnhvk
3. 进入 Settings → API
4. 复制 service_role key

---

## 🚀 本地开发

`ash
# 启动开发服务器 (端口 3001)
npm run dev

# 访问 http://localhost:3001/zh/tools/fridge-chef
`

### 测试邮箱收集

1. 打开页面
2. 输入测试邮箱 (如 test@example.com)
3. 点击 "Access Now"
4. 检查 Supabase 数据库:

`sql
-- 在 Supabase SQL Editor 中执行
SELECT * FROM user_emails ORDER BY created_at DESC LIMIT 10;
`

---

## 🌐 部署到 Vercel

### 方法 1: CLI 部署 (推荐)

`ash
# 登录 Vercel
vercel login

# 部署到生产环境
vercel --prod

# 查看部署状态
vercel ls
`

### 方法 2: Vercel 仪表板

1. 访问 https://vercel.com/dashboard
2. 找到项目 ridgechef-ai
3. 点击 "Redeploy" 或连接 GitHub 自动部署

---

## 📊 数据库表结构

### user_emails 表

`sql
CREATE TABLE user_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  project_slug TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_emails_project ON user_emails(project_slug);
CREATE INDEX idx_user_emails_created ON user_emails(created_at DESC);
`

---

## 🧪 测试 (Playwright)

`ash
# 安装 Playwright
npx playwright install

# 运行测试
npx playwright test

# 查看报告
npx playwright test --reporter=html
`

---

## 📝 项目核心文件

`
04-fridgechef-ai/
├── src/
│   ├── components/
│   │   ├── FridgeHeroTool.tsx    # 核心 UI 组件
│   │   ├── LeadMagnet.tsx        # 邮箱收集组件
│   │   └── PricingFAQ.tsx        # 定价组件
│   ├── app/
│   │   ├── api/
│   │   │   └── leads/
│   │   │       └── route.ts      # 邮箱收集 API
│   │   └── [locale]/
│   │       └── tools/
│   │           └── fridge-chef/
│   │               └── page.tsx  # 主页面
├── config/
│   └── projects.json             # 项目配置 (定价、文案等)
├── .env.local                    # 环境变量 (不提交)
├── .env.example                  # 环境变量模板
└── package.json
`

---

## 💰 商业模式

### 定价策略

- **免费版**: 每日 3 次识别
- **Pro 版**: .99/月 (未来可能涨至 .99)
- **支付策略**: GHOST 模式 (仅收集邮箱，不真实收费)

### 48 小时验证指标

- 目标：48 小时内收集 50+ 邮箱
- 未达标：Archive 项目

---

## 🔧 常见问题

### 1. 构建失败

`ash
# 清理缓存
rm -rf .next node_modules/.cache

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 重新构建
npm run build
`

### 2. Vercel 部署卡在 Building

- 访问 https://vercel.com/dashboard 查看构建日志
- 检查是否有 TypeScript 错误
- 本地运行 
pm run build 验证

### 3. Supabase 连接失败

- 检查 .env.local 配置
- 确认 Supabase 项目状态为 Active
- 检查 RLS (Row Level Security) 策略

---

## 📞 支持

- **GitHub Issues**: https://github.com/seren221/04-fridgechef-ai/issues
- **Vercel 仪表板**: https://vercel.com/serens-projects-5e739c5c/fridgechef-ai
- **Supabase 仪表板**: https://supabase.com/dashboard/project/jmklaoafenaelialnhvk

---

## ⚠️ 重要提醒

1. **不要提交 .env.local 到 Git** (已加入 .gitignore)
2. **不要泄露 SUPABASE_SERVICE_ROLE_KEY**
3. 部署前确保 NEXT_PUBLIC_PAY_STRATEGY=GHOST (验证期)
4. 使用 Vercel 免费子域名测试，不要购买顶级域名

---

**最后部署 URL**: https://fridgechef-ov6yg4kq3-serens-projects-5e739c5c.vercel.app

**状态**: 🟡 构建中 (首次部署可能需要 5-10 分钟)
