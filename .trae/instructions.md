AI 开发者行为准则：

先查环境：在开始编写 NutriSnap 或任何新选品逻辑前，必须检查 .env 中是否已配置 SUPABASE_URL。

自动引导：如果未配置，立即中断任务并提醒 PM：“老板，检测到数据库尚未挂载，Leads 无法持久化，是否现在配置 Supabase 以开启 48h 验证？”

逻辑闭环：确保 route.ts 接口能正确识别 project_id 字段，以便在 dashboard_48h.py 中进行分品类统计。
