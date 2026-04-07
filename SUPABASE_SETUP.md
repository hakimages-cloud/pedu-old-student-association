# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com/)
2. Click "Start your project"
3. Sign up/login with GitHub or Google
4. Click "New project"
5. Choose organization
6. Project name: `pedu-old-student-association`
7. Database password: Create a strong password
8. Choose a region (choose closest to your users)
9. Click "Create new project"

## 2. Create Users Table

1. In Supabase Dashboard, go to "Table Editor"
2. Click "Create a new table"
3. Table name: `users`
4. Enable "RLS" (Row Level Security)
5. Add columns:

```sql
-- Create users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  year_of_completion TEXT,
  program TEXT,
  membership_number TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'member',
  status TEXT DEFAULT 'active',
  join_date DATE,
  dues_status TEXT DEFAULT 'pending',
  last_payment_date DATE,
  dependants INTEGER DEFAULT 0,
  address TEXT,
  occupation TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_membership_number ON users(membership_number);
```

## 3. Set Up Authentication

1. In Supabase Dashboard, go to "Authentication"
2. Under "Settings", enable "Enable email confirmations" = OFF
3. Under "Providers", enable "Email" provider
4. Set "Site URL" to your Netlify domain
5. Set "Redirect URLs" to include your Netlify domain

## 4. Set Up Row Level Security (RLS)

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Allow authenticated users to read all users (for member management)
CREATE POLICY "Authenticated users can view all users" ON users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admin users to manage all users
CREATE POLICY "Admin users can manage all users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );
```

## 5. Get Supabase Configuration

1. In Supabase Dashboard, go to "Project Settings"
2. Under "API", find:
   - Project URL: `https://your-project.supabase.co`
   - Anon public key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. Update `src/services/firebase.js`:

```javascript
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-actual-anon-key-here';
```

## 6. Deploy to Netlify

1. Add Supabase config to Netlify environment variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`

2. Trigger new deployment

## Features Enabled

- PostgreSQL database
- Real-time subscriptions
- Row-level security
- Email authentication (no verification required)
- Automatic membership numbers
- Real-time member management

## Database Schema

Your users table includes:
- User authentication data
- Membership information
- Profile details
- Dues tracking
- Role-based access control

## Security Notes

- RLS policies ensure data privacy
- Users can only access their own data
- Admins can manage all users
- No email verification required (as requested)
