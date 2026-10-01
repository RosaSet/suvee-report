# 🚀 ការណែនាំអំពីការភ្ជាប់ Supabase Database និង Hosting លើ Vercel (Free 100%)

ឯកសារនេះណែនាំអ្នកមួយជំហានម្តងៗ ដើម្បីយកប្រព័ន្ធ **SUVÉE Report** ទៅប្រើប្រាស់ជាក់ស្តែងក្នុងក្រុមហ៊ុនប្រចាំថ្ងៃ ដោយមាន **Cloud Database Sync គ្រប់កុំព្យូទ័រ និង Hosting ប្រើបានរហូត**។

---

## ជំហានទី ១: បង្កើត Cloud Database នៅលើ Supabase (ចំណាយពេល ២ នាទី - ឥតគិតថ្លៃ)

1. ចូលទៅកាន់គេហទំព័រ [https://supabase.com](https://supabase.com) រួចចុច **Start your project** (អាច Login ជាមួយ Google ឬ GitHub)។
2. ចុច **New Project**៖
   - **Name:** `suvee-report`
   - **Database Password:** ដាក់លេខសម្ងាត់ណាមួយដែលអ្នកចាំ (ឧ. `SuveeAdmin2026!`)
   - **Region:** ជ្រើសរើស `Singapore (ap-southeast-1)` (ជិតកម្ពុជា ល្បឿនលឿនបំផុត)
   - ចុច **Create new project**។

---

## ជំហានទី ២: បង្កើតតារាងទិន្នន័យ (Run SQL Schema)

1. នៅលើ Supabase Dashboard ខាងឆ្វេងដៃ ចុចលើរូប **SQL Editor** (រូបតំណាង `>_`)។
2. ចុច **New Query**។
3. បើកឯកសារ [supabase_schema.sql](file:///d:/Working/SUV%C3%89E%20Report/supabase_schema.sql) ក្នុង Folder នេះ រួច Copy កូដទាំងអស់មកបិទភ្ជាប់ (Paste) ក្នុង SQL Editor។
4. ចុចប៊ូតុងពណ៌បៃតង **Run** (នៅខាងស្តាំក្រោម)។
5. ជោគជ័យ! តារាងទាំងអស់ (`users`, `daily_reports`, `editor_reports`, `weekly_contents`) និងគណនីដំបូងត្រូវបានបង្កើតរួចរាល់។

---

## ជំហានទី ៣: យក API Keys មកដាក់ក្នុង Project

1. នៅលើ Supabase Dashboard ខាងឆ្វេងក្រោម ចុចលើ **Project Settings** (រូបកង់ធ្មេញ ⚙️) -> ជ្រើសរើស **API** (ឬ Data API)។
2. អ្នកនឹងឃើញ៖
   - **Project URL:** (ឧ. `https://xyzcompany.supabase.co`)
   - **Project API Keys (anon public):** (កូដវែង `eyJhbGciOi...`)
3. បង្កើត ឬកែប្រែឯកសារ `.env` នៅ root នៃ project របស់អ្នក៖
```env
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*(ពេល Save ហើយ នៅលើ Header កម្មវិធីនឹងលោតសញ្ញាពណ៌បៃតង **🟢 Cloud Sync** បញ្ជាក់ថាបានភ្ជាប់ជោគជ័យ!)*

---

## ជំហានទី ៤: Hosting លើ Vercel (ឥតគិតថ្លៃ ១០០%)

Vercel គឺជាកន្លែង Hosting ដ៏ល្អដាច់គេសម្រាប់ React & Vite៖

### វិធីទី ១: Deploy តាម Vercel Dashboard (ងាយស្រួលបំផុត)
1. ចូលទៅកាន់ [https://vercel.com](https://vercel.com) រួច Login ដោយប្រើ GitHub។
2. យក Folder កូដនេះ Push ទៅកាន់ **GitHub** របស់អ្នក (Private Repo)។
3. នៅលើ Vercel ចុច **Add New...** -> **Project** -> ជ្រើសរើស Repo `SUVÉE Report`។
4. នៅត្រង់កន្លែង **Environment Variables** ដាក់៖
   - `VITE_SUPABASE_URL` = (Project URL ពី Supabase)
   - `VITE_SUPABASE_ANON_KEY` = (Anon key ពី Supabase)
5. ចុច **Deploy**។
6. រយៈពេលប្រហែល ៣០ វិនាទី អ្នកនឹងទទួលបាន Link ផ្ទាល់ខ្លួន ឧទាហរណ៍៖ `https://suvee-report.vercel.app` ដែលអាចផ្ញើឱ្យបុគ្គលិក និង Boss ប្រើបានពីគ្រប់ទីកន្លែង!

---

### វិធីទី ២: Deploy តាម Command Line (Vercel CLI)
ប្រសិនបើអ្នកចង់ Deploy ផ្ទាល់ពីកុំព្យូទ័រ៖
```bash
npm install -g vercel
vercel
```
ធ្វើតាមការណែនាំលើអេក្រង់ នោះអ្នកនឹងទទួលបាន Link ភ្លាមៗ!
