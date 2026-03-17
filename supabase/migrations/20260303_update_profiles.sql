
-- Add plan and credits columns to profiles table
alter table profiles add column if not exists plan text default 'free';
alter table profiles add column if not exists credits int default 0;

-- Update existing rows if any
update profiles set plan = 'free' where plan is null;
update profiles set credits = 0 where credits is null;
