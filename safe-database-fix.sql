-- Safe Database Schema Fix for POSA
-- Run this in your Supabase SQL Editor

-- 1. First, drop dependants column if it exists as integer
ALTER TABLE users DROP COLUMN IF EXISTS dependants;

-- 2. Add all missing columns with correct types
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS join_date DATE,
ADD COLUMN IF NOT EXISTS dues_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS dependants TEXT DEFAULT '[]',
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS occupation TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS membership_number TEXT UNIQUE NOT NULL,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'member',
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS last_payment_date DATE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. Create events table (if not exists)
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  type TEXT DEFAULT 'general',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create announcements table (if not exists)
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create dues table (if not exists)
CREATE TABLE IF NOT EXISTS dues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL DEFAULT 50.00,
  status TEXT DEFAULT 'pending',
  payment_date DATE,
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create welfare table (if not exists)
CREATE TABLE IF NOT EXISTS welfare (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES users(id),
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create indexes (if not exists)
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority);
CREATE INDEX IF NOT EXISTS idx_dues_user_id ON dues(user_id);
CREATE INDEX IF NOT EXISTS idx_welfare_user_id ON welfare(user_id);
CREATE INDEX IF NOT EXISTS idx_welfare_status ON welfare(status);

-- 8. Enable RLS on all tables (if not already enabled)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE dues ENABLE ROW LEVEL SECURITY;
ALTER TABLE welfare ENABLE ROW LEVEL SECURITY;

-- 9. Drop existing policies if they exist (safe approach)
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Admins can manage events" ON events;
DROP POLICY IF EXISTS "Anyone can view announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can manage announcements" ON announcements;
DROP POLICY IF EXISTS "Users can view own dues" ON dues;
DROP POLICY IF EXISTS "Admins can view all dues" ON dues;
DROP POLICY IF EXISTS "Admins can manage dues" ON dues;
DROP POLICY IF EXISTS "Users can view own welfare" ON welfare;
DROP POLICY IF EXISTS "Admins can view all welfare" ON welfare;
DROP POLICY IF EXISTS "Users can create welfare requests" ON welfare;
DROP POLICY IF EXISTS "Admins can manage welfare" ON welfare;

-- 10. Create new RLS policies
-- Events policies
CREATE POLICY "Anyone can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Admins can manage events" ON events FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'superadmin'
  )
);

-- Announcements policies
CREATE POLICY "Anyone can view announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Admins can manage announcements" ON announcements FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'superadmin'
  )
);

-- Dues policies
CREATE POLICY "Users can view own dues" ON dues FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all dues" ON dues FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'superadmin'
  )
);
CREATE POLICY "Admins can manage dues" ON dues FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'superadmin'
  )
);

-- Welfare policies
CREATE POLICY "Users can view own welfare" ON welfare FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all welfare" ON welfare FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'superadmin'
  )
);
CREATE POLICY "Users can create welfare requests" ON welfare FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage welfare" ON welfare FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'superadmin'
  )
);

-- 11. Update existing users with proper data
UPDATE users 
SET 
  join_date = COALESCE(join_date, CURRENT_DATE),
  membership_number = COALESCE(membership_number, 'POS' || LPAD(id::text, 4, '0')),
  dependants = COALESCE(dependants, '[]'),
  created_at = COALESCE(created_at, NOW()),
  updated_at = NOW()
WHERE join_date IS NULL OR membership_number IS NULL;
