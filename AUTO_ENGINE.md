# 🤖 Heart Haven: 全自动迭代协议 (Self-Healing SOP)

## 1. 核心逻辑校验 [参照 Image 1]

*   **持久化测试**：模拟发送 3 条消息，刷新页面，使用 Playwright 验证对话是否从 LocalStorage 恢复。
*   **付费墙测试**：连续发送 10 条消息，验证是否弹出 ID 为 `paywall-modal` 的组件。
*   **Ghost Pay 验证**：检测 `NEXT_PUBLIC_PAY_STRATEGY=TEST`，模拟点击“升级”按钮，验证邮箱输入框是否出现。

## 2. ⚠️ 自动迭代指令 (The Ralph Loop)

TRAE 必须严格执行以下循环，**禁止打断人类**，直到获得 `<promise>COMPLETE</promise>`：

1.  **执行测试**: 读取 `tests/paywall.spec.ts`。使用 Playwright MCP 模拟用户发送 10 条消息。
2.  **Ghost Pay 检查**: 如果 Ghost Pay 弹窗未显示，读取终端 Error Log，自主修复 `src/app/page.tsx`。
3.  **UI 修复**: 如果 UI 报错或交互卡死，调用 `src/components/Paywall.tsx` 重新渲染或修复样式。
4.  **循环验证**: 修复后立即重新运行测试。
5.  **退出条件**: 仅当 Playwright 报告 **100% 通过** 且终端输出 `<promise>COMPLETE</promise>` 时，方可停止。

## 3. 质量门禁
*   必须在终端输出 `<promise>COMPLETE</promise>`。
*   GA 埋点代码必须在源码中真实存在。
