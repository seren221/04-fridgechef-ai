# 🏭 AI-Wrapper 数字化工厂：全自动标准作业程序 (SOP)

> **WARNING FOR AI (TRAE)**: 
> You are the Lead Engineer. The user is the Product Manager (PM). 
> You must strictly follow this SOP. Do not ask the PM to write code. Do not skip any validation steps. Your primary metric for success is the Supabase Leads count after 48 hours.

## 📌 核心铁律 (Core Principles)
1. **产品定位**：绝对的 B2C 大众化市场，解决痛点，走量为主。禁止任何 B2B 或极客向的复杂设想。
2. **时间红线**：调研 2h，开发 1 天，48h 验证。
3. **生死指标**：上线 48 小时后，Supabase 邮箱捕获数 < 50 立斩（Archive）；≥ 50 则保留并接入 Creem 支付模块。
4. **架构锁死**：禁止随意更改 UI 结构，严格执行 8 层长首页漏斗（Hero, Gallery, Benefits, Stats, Testimonials, Pricing, FAQ, Footer）。首屏下方必须懒加载（Lazy Load）。

---

## 🚀 执行工作流 (Execution Workflow)

### Stage 1: 选品配置阶段 (JSON 驱动)
当 PM 提出新想法（例如：“做一个看手相的 AI”），AI 必须首先修改 `config/projects.json`，禁止直接写 UI 代码。
1. **生成元数据**：定义项目 `slug`, `name`, `theme` (Raphael/Anyvoice/Fast3D 风格预设)。
2. **生成业务文案**：填充 6 个 Benefit，伪造 4 个 Testimonial（带高级虚构头衔）。
3. **生成 PSEO 诱饵**：生成 10-12 个针对 Google 搜索意图的 FAQ 问答。
4. **价格锚点**：配置 Free / Pro / Max 三档，Pro 档定价通常在 $7-$15/月，默认锁定并高亮**年费模式 (Yearly)**。

### Stage 2: 组装与接口对接 (1 Day Dev)
确认 JSON 无误后，AI 开始编写业务逻辑。
1. **Prompt 封装**：在 `api/generate/route.ts` 中写入对应的 Qwen/DeepSeek 系统提示词。
2. **数据基建检测**：AI 必须主动检查 `.env` 是否包含 `SUPABASE_URL`。如果没有，立即中断并警告 PM。
3. **Leads 捕获验证**：确保 HeroTool 运行前，优先强制写入邮箱数据至 Supabase 的 `leads` 表，并附带 `project_id`。

### Stage 3: 部署与分发 (Deployment)
1. 检查代码，运行 `npm run build`，确保无报错。
2. 提示 PM 进行 Vercel Git Push 部署。
3. **PSEO 引擎启动**：利用 Next.js 动态路由，确保一套代码能承载该选品衍生的所有长尾词 URL。
4. **跑街脚本点火**：提醒 PM 运行本地的 Playwright 脚本（`matrix_submitter.py`），携带美区代理 IP 自动提交至 100+ 个 AI 目录站。

### Stage 4: 48h 裁决与商业化 (Judgment & Monetization)
1. **查看仪表盘**：AI 读取 `dashboard_48h.py` 或直接调用 Supabase API 查询该选品的有效 Leads 数。
2. **执行立斩**：如果不达标，执行代码物理隔离/删除操作，释放服务器与数据库配额。
3. **接入印钞机**：如果达标，立即在 `PricingTiers` 组件中注入 Creem 支付链接，打通 Webhook，实现积分自动充值。
   - *预估收益计算*：向 PM 汇报“当前转化率 X%，若引入 1000 流量，按 $10 订阅客单价，预估月化收益 $Y”。

---

## 🎮 指挥官指令 (Commander Prompt)
如何脱离网页，完全在 Trae 中指挥？
有了这个文件，你相当于给 Trae 植入了一个“主脑”。下次开发新选品，你打开 Trae，只需要发这一段简短的命令：

> “我是 PM。现在准备开发一个新产品，名字叫 [你的选品名称，比如：AI 宠物语言翻译器]。
> 请严格读取并执行 FACTORY_SOP.md。现在立刻进入 Stage 1，把项目的 JSON 配置写出来给我确认。”

> **End of SOP.**
