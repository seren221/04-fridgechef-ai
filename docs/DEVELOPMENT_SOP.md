# 🚀 开发 SOP：30 分钟选品上线

**核心铁律：调研 2h -> 开发 1天 (目标 30min) -> 48h 验证 -> 不达标立斩。**

---

## 🛠️ 第一阶段：开发特区 (Local Dev)
**耗时目标：20 分钟**

1.  **开辟特区**：在 `src/projects/` 下按 `[project_id]` 建立业务目录。
2.  **逻辑填充**：所有业务逻辑必须只写在 `src/projects/`。
3.  **严禁越界**：任何直接修改 `app/` 路由文件视为违规。
4.  **风格禁令**：UI 风格完全由 View Master Prompt 驱动，开发者严禁在组件内写死颜色。
5.  **注册身份**：修改 `config/projects.json` 增加项目配置：
    *   `style`: 例如 `black_gold_77`
    *   `description`: 产品主描述
    *   `features`: 关键功能列表

## 🚀 第二阶段：自动化点火 (Deploy)
**耗时目标：5 分钟**

1.  **本地冒烟**：运行 `npm run dev`，访问 `localhost:3000/[project_id]` 确保 UI 正常。
2.  **母舰挂载**：设置 `NEXT_PUBLIC_CURRENT_TOOL=[project_id]`，确保根目录动态分发。
3.  **资产确权**：执行 `git push`，GitHub Actions 使用 `VERCEL_TOKEN` 自动部署。

## 📜 数据确权阶段 (Data Connectivity)
**硬性约束：必须入库**

**禁令**：严禁在生产环境使用本地 Mock 数据，所有 Leads 必须入库。  
**动作**：  
1.  在 Supabase 创建项目，运行 `db/schema.sql`。  
2.  在 Vercel 后台同步 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY`。  
**验证**：访问 `/api/leads/health`，确保返回 `status: "connected"`。如果没有数据库，系统将自动降级为 Mock 模式并触发警告。

## 🛰️ 第三阶段：矩阵收割 (Marketing & PSEO)
**耗时目标：5 分钟**

1.  **PSEO 撒网**：运行 `python scripts/generate_matrix_seo.py --project [project_id]`。
2.  **自动跑街**：运行 `python scripts/matrix_submitter.py --headful`。

## ⚖️ 第四阶段：48 小时生死裁决 (Verdict)
**监控频率：每 12 小时**

1.  **查看雷达**：运行 `python scripts/dashboard_48h.py`。
2.  **执行判决**：
    *   **SAFE**：邮箱数 > 50。保留项目，准备接入真实支付。
    *   **KILL**：邮箱数 < 50。物理删库，释放资源给下一项目。
