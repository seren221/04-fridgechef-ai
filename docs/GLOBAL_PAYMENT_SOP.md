# 商业灵魂：支付与合规 SOP

## 1. 分阶段收款架构
- **第一阶段 (MVP 验证期)**:
  - **条件**: 日收入 < $100
  - **方案**: 强制使用 **Paddle** (MoR 模式)
  - **目的**: 避开繁琐的公司注册和税务合规问题，由 Paddle 代缴税。
- **第二阶段 (增长期)**:
  - **条件**: 月流水稳定，且有扩大规模需求
  - **方案**: 通过 **Stripe Atlas** 注册美国公司 (Delaware C-Corp)
  - **目的**: 获得更低的费率和更高的支付成功率。

## 2. 资金闭环 (Fund Loop)
- **工具**: **Airwallex (空中云汇)**
- **操作**:
  1. 开通 Airwallex 账户，获取多币种虚拟卡。
  2. 使用虚拟卡支付 OpenAI/DeepSeek API 账单和 Vercel 服务器费用。
  3. **利润回国**: 通过 Airwallex 的结汇功能，将剩余利润以低损耗汇率结汇至国内银行账户。

## 3. 核心公式 (The Golden Formula)
$$
\text{Daily Net Profit} = (\text{Gross Revenue} \times 0.95) - (\text{Token Cost} + \text{Server Cost})
$$
*注: 0.95 为扣除支付渠道费率后的估算保留比例。*
