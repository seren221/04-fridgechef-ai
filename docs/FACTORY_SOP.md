# 🚀 Seren/蒙小白 数字化工厂：30 分钟选品上线指南

**核心铁律：调研 2h -> 开发 1天 (目标 30min) -> 48h 验证 -> 不达标立斩。**

---

## 🛠️ 第一阶段：标准化挂载 (Local Dev)
**耗时目标：20 分钟**

1.  **开辟特区**：在 `src/projects/` 目录下创建新文件夹 `[project_id]`。
2.  **逻辑填充**：在该文件夹内编写业务逻辑。
    *   必须继承母舰的 `Layout`。
    *   结果页必须挂载 `LeadMagnet.tsx`（捕鼠夹组件）。
3.  **注册身份**：打开 `config/projects.json`，新增项目配置：
    *   锁定 `style: "black_gold_77"` 风格。
    *   填入对应的 Qwen/DeepSeek 模型参数。

## 🚀 第二阶段：自动化点火 (Deploy)
**耗时目标：5 分钟**

1.  **本地冒烟**：运行 `npm run dev`，访问 `localhost:3000/[project_id]` 确保 UI 渲染正常。
2.  **资产确权**：执行 `git push`。
    *   GitHub Actions 会利用 `VERCEL_TOKEN` 自动完成云端部署。
3.  **环境喂料**：如果在 Vercel 网页或通过 CLI 看到报错，立即执行：
    *   `vercel env add DASHSCOPE_API_KEY production` 同步 Qwen 燃料。

## 🛰️ 第三阶段：矩阵收割 (Marketing & PSEO)
**耗时目标：5 分钟**

1.  **PSEO 撒网**：运行 `python scripts/generate_matrix_seo.py --project [project_id]` (需自建脚本)。
    *   **目标**：为该选品瞬间产生 500 个美区长尾词入口。
2.  **自动跑街**：运行 `python scripts/matrix_submitter.py --headful` (需自建脚本)。
    *   机器人会自动将你的正式链接提交至 100+ 个 AI 目录站。

## ⚖️ 第四阶段：48 小时生死裁决 (Verdict)
**监控频率：每 12 小时**

1.  **查看雷达**：运行 `python scripts/dashboard_48h.py` (需自建脚本)。
2.  **执行判决**：
    *   **SAFE**：邮箱数 > 50。保留项目，准备接入 Stripe 真实支付。
    *   **KILL**：邮箱数 < 50。物理删库，腾出 Vercel 额度给下一个选品。
