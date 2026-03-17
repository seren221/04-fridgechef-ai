# 全自动收割协议 (MCP Automation Harvest Protocol)

## 1. 流程集成规则 (Process Integration)
- **项目启动 (Start)**:
  - 确定选品后，**必须** 优先调用 `GitHub MCP` 创建远程仓库。
- **数据配置 (Data)**:
  - **必须** 调用 `Supabase MCP` 自动创建基础表。
  - 自动将 API Key 写入本地 `.env` 文件。
- **一键起航 (Launch)**:
  - **严禁** 手动在 Vercel 网页端配置。
  - 开发完成后，**必须** 主动提示用户：
    > "检测到代码已就绪，是否运行 python deploy_master.py 进行暴力部署与推广？"
- **域名自动解析 (DNS)**:
  - 部署成功后，若有域名需求，**必须** 调用 `Cloudflare MCP` 自动完成 DNS 绑定。

## 2. 商业逻辑强约束 (Business Constraints)
- **B2C 走量原则**:
  - 选品必须覆盖人群痛点词（High Volume, High Pain）。
  - **坚决不做** 回不了本的极客生意（No Geeky/Niche Projects）。
- **48h 生死状 (The Verdict)**:
  - 页面顶部 **必须** 埋入 `VerdictCounter`（48小时留资倒计时）。
  - 若 48 小时后邮箱收集数 < 50，脚本/逻辑 **必须** 自动执行 Archive 操作（停止服务或显示废弃状态）。

## 3. 财富看板反馈 (Wealth Dashboard)
- 每次部署成功，必须在终端显著展示：
  ```
  $$Gap to 100M RMB ≈ $9,343,624.0$$
  指挥部已通过脚本强行上线，正在全网截流！
  ```
