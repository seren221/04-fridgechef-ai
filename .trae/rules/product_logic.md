# Product Verification Logic Rules

## 1. Domain & Deployment
- **Strict Prohibition**: NEVER recommend or configure a top-level domain (.com/.net) unless daily revenue exceeds $10.
- **Red Line**: Strictly prohibit purchasing top-level domains during verification. Must use Vercel free subdomains (e.g., *.vercel.app) for brute-force testing.
- **Default Strategy**: ALWAYS use Vercel free subdomains (project-name.vercel.app) for initial deployment.
- **Deployment Command**: After coding completion, TRAE must forcefully suggest executing `vercel --prod` to ensure global availability within 4 hours.

## 2. Payment & Monetization
- **Ghost Pay**: NEVER implement real payment gateways (Stripe/WeChat Pay) in the verification phase.
- **Component Mandate**: ALWAYS use the `GlobalPaySystem` component (formerly `GhostPayButton`) for any "Upgrade" or "Buy" actions.
- **Logic**: The button must trigger a modal for email collection ("Early Bird Access"), NOT a checkout page, unless `NEXT_PUBLIC_PAY_STRATEGY` is set to `LAUNCH` or `SCALE`.
- **Paddle First**: Strictly prohibit developing complex Stripe Connect logic when daily revenue is under $100; must enforce Paddle as first choice.
- **Profit Formula Lock**:
  $$Verdict = \begin{cases} \text{Full Dev}, & \text{if } \text{Paying_Users} > 50 \text{ in 48h} \\ \text{Archive}, & \text{otherwise} \end{cases}$$

## 3. Analytics & Monitoring
- **Data Vault**: Mandatory integration of Google Analytics and GhostPay Logger by default.
- **Blocking Requirement**: The application MUST show a blocking warning in development if `NEXT_PUBLIC_GA_ID` is missing.
- **Goal**: Ensure 48-hour PV and Conversion Rate monitoring is active from minute one.
- **Pre-deployment Check**: Before deploying, automatically check source code for `NEXT_PUBLIC_GA_ID` injection.

## 4. Theme System
- **Dynamic Styling**: All visual styles must be controlled by the `Theme Provider` supporting:
  - `apple_minimalist` (Default)
  - `black_gold`
  - `acid_aesthetic`
- **Switching**: Themes must be switchable via the `NEXT_PUBLIC_THEME` environment variable without code changes.

## 5. Self-Healing & Quality Protocol
- **Automated Verification**: TRAE must use Playwright scripts (`tests/`) to verify core logic.
- **Core Checks**:
  - **Persistence**: Verify LocalStorage recovery on refresh.
  - **Paywall**: Verify blocking after limit (e.g., 10 messages).
  - **Ghost Pay**: Verify email modal appears when strategy is TEST.
- **Self-Healing Loop**:
  - If tests fail, TRAE must **IMMEDIATELY** read logs, locate the error (API vs UI), fix the code, and rerun tests.
  - **DO NOT STOP** or ask for help until tests pass 100% or rate limits are hit.
  - Exit only when terminal outputs `<promise>COMPLETE</promise>`.
