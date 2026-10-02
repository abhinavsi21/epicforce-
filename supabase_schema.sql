-- ==========================================================
-- EpicForce.ai Database Schema (Supabase / PostgreSQL)
-- ==========================================================

-- 1. Create Contacts & Partnership Inquiries Table
CREATE TABLE IF NOT EXISTS public.contacts (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    reason TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'reviewed', 'contacted', 'archived'))
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anonymous visitors to submit contact and partnership inquiries
CREATE POLICY "Allow public insert to contacts" 
ON public.contacts 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 4. Policy: Allow authenticated staff / admins to view and manage inquiries
CREATE POLICY "Allow authenticated staff select and update" 
ON public.contacts 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 5. Indexes for fast dashboard query performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_reason ON public.contacts(reason);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
