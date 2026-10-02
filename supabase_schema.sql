-- =========================================================
-- SUVÉE Report: Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up all tables
-- =========================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Boss Admin & Staff Members)
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL DEFAULT '123',
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Digital Marketing', 'Video Editor')),
  role_label TEXT,
  phone TEXT,
  start_date TEXT,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DAILY REPORTS (Boost Page & TikTok Ads Logs)
CREATE TABLE IF NOT EXISTS public.daily_reports (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  platform TEXT NOT NULL,
  campaign_name TEXT NOT NULL,
  objective TEXT,
  spend NUMERIC DEFAULT 0,
  impressions NUMERIC DEFAULT 0,
  reach NUMERIC DEFAULT 0,
  leads NUMERIC DEFAULT 0,
  sales_closed NUMERIC DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  notes TEXT,
  status TEXT DEFAULT 'Scale',
  boost_link TEXT,
  start_boost TEXT,
  end_boost TEXT,
  daily_milestones JSONB DEFAULT '[]'::jsonb,
  author_id TEXT,
  author_name TEXT,
  author_role TEXT,
  author_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VIDEO EDITOR REPORTS (Daily Videos & Hooks Created)
CREATE TABLE IF NOT EXISTS public.editor_reports (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  editor_name TEXT NOT NULL,
  video_title TEXT NOT NULL,
  platform TEXT DEFAULT 'TikTok & Reels',
  videos_count NUMERIC DEFAULT 1,
  hooks_count NUMERIC DEFAULT 1,
  video_format TEXT DEFAULT '9:16 Vertical (1080p)',
  drive_link TEXT,
  status TEXT DEFAULT 'Ready to Launch',
  notes TEXT,
  author_id TEXT,
  author_name TEXT,
  author_role TEXT,
  author_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. WEEKLY CONTENTS TABLE (Content តាម Week 1, 2, 3, 4 with Script file)
CREATE TABLE IF NOT EXISTS public.weekly_contents (
  id TEXT PRIMARY KEY,
  week TEXT NOT NULL,
  week_label TEXT,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  content_type TEXT DEFAULT 'Short-form Video (9:16)',
  platform TEXT DEFAULT 'TikTok & Reels',
  drive_link TEXT,
  boost_link TEXT,
  status TEXT DEFAULT 'Ready to Launch',
  notes TEXT,
  script_file_name TEXT,
  script_file_size TEXT,
  script_file_url TEXT,
  script_text TEXT,
  author_id TEXT,
  author_name TEXT,
  author_role TEXT,
  author_avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on Row Level Security (RLS) but allow public read/write with anon key for this internal tool
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editor_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Allow public delete users" ON public.users FOR DELETE USING (true);

CREATE POLICY "Allow public read daily_reports" ON public.daily_reports FOR SELECT USING (true);
CREATE POLICY "Allow public insert daily_reports" ON public.daily_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update daily_reports" ON public.daily_reports FOR UPDATE USING (true);
CREATE POLICY "Allow public delete daily_reports" ON public.daily_reports FOR DELETE USING (true);

CREATE POLICY "Allow public read editor_reports" ON public.editor_reports FOR SELECT USING (true);
CREATE POLICY "Allow public insert editor_reports" ON public.editor_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update editor_reports" ON public.editor_reports FOR UPDATE USING (true);
CREATE POLICY "Allow public delete editor_reports" ON public.editor_reports FOR DELETE USING (true);

CREATE POLICY "Allow public read weekly_contents" ON public.weekly_contents FOR SELECT USING (true);
CREATE POLICY "Allow public insert weekly_contents" ON public.weekly_contents FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update weekly_contents" ON public.weekly_contents FOR UPDATE USING (true);
CREATE POLICY "Allow public delete weekly_contents" ON public.weekly_contents FOR DELETE USING (true);

-- Insert Initial Users (Boss, Marketing, Editor)
INSERT INTO public.users (id, username, password, name, role, role_label, phone, start_date, avatar, bio)
VALUES
  ('usr-admin', 'admin', '123', 'Oun Boss (Manager)', 'Admin', 'Boss / General Manager', '012 888 999', '2024-01-01', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'General Manager & Marketing Director at SUVÉE'),
  ('usr-marketing', 'marketing', '123', 'Vannak Meas', 'Digital Marketing', 'Digital Marketing Specialist', '098 765 432', '2025-03-15', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Facebook Page Boost & TikTok Ads Lead'),
  ('usr-editor', 'editor', '123', 'Sokha Heng', 'Video Editor', 'Creative Video Editor', '087 112 233', '2025-06-01', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'Reels, TikTok Video Hooks & Visual Creatives Specialist')
ON CONFLICT (id) DO NOTHING;

-- Clean State: No dummy reports inserted. System is 100% clean and ready for real staff data!
-- If you already ran previous schema with demo data, run this command in SQL Editor to wipe:
-- TRUNCATE TABLE public.daily_reports;
-- TRUNCATE TABLE public.editor_reports;
-- TRUNCATE TABLE public.weekly_contents;


