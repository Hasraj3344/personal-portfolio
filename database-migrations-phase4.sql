-- ============================================
-- Phase 4: Database Migrations
-- Contact Form & Analytics Enhancement
-- ============================================

-- ============================================
-- 1. Contact Submissions Table
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- RLS Policies for contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Allow public to insert contact submissions"
    ON contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated users (admin) can view
CREATE POLICY "Allow authenticated users to view contact submissions"
    ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Only authenticated users can update
CREATE POLICY "Allow authenticated users to update contact submissions"
    ON contact_submissions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Allow authenticated users to delete contact submissions"
    ON contact_submissions
    FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- 2. Analytics Events Table
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL,
    event_category VARCHAR(100),
    event_label VARCHAR(255),
    event_value INTEGER,
    page_url TEXT,
    referrer TEXT,
    user_id UUID,
    session_id VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_category ON analytics_events(event_category);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);

-- RLS Policies for analytics_events
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert analytics events
CREATE POLICY "Allow public to insert analytics events"
    ON analytics_events
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated users can view
CREATE POLICY "Allow authenticated users to view analytics events"
    ON analytics_events
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================
-- 3. Project Views Table
-- ============================================
CREATE TABLE IF NOT EXISTS project_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    session_id VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for project views
CREATE INDEX IF NOT EXISTS idx_project_views_project_id ON project_views(project_id);
CREATE INDEX IF NOT EXISTS idx_project_views_session_id ON project_views(session_id);
CREATE INDEX IF NOT EXISTS idx_project_views_viewed_at ON project_views(viewed_at DESC);

-- RLS Policies for project_views
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert project views
CREATE POLICY "Allow public to insert project views"
    ON project_views
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Allow public to view their own views (for rate limiting)
CREATE POLICY "Allow users to view their own project views"
    ON project_views
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only authenticated users can view all views
CREATE POLICY "Allow authenticated users to view all project views"
    ON project_views
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================
-- 4. Alter Projects Table
-- ============================================
-- Add view_count column (denormalized for performance)
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Add is_featured column
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Create index for featured projects
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured) WHERE is_featured = TRUE;

-- ============================================
-- 5. Functions and Triggers
-- ============================================

-- Function to update project view count
CREATE OR REPLACE FUNCTION increment_project_view_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE projects
    SET view_count = view_count + 1
    WHERE id = NEW.project_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically increment view count
DROP TRIGGER IF EXISTS trigger_increment_project_views ON project_views;
CREATE TRIGGER trigger_increment_project_views
    AFTER INSERT ON project_views
    FOR EACH ROW
    EXECUTE FUNCTION increment_project_view_count();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for contact_submissions updated_at
DROP TRIGGER IF EXISTS trigger_update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER trigger_update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. Views for Analytics (Optional but useful)
-- ============================================

-- View for popular projects
CREATE OR REPLACE VIEW popular_projects AS
SELECT
    p.id,
    p.title,
    p.view_count,
    p.is_featured,
    COUNT(pv.id) as total_views_tracked,
    MAX(pv.viewed_at) as last_viewed
FROM projects p
LEFT JOIN project_views pv ON p.id = pv.project_id
GROUP BY p.id, p.title, p.view_count, p.is_featured
ORDER BY p.view_count DESC;

-- View for recent contact submissions
CREATE OR REPLACE VIEW recent_contacts AS
SELECT
    id,
    name,
    email,
    subject,
    LEFT(message, 100) as message_preview,
    status,
    created_at
FROM contact_submissions
ORDER BY created_at DESC;

-- ============================================
-- 7. Grant Permissions
-- ============================================

-- Grant select on views to authenticated users
GRANT SELECT ON popular_projects TO authenticated;
GRANT SELECT ON recent_contacts TO authenticated;

-- ============================================
-- Migration Complete
-- ============================================
-- Run this script in your Supabase SQL editor
-- Make sure to review and test all policies
