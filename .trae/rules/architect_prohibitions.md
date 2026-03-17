# 架构师禁令 (Architect Prohibitions)

## 1. 严禁项 (Strictly Prohibited)
- ❌ **WebSocket**: 禁止使用 WebSocket，增加运维复杂度。使用 HTTP 轮询或 SSE 代替。
- ❌ **Redis**: 禁止引入 Redis 等外部缓存组件，保持无状态架构。
- ❌ **自建后端**: 禁止使用 Express/NestJS/Django 自建后端服务。
- ❌ **重型 UI 库**: 禁止使用 Ant Design, Material UI 等重型组件库。
- ❌ **自定义鉴权**: 禁止手写 JWT 或 Session 逻辑。
- ❌ **复杂配置**: 禁止使用任何配置耗时超过 30 分钟的第三方库（遵循极简主义原则）。
- ❌ **数据库 (MVP期)**: 验证期（头 48 小时）严禁配置 Supabase 或任何数据库。必须使用 LocalStorage 实现“单机版”零配置启动。

## 2. 强制项 (Mandatory)
- ✅ **Next.js Route Handlers**: 所有后端逻辑必须运行在 Edge/Serverless 环境。
- ✅ **Supabase Auth**: 必须使用 Supabase 提供的鉴权 SDK。
- ✅ **Tailwind CSS**: 样式必须使用 Tailwind Utility Classes。
