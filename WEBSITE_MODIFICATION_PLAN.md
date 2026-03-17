# 网站视觉与交互优化需求文档 (2026-03-04)

基于 `修改要求 - 精确版.md` 和 `你的网站修改要求.md` 的综合分析，本文档整理了所有待执行的网站修改任务。

## 📅 任务概览
| 优先级 | 模块 | 核心改动 | 涉及文件 |
| :--- | :--- | :--- | :--- |
| 🔴 **P0 (立即)** | **Hero & 导航** | 去掉深色背景条，优化字体，Login 按钮去边框 | `Header.tsx`, `HeroTool.tsx` |
| 🔴 **P0 (立即)** | **工具交互区** | 输入框灰底+阴影，主按钮橙色渐变+动效 | `HeroTool.tsx` |
| 🟡 **P1 (高)** | **数据信任区** | 改为深色渐变背景，数字与标签分离 | `TrustStats.tsx` |
| 🟡 **P1 (高)** | **定价商业区** | 优化卡片样式，Toggle 开关，亮红色按钮 | `PricingTiers.tsx` |
| 🟢 **P2 (中)** | **内容展示区** | (特性/画廊/评价) 细节优化，去重背景条 | `BenefitCards.tsx`, `InspirationGallery.tsx`, `Testimonials.tsx` |

---

## 🛠️ 详细实施方案

### 1. 导航栏 (Navigation)
**目标**: 极简风格，降低视觉噪音。
*   **文件**: `src/components/layout/Header.tsx`
*   **修改点**:
    *   **Logo**: `text-xl font-bold` -> `text-lg font-semibold`
    *   **菜单间距**: `space-x-8` -> `space-x-6`
    *   **Login 按钮**: 去掉 `border`, `bg-gray-50` 等样式，改为纯文字 `text-sm text-gray-600 hover:text-gray-900`。

### 2. Hero 区域 (Hero Section)
**目标**: 去掉压抑的深红色背景条，增加呼吸感。
*   **文件**: `src/components/HeroTool.tsx`
*   **修改点**:
    *   **标题容器**: **删除** `bg-gradient-to-r from-red-900 to-red-800` 背景条容器。
    *   **主标题**: `text-5xl` -> `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight`。
    *   **副标题**: 颜色改为 `text-gray-600`，增加 `leading-relaxed`。

### 3. 工具交互区 (Tool Area)
**目标**: 提升输入框质感，强化 CTA 按钮点击欲望。
*   **文件**: `src/components/HeroTool.tsx`
*   **修改点**:
    *   **输入框容器**: 添加 `bg-white rounded-2xl shadow-lg border border-gray-200 p-8`。
    *   **Textarea**: 
        *   背景: `bg-white` -> `bg-gray-50`
        *   边框: `border-gray-300` -> `border-gray-200`
        *   聚焦: `focus:bg-white focus:border-gray-300 focus:ring-0`
        *   过渡: `transition-all`
    *   **快捷标签 (Tags)**:
        *   背景: `bg-gray-100` -> `bg-gray-50`
        *   字体: `text-sm` -> `text-xs font-medium`
        *   圆角: `rounded-lg` -> `rounded-full`
    *   **主按钮 (CTA)**:
        *   背景: 暗红色 -> **橙色渐变** `bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600`
        *   形状: `rounded-full`
        *   动效: `shadow-lg hover:shadow-xl transition-all transform hover:scale-105`
        *   内容: 增加 `✨` Emoji。

### 4. 数据展示区 (Trust Stats)
**目标**: 建立视觉分割，增强专业感。
*   **文件**: `src/components/funnel/TrustStats.tsx`
*   **修改点**:
    *   **Section 背景**: 改为深色渐变 `bg-gradient-to-r from-gray-900 to-gray-800`。
    *   **文字颜色**: 统一为 `text-white`。
    *   **标签样式**: `text-sm text-gray-400 uppercase tracking-wider`。

### 5. 内容展示组件 (Features, Gallery, Testimonials)
**目标**: 统一去背景条，优化细节。
*   **特性 (BenefitCards.tsx)**:
    *   数字圆圈: `bg-red-100` -> `bg-red-50`
    *   数字颜色: `text-red-800` -> `text-red-600`
*   **画廊 (InspirationGallery.tsx)**:
    *   **删除** 标题的深红色背景条。
    *   卡片标题: `text-xs font-semibold text-red-600 uppercase tracking-wide`。
*   **评价 (Testimonials.tsx)**:
    *   **删除** 标题的深红色背景条。
    *   头像背景: `bg-red-50`，文字 `text-red-600`。
    *   职位: `uppercase`。

### 6. 定价区 (Pricing)
**目标**: 突出性价比，优化交互。
*   **文件**: `src/components/funnel/PricingTiers.tsx`
*   **修改点**:
    *   **删除** 标题的深红色背景条。
    *   **Toggle 开关**: 重新实现 Monthly/Yearly 切换器，使用滑块样式。
    *   **推荐标签**: `bg-yellow-400 text-yellow-900 uppercase`。
    *   **升级按钮**: `bg-red-800` -> `bg-red-600 hover:bg-red-700`。

---

## ⚠️ 实施风险与规避
1.  **样式冲突**: 修改 `globals.css` 或通用组件可能影响其他页面。
    *   *规避*: 尽量使用 Tailwind Utility Class 在组件内部局部修改，减少对全局样式文件的依赖。
2.  **响应式适配**: 大幅调整 Padding 和字体大小可能导致移动端布局错乱。
    *   *规避*: 每个改动都保留 `md:`, `lg:` 等响应式前缀，确保移动端（默认）和桌面端表现一致。
3.  **构建失败**: TypeScript 类型或未闭合标签。
    *   *规避*: 修改后立即运行 `npm run build` 进行本地验证。

## 🚀 执行计划
1.  **Step 1**: 修改 `Header.tsx` 和 `HeroTool.tsx` (完成 P0 任务)。
2.  **Step 2**: 修改 `TrustStats.tsx` 和 `PricingTiers.tsx` (完成 P1 任务)。
3.  **Step 3**: 批量修改 `BenefitCards.tsx`, `InspirationGallery.tsx`, `Testimonials.tsx` (完成 P2 任务)。
4.  **Step 4**: 运行 Build 检查并部署。
