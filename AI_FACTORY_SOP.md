# 📑 AI_FACTORY_SOP.md（数字化工厂执行宪法）

## 一、商业底层逻辑 (The Core)
- 验证高于一切：调研 2h，开发 1天，48h 验证数据，不达标立斩 [cite: 2026-02-17]。
- 大众化人海战术：只做 B2C 大众化产品，解决真实人群痛点，不做极客生意 [cite: 2026-02-17, 2026-02-03]。
- 假门测试 (Painted Door)：在核心功能完成前，优先通过“99% 加载拦截”收集邮箱（Leads），验证付费意愿 [cite: 2026-03-03]。

## 二、视觉与排版标准 (UI/UX Standards)
- 1280px 容器准则：所有页面内容必须严格约束在 max-w-[1280px] mx-auto 中，禁止横向散架。
- 刘小排式质感：
  - 顶栏 (Header)：sticky 定位，backdrop-blur-md 毛玻璃特效，底部带 1px 浅灰色细线。
  - 色彩：保持纯白或极简深色背景，使用高对比度阴影（shadow-2xl）增加纵深感。
  - 按钮：全局锁死 rounded-full 大圆角。
- 刘小排式手机端优化 (Mobile-First)：
  - 响应式：手机端 H1 字号缩小至 text-3xl，输入框高度自适应。
  - 点击区域：所有按钮在手机端必须满足 min-h-[44px]，防止误触。
  - 底部固定：在关键转化页，手机端底部可浮动固定一个 Access Now 按钮。

## 三、核心转换漏斗 (Conversion Funnel)
- 2秒线性加载：点击按钮后，进度条必须在 2000ms 内平滑、匀速从 1% 滚动到 99% [cite: 2026-03-03]。
- 99% 拦截弹窗：
  - 样式：白底大圆角 rounded-[2rem]，高对比度阴影。
  - 交互：右上角带 X 叉号，点击背景灰色遮罩（Backdrop）自动关闭。
  - 功能：捕获邮箱并存入 Supabase，提示“Waitlist Joined”。

## 四、技术架构与部署 (Tech Stack)
- 动态渲染矩阵：核心文案必须从 config/projects.json 读取，禁止在组件内硬编码业务文本 [cite: 2026-03-03]。
- Supabase 配置：
  - 所有邮箱存入 user_emails 表。
  - 所有请求需带上 project_slug 标签以区分品类。
- Vercel 部署：
  - 强制使用 bash factory_deploy.sh 脚本。
  - 部署后必须只返回一个带 ?v=timestamp 的预览链接。

## 五、任务执行协议 (Execution Protocol)
- Builder 模式优先：严禁使用 SOLO 模式进行多轮非定向修改，防止代码污染 [cite: 2026-03-07]。
- JSON 驱动开发：新任务下达后，优先在 projects.json 注入数据，仅在涉及核心业务逻辑时修改 page.tsx。
- 禁止修改排版：除非 PM 明确要求，否则禁止改动已定型的布局、边距和容器宽度。
