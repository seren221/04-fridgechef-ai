# B2C Enterprise Funnel Architecture (企业级 B2C 转化漏斗规范)

## 1. 核心商业目标
本架构旨在为 B2C 大众化产品提供最高效的“落地页即工具”体验。系统必须伪装成大型专业团队出品，通过极速的首屏加载和 8 层心理催眠漏斗，在 48 小时内最大化 Leads 收集与支付转化。

## 2. 页面物理结构 (8-Layer Stack)
`app/[locale]/[slug]/page.tsx` 必须由以下 8 个组件严格按顺序构成。首屏以下组件**必须**使用 `next/dynamic` 懒加载，以确保首屏 LCP 达到极速。

1. **HeroTool (绝对视觉中心)**
   - 包含 H1 痛点标题。
   - 工具面板直出（输入框/拖拽区），下方附带预设参数 Tags（如“1:1”, “High Quality”），一键点击即可切换参数。
   - 核心 CTA 按钮悬浮 VerdictCounter（实时生成人数伪装）。

2. **ResultShowcase (即时反馈)**
   - 极具视觉冲击力的“生成前 vs 生成后”对比图，建立专业预期。

3. **InspirationGallery (瀑布流画廊)**
   - Masonry 布局展示高质量生成结果。Hover 时出现 "Try this" 按钮，点击直接将参数回填至顶部 HeroTool。

4. **BenefitCards (核心优势)**
   - 3-6 个极简卡片（图标+大标题），强调：零成本、最高质量、极速生成。

5. **TrustStats (企业级信用背书)**
   - 巨大的数字看板（如：3M+ 月活，1500+ 每分钟生成）。必须显得庞大且专业。

6. **Testimonials (社会证明)**
   - 伪造的高级职业用户评价（如“品牌艺术总监”、“资深开发者”），带高质量职业头像。

7. **PricingTiers (价格锚点收割区)**
   - Free / Pro / Max 三档。
   - **强制要求**：默认高亮并选中“按年付费 (Yearly)”，并在显著位置打上 "Save 50%" 标签。

8. **FAQAccordion (PSEO 拦截坟场)**
   - 包含 10-12 个针对 Google 长尾词的折叠问答。

## 3. 全局交互与 UI 规范
- **导航栏 (Header)**：`sticky top-0 backdrop-blur-md`。右侧菜单为页内锚点跳转（如 `href="#pricing"`），**原生瞬间跳转**，禁止使用会导致掉帧的平滑滚动 (Smooth Scroll)。
- **数据驱动 (JSON)**：所有文案、定价、FAQ、图片路径，必须从 `config/projects.json` 读取，实现“改 JSON 即换站”。
- **企业级视觉**：严格使用 Shadcn/UI 组件库，圆角、阴影必须克制，字体使用 Inter 或 Geist 建立冷峻的专业感。
