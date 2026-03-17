-- 创建标准 Lead 捕获表
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  project_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

-- 开启安全策略（可选，开发期可先允许匿名写入）
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON leads FOR INSERT WITH CHECK (true);
