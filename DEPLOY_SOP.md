# AI Wrapper 量产部署 SOP (Standard Operating Procedure) 🚀

## 1. 快速克隆 (Fast Cloning)
复制母版文件夹 `AI-Wrapper-Template`，并将其重命名为你的新项目名称，例如 `Project-01-DreamInterpreter`。

```bash
# 复制并重命名
cp -r AI-Wrapper-Template Project-XX-Name
cd Project-XX-Name

# 清除母版 Git 历史（重要！）
rm -rf .git
```

> ⚠️ **克隆后第一步**：修改 `tests/smoke_test.py` 中的文案变量以匹配新业务（如将 "Quantum Computing" 改为 "周公解梦"）。

## 2. 零成本部署 (Zero Cost Deployment)

### 初始化 Git
在新项目文件夹中重新初始化 Git 仓库：

```bash
git init
git add .
git commit -m "Initial commit for Project-XX"
```

### Vercel 一键部署
使用 Vercel CLI 进行快速部署（需提前安装 `npm i -g vercel`）：

```bash
vercel
```
1.  Set up and deploy? -> **Yes**
2.  Scope? -> **[Your Personal/Team Scope]**
3.  Link to existing project? -> **No**
4.  Project Name? -> **Project-XX-Name**
5.  Directory? -> **./** (直接回车)
6.  Build/Output Settings? -> **(全部默认，直接回车)**

✅ **结果**：你将获得一个免费的 `https://project-xx-name.vercel.app` 二级域名，无需购买域名即可开始验证。

## 3. 共享后端 (Shared Backend)

为了最大化资源利用率，所有验证期项目共享同一套后端设施：

### API 策略
*   **统一 Key**：所有项目在 Vercel 环境变量中指向同一个 DeepSeek Key。
*   **配置方法**：
    *   在 Vercel Dashboard -> Settings -> Environment Variables 添加：
        *   `DEEPSEEK_API_KEY`: `sk-xxxxxxxxxxxxxxxx`

### 数据库策略 (Supabase)
*   **统一实例**：不要为每个测试项目新建 Supabase Project。
*   **数据隔离**：
    *   **Table 隔离**：使用表名前缀区分，如 `dream_logs`, `bazi_logs`, `ppt_logs`。
    *   **Schema 隔离**：在同一个数据库中建立不同 Schema（高级用法）。

---

# ⚠️ 止损线 (STOP-LOSS LINE)

# 如果 7 天内无付费转化，立即停止开发，寻找下一个选品报告中的 Top 1。
