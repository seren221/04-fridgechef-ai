# 全自动质量与迭代协议 (Self-Healing Protocol)

## 1. 自动化验证环境 (Automated Verification Environment)
*   **Playwright MCP 强制启用**：所有开发任务必须赋予 TRAE `browser_click` 和 `browser_screenshot` 权限，以支持端到端测试。
*   **测试脚本标准**：所有项目必须在 `tests/` 目录下维护对应的 Playwright 脚本。
    *   脚本应由 TRAE 根据 `spec.json` (如有) 或需求文档自动生成/更新。

## 2. 核心逻辑核对 (Core Logic Verification)
### 基于截图与行为的验证清单：
*   **持久化校验 (Memory)**：
    *   模拟用户刷新浏览器 (F5)。
    *   验证 `LocalStorage` 中的关键数据（如用户偏好、历史记录）是否成功恢复。
*   **付费墙压力测试 (Paywall)**：
    *   自动执行消息发送脚本（如连续发送 10 次）。
    *   验证是否在达到预设限制时成功弹出付费拦截窗口，阻断后续会话。
*   **Ghost Pay 转化监测**：
    *   当环境变量 `NEXT_PUBLIC_PAY_STRATEGY=TEST` 时。
    *   点击“升级/支付”按钮，必须验证是否弹出了“邮箱收集框” (Ghost Pay Modal)。

## 3. 自动修复循环 (Self-Healing Loop)
*   **触发条件**：当运行测试指令 (e.g., `npx playwright test` or `python tests/smoke_test.py`) 返回非零状态码 (Fail)。
*   **自愈动作**：
    1.  TRAE 立即读取 Error Log。
    2.  自主定位故障源：
        *   **API 报错** -> 检查 `route.ts`。
        *   **UI 报错** -> 检查 `page.tsx`。
    3.  直接修改代码并重新运行测试。
*   **退出条件**：测试 **100% 通过** 且终端输出 `<promise>COMPLETE</promise>`。
*   **严禁中断**：在循环未结束或未遇到速率限制 (Rate Limit) 时，严禁中断任务向人类提问。

## 4. 部署前监控核对 (Pre-deployment Monitoring Check)
*   **GA 埋点确认**：
    *   在执行部署 (Vercel) 前，必须自动检查网页渲染后的源码。
    *   验证是否包含 `NEXT_PUBLIC_GA_ID` 对应的追踪代码片段。
    *   若缺失，触发阻断并警告。
