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

-- Insert Initial Daily Reports (Boost Page & TikTok Ads)
INSERT INTO public.daily_reports (id, date, platform, campaign_name, objective, spend, impressions, reach, leads, sales_closed, revenue, notes, status, boost_link, author_id, author_name, author_role, author_avatar)
VALUES
  ('rep-001', '2026-10-01', 'Facebook', 'SUVÉE Skin Glow - Message Lead', 'Messages (Inbox)', 45.0, 12500, 9800, 32, 7, 280.0, 'Offer ទិញ ១ ថែម ១ ទាក់ទាញខ្លាំង, Admin ឆ្លើយ Chat លឿនក្នុងរង្វង់ 2 នាទី', 'Scale', 'https://facebook.com/suvee/posts/101', 'usr-marketing', 'Vannak Meas', 'Digital Marketing', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
  ('rep-002', '2026-10-01', 'TikTok', 'SUVÉE Sunscreen Spark Ad #04', 'Video Views (Boost)', 35.0, 28400, 22100, 28400, 5, 195.0, 'Boost Video TikTok: View ចាស់ 12,000 ឡើងដល់ 40,400 (+28,400 Views), CPV $0.0012 ធូរថ្លៃខ្លាំង!', 'Scale', 'https://vt.tiktok.com/ZSjX991', 'usr-marketing', 'Vannak Meas', 'Digital Marketing', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
  ('rep-003', '2026-09-30', 'Facebook', 'SUVÉE Premium Cleanser Boost', 'Engagement / Messages', 40.0, 9800, 8200, 18, 3, 120.0, 'Cost Per Message ចាប់ផ្តើមឡើង $2.22, ត្រូវប្តូររូបភាព Ad Banner ថ្មី', 'Optimize', 'https://facebook.com/suvee/posts/102', 'usr-marketing', 'Vannak Meas', 'Digital Marketing', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
  ('rep-004', '2026-09-30', 'TikTok', 'SUVÉE Night Cream Testing Angle B', 'Lead Generation', 25.0, 14200, 11000, 11, 2, 88.0, 'Cost per Lead ខ្ពស់គួរសម ($2.27), កំពុងតេស្ត Creator ផ្សេងទៀត', 'Optimize', 'https://vt.tiktok.com/ZSjX992', 'usr-marketing', 'Vannak Meas', 'Digital Marketing', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
  ('rep-005', '2026-09-29', 'Facebook', 'SUVÉE Whitening Serum Retargeting', 'Sales / Retargeting', 20.0, 4300, 3800, 16, 6, 310.0, 'Retargeting លើអ្នកដែលធ្លាប់ Inbox ៩០ ថ្ងៃកន្លងមក ROAS 15.5x ខ្លាំងណាស់!', 'Scale', 'https://facebook.com/suvee/posts/103', 'usr-marketing', 'Vannak Meas', 'Digital Marketing', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150')
ON CONFLICT (id) DO NOTHING;

-- Insert Initial Video Editor Reports
INSERT INTO public.editor_reports (id, date, editor_name, video_title, platform, videos_count, hooks_count, video_format, drive_link, status, notes, author_id, author_name, author_role, author_avatar)
VALUES
  ('edit-001', '2026-10-01', 'Sokha (Editor)', 'SUVÉE Radiance Serum - 7-Day Transformation', 'TikTok & Reels', 2, 6, '9:16 Vertical (1080p)', 'https://drive.google.com/suvee-edits/oct-01', 'Ready to Launch', 'កាត់ជា 9:16 ច្បាស់ 1080p, ដាក់ Subtitles ខ្មែររលូន, សំឡេង Sound Effect Drop', 'usr-editor', 'Sokha Heng', 'Video Editor', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
  ('edit-002', '2026-10-01', 'Sokha (Editor)', 'SUVÉE Sunscreen Water Test Spark Ad', 'TikTok Spark Ads', 1, 4, '9:16 Vertical (1080p)', 'https://drive.google.com/suvee-edits/sunscreen-v1', 'Ready to Launch', 'Hook Shock Factor: "តើឡេការពារកម្តៅថ្ងៃនេះធន់នឹងទឹកកម្រិតណា?"', 'usr-editor', 'Sokha Heng', 'Video Editor', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
  ('edit-003', '2026-09-30', 'Sokha (Editor)', 'SUVÉE Cleanser Foam Texture & ASMR', 'Facebook Reels', 2, 5, '9:16 Vertical (1080p)', 'https://drive.google.com/suvee-edits/cleanser-asmr', 'Ready to Launch', 'ផ្ដោតលើ Macro Shot សាច់ពពុះសាប៊ូ និងសំឡេងលាងមុខ', 'usr-editor', 'Sokha Heng', 'Video Editor', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150')
ON CONFLICT (id) DO NOTHING;

-- Insert Initial Weekly Contents
INSERT INTO public.weekly_contents (id, week, week_label, date, title, content_type, platform, drive_link, boost_link, status, script_file_name, script_file_size, script_text, notes, author_id, author_name, author_role, author_avatar)
VALUES
  ('cnt-001', 'Week 1', 'Week 1 (ថ្ងៃទី 01 - 07 តុលា)', '2026-10-01', 'Video UGC Before & After 7-Day Transformation', 'Short-form Video (9:16)', 'TikTok & Reels', 'https://drive.google.com/suvee/week1-video-01', 'https://vt.tiktok.com/ZSjX991', 'Uploaded & Boosted', 'suvee_ugc_transformation_script.docx', '24.8 KB', '【Hook 0-3s】: នេះជាស្បែកមុខរបស់ខ្ញុំកាលពី ៧ ថ្ងៃមុន និងពេលនេះ... គ្រាន់តែប្រើ ១ ដំណក់រាល់យប់!\n【Problem 3-10s】: ធ្លាប់ពិបាកចិត្តរឿងមុខស្រអាប់ ឡើងជាំ ប្រើអ្វីក៏មិនបាត់?\n【Solution 10-22s】: សេរ៉ូម SUVÉE Radiance ជាមួយ Niacinamide 10% ជ្រាបចូលលឿន មិនស្អិត\n【Offer & CTA 22-30s】: ប្រូម៉ូសិនពិសេសប្រចាំខែតុលា ទិញ ១ ថែម ១! ចុច Link ខាងក្រោមកម្ម៉ង់ភ្លាម!', 'កាត់ជា 9:16 ច្បាស់ 1080p, Hook ខ្លាំងអត្រាចូលមើលខ្ពស់ (+28k views)', 'usr-editor', 'Sokha Heng', 'Video Editor', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
  ('cnt-002', 'Week 1', 'Week 1 (ថ្ងៃទី 01 - 07 តុលា)', '2026-10-01', 'Photo Banner Offer ទិញ ១ ថែម ១ Skin Glow Set', 'Graphic Banner (1:1 / 4:5)', 'Facebook Page', 'https://drive.google.com/suvee/week1-banner-offer', 'https://facebook.com/suvee/posts/882199', 'Active Boost', 'ad_copy_offer_buy1get1.txt', '12.4 KB', '🌟 WOW PROMOTION! ទិញ ១ ថែម ១ ភ្លាមៗ!\n✨ ឈុត Skin Glow Set ជួយឱ្យស្បែកភ្លឺរលោង ចែងចាំងដូចកញ្ចក់\n📦 ហ្វ្រីដឹកជញ្ជូនទូទាំងប្រទេស\n👉 Inbox មកកាន់ផេកឥឡូវនេះ ដើម្បីទទួលបានការប្រឹក្សាស្បែកដោយឥតគិតថ្លៃ!', 'Campaign ជោគជ័យខ្លាំង Admin ឆ្លើយ Chat រង្វង់ 2 នាទី (32 Leads)', 'usr-marketing', 'Vannak Meas', 'Digital Marketing', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
  ('cnt-003', 'Week 2', 'Week 2 (ថ្ងៃទី 08 - 14 តុលា)', '2026-10-08', 'SUVÉE Sunscreen Water Test Spark Ad (Shock Factor)', 'Short-form Video (9:16)', 'TikTok Spark Ads', 'https://drive.google.com/suvee/week2-sunscreen-test', '', 'Ready to Launch', 'sunscreen_water_test_hook.docx', '31.2 KB', '【Hook Shock 0-3s】: ឈប់ខាតលុយទិញឡេការពារកម្តៅថ្ងៃលាបហើយហៀរប្រឡាក់អាវទៀតទៅ!\n【Water Test 3-15s】: ចាក់ទឹកបាញ់លើដៃផ្ទាល់ បង្ហាញភាពធន់នឹងទឹក និងញើស SPF50+ PA++++\n【CTA 15-25s】: ការពារស្បែកបែប Professional ជាមួយ SUVÉE Sunscreen!', 'ផលិតបាន ៤ Hook ប្លែកៗគ្នាសម្រាប់ A/B Test', 'usr-editor', 'Sokha Heng', 'Video Editor', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150')
ON CONFLICT (id) DO NOTHING;

