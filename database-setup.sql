-- Portfolio Admin Panel Database Setup
-- Run this SQL in your Supabase SQL Editor

-- 1. Create Bio Table
CREATE TABLE IF NOT EXISTS bio (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  roles TEXT[] NOT NULL,
  description TEXT NOT NULL,
  resume_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_bio_row CHECK (id = 1)
);

-- 2. Create Skill Categories Table
CREATE TABLE IF NOT EXISTS skill_categories (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  company_logo_url TEXT,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  date_range TEXT NOT NULL,
  description TEXT NOT NULL,
  skills_used TEXT[] NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Education Table
CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  school_logo_url TEXT,
  school_name TEXT NOT NULL,
  degree TEXT NOT NULL,
  date_range TEXT NOT NULL,
  grade TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date_range TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] NOT NULL,
  category TEXT NOT NULL,
  github_url TEXT,
  webapp_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create Admin Credentials Table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id INTEGER PRIMARY KEY DEFAULT 1,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_admin_row CHECK (id = 1)
);

-- 8. Enable Row Level Security (RLS) on all tables
ALTER TABLE bio ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

-- 9. Create policies for PUBLIC READ access (portfolio should be publicly viewable)
CREATE POLICY "Allow public read access" ON bio FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON education FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);

-- 10. Create policies for ADMIN WRITE access (authenticated users can modify)
-- Note: For now, allowing all authenticated users. In production, add proper admin checks.
CREATE POLICY "Allow authenticated write access" ON bio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write access" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write access" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write access" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write access" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write access" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- 11. Admin credentials should be readable by authenticated users only
CREATE POLICY "Allow authenticated read access" ON admin_credentials FOR SELECT USING (auth.role() = 'authenticated');

-- 12. Create Storage Bucket for images (run this if storage doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- 13. Create storage policy for public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'portfolio-images' );

-- 14. Create storage policy for authenticated upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'portfolio-images' AND auth.role() = 'authenticated' );

-- 15. Create storage policy for authenticated update
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'portfolio-images' AND auth.role() = 'authenticated' );

-- 16. Create storage policy for authenticated delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'portfolio-images' AND auth.role() = 'authenticated' );

-- Setup complete!
-- Next step: Run the migration script to populate data
-- node src/data/migrate.js
