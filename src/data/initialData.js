// Initial State: Start with clean empty reports (No data until staff uploads)
export const INITIAL_DAILY_REPORTS = [];

export const INITIAL_PLANNING_CHECKLIST = [
  {
    id: "chk-1",
    category: "Account & Assets",
    title: "Account Health & Billing",
    desc: "កាតធនាគារមានលុយគ្រប់គ្រាន់, គ្មានបម្រាម Policy Warning លើ Facebook Business & TikTok Ad Center",
    checked: true,
    platform: "All"
  },
  {
    id: "chk-2",
    category: "Account & Assets",
    title: "Pixel / Event Setup & Tracking",
    desc: "ផ្ទៀងផ្ទាត់ Meta Pixel & TikTok Pixel ដំណើរការត្រឹមត្រូវ (ViewContent, Lead, Purchase)",
    checked: true,
    platform: "All"
  },
  {
    id: "chk-3",
    category: "Creatives & Copy",
    title: "TikTok Video Format (9:16 & 1080p)",
    desc: "វីដេអូទំហំបញ្ឈរពេញអេក្រង់, សំឡេងច្បាស់, មាន Trending Music, Hook 3 វិនាទីដំបូងច្បាស់លាស់",
    checked: true,
    platform: "TikTok"
  },
  {
    id: "chk-4",
    category: "Creatives & Copy",
    title: "Facebook Ad Banner & Text Rule",
    desc: "រូបភាពច្បាស់ HD, អក្សរមិនលើស 20%, គ្មានរូបភាព Before/After ហួសហេតុនាំឱ្យខុស Policy",
    checked: true,
    platform: "Facebook"
  },
  {
    id: "chk-5",
    category: "Offer & Copy",
    title: "Irresistible Offer & Clear CTA",
    desc: "មាន Hook ទាក់ទាញ, Bundle/Discount, Risk-reversal (ធានា), Scarcity (ចំនួនកំណត់), CTA 'ផ្ញើសារឥឡូវនេះ'",
    checked: true,
    platform: "All"
  },
  {
    id: "chk-6",
    category: "Sales Operations",
    title: "Admin Messenger & Auto-Reply Ready",
    desc: "រៀបចំ Frequently Asked Questions (FAQ), Auto-reply ឆ្លើយតបភ្លាមៗក្នុងរយៈពេល 2 នាទីដំបូង",
    checked: false,
    platform: "Facebook"
  },
  {
    id: "chk-7",
    category: "Budget & Schedule",
    title: "Budget Allocation QA (60/25/15 Rule)",
    desc: "បែងចែក Budget 60% Scale, 25% Testing, 15% Retargeting ត្រឹមត្រូវតាមកាលវិភាគ",
    checked: false,
    platform: "All"
  }
];

export const TIMELINE_STAGES = [
  {
    dayRange: "Day 20 - 24",
    duration: "4 - 5 ថ្ងៃ",
    stage: "1. Audit & Research",
    color: "#0284C7",
    tasks: [
      "ត្រួតពិនិត្យទិន្នន័យខែចាស់ (Winning Creatives vs Losing Creatives)",
      "វិភាគគូប្រជែងលើ Facebook Ad Library & TikTok Creative Center",
      "កត់ត្រា CPA, ROAS និង Creative Fatigue នៃខែបច្ចុប្បន្ន"
    ],
    status: "Done"
  },
  {
    dayRange: "Day 25 - 27",
    duration: "3 ថ្ងៃ",
    stage: "2. Strategy & Offer Crafting",
    color: "#059669",
    tasks: [
      "កំណត់ Big Idea និង Campaign Angle ប្រចាំខែថ្មី",
      "រៀបចំ Irresistible Offer (Flash Sale, Bundle Deal, Freebie)",
      "សរសេរ 30-Day Content & Ad Calendar សម្រាប់ Facebook & TikTok"
    ],
    status: "In Progress"
  },
  {
    dayRange: "Day 28 - 29",
    duration: "2 ថ្ងៃ",
    stage: "3. Media Production & Creative Setup",
    color: "#D97706",
    tasks: [
      "ផលិតវីដេអូបញ្ឈរ 9:16 សម្រាប់ TikTok Ads & Reels",
      "រចនារូបភាព Banner HD សម្រាប់ Facebook Page Boost",
      "សរសេរ Ad Copywriting និង Setup Messenger Automation"
    ],
    status: "Upcoming"
  },
  {
    dayRange: "Day 30 - 31",
    duration: "1 - 2 ថ្ងៃ",
    stage: "4. QA Checklist & Pre-Launch",
    color: "#8B5CF6",
    tasks: [
      "Setup Ad Campaigns ក្នុង Meta Ads Manager & TikTok Ads Manager (Draft)",
      "ផ្ទៀងផ្ទាត់ Planning Checklist ឱ្យបាន 100%",
      "Schedule បើកដំណើរការនៅម៉ោង 00:01 ថ្ងៃទី 01"
    ],
    status: "Upcoming"
  },
  {
    dayRange: "Day 01 - 30/31",
    duration: "រាល់ថ្ងៃពេញមួយខែ",
    stage: "5. Execution & Daily Reporting",
    color: "#10B981",
    tasks: [
      "09:00 AM: Routine Check (Budget Pace & Ad Status)",
      "02:00 PM: Midday Check (Leads Volume & Admin Flow)",
      "06:00 PM: បញ្ចូល Daily Report ក្នុងប្រព័ន្ធ SUVÉE Report",
      "Weekly Review រៀងរាល់ថ្ងៃច័ន្ទ & Monthly Performance Audit"
    ],
    status: "Upcoming"
  }
];

export const KPI_BENCHMARKS = [
  {
    platform: "Facebook Page Boost",
    metric: "CTR (Link Click Rate)",
    benchmark: "> 1.8% - 3.0%",
    meaning: "វាស់ស្ទង់ថាតើរូបភាព Banner និងចំណងជើង Hook មានភាពទាក់ទាញដែរឬទេ",
    lowAction: "ប្តូរ Creative / Headline ថ្មីជាបន្ទាន់"
  },
  {
    platform: "Facebook Page Boost",
    metric: "Cost Per Message (CPL)",
    benchmark: "< $0.80 - $1.80",
    meaning: "តម្លៃជាមធ្យមក្នុងការទាក់ទាញភ្ញៀវម្នាក់ឱ្យឆាតចូល Messenger",
    lowAction: "កែសម្រួល Offer ឱ្យកាន់តែ Irresistible ឬតេស្ត Broad Audience"
  },
  {
    platform: "TikTok Ads",
    metric: "Hook Rate (2-3s View)",
    benchmark: "> 30% - 40%",
    meaning: "អត្រាអ្នកមើលវីដេអូ ៣ វិនាទីដំបូងដោយមិនអូសរំលង",
    lowAction: "កាត់ត 3s ដំបូងឡើងវិញ ដាក់សំឡេង Trend ឬ Text ធំៗ"
  },
  {
    platform: "TikTok Ads",
    metric: "Video Completion Rate",
    benchmark: "> 15% - 25%",
    meaning: "អត្រាអ្នកមើលវីដេអូរហូតដល់ចប់",
    lowAction: "កាត់តបែប Fast Pacing មិនឱ្យមានចន្លោះស្ងាត់"
  },
  {
    platform: "Both (FB & TikTok)",
    metric: "ROAS (Return On Ad Spend)",
    benchmark: "> 3.5x - 5.0x",
    meaning: "ផលចំណេញធៀបនឹងលុយ Ads (ចំណូល ÷ ចំណាយ Ads)",
    lowAction: "បើ ROAS < 2.0x ត្រូវបិទ Ad Set (Kill Rule)"
  }
];

export const SCALING_RULES = [
  {
    type: "Scale Rule (បង្កើន Budget)",
    condition: "ROAS > 3.5x ឬ Cost Per Message ទាបជាង Benchmark ជាប់គ្នា 3 ថ្ងៃ",
    action: "បង្កើន Ad Budget 15% - 20% រៀងរាល់ 48-72 ម៉ោងម្តង (បញ្ចៀសមិនឱ្យ Ad ធ្លាក់ចូល Learning Phase)",
    badgeColor: "#10B981"
  },
  {
    type: "Optimize Rule (កែសម្រួល)",
    condition: "ROAS ចន្លោះ 2.0x - 3.0x, CTR ចាប់ផ្តើមធ្លាក់ចុះ (Creative Fatigue)",
    action: "រក្សា Budget ដដែល រួចបន្ថែម Creative Angle ថ្មីៗចូល Ad Set ឬប្តូរ Headline/Call-to-Action",
    badgeColor: "#F59E0B"
  },
  {
    type: "Kill Rule (បិទជាបន្ទាន់)",
    condition: "Ad ចាយលុយលើស 3 ដងនៃ Target Cost Per Lead (CPL) តែគ្មាន Lead ឬ ROAS < 1.5x",
    action: "Turn OFF Ad Set នោះចោលភ្លាមៗ ដើម្បីកុំឱ្យខ្ជះខ្ជាយថវិកា ហើយវិភាគមូលហេតុ",
    badgeColor: "#EF4444"
  }
];

export const INITIAL_VIDEO_REPORTS = [
  {
    id: "vid-001",
    date: "2026-10-01",
    platform: "TikTok Spark Ads",
    videoTitle: "SUVÉE Radiance Serum - 3s Hook 'មុខភ្លឺថ្លាក្នុង ៧ ថ្ងៃ'",
    hookType: "Before/After Transformation",
    spend: 28.0,
    views: 34200,
    hookRate3s: 41.5, // 41.5% stayed > 3s
    completionRate: 23.8, // 23.8% completed
    leads: 31,
    salesClosed: 8,
    revenue: 320.0,
    cpa: 0.90,
    roas: 11.4,
    status: "Winning / Scale",
    fatigue: "Fresh (Excellent)"
  },
  {
    id: "vid-002",
    date: "2026-10-01",
    platform: "Facebook Reels",
    videoTitle: "SUVÉE Sunscreen Testing Water Resistance",
    hookType: "Product Test / Shock Factor",
    spend: 22.0,
    views: 18500,
    hookRate3s: 36.2,
    completionRate: 19.4,
    leads: 19,
    salesClosed: 4,
    revenue: 160.0,
    cpa: 1.16,
    roas: 7.27,
    status: "Winning / Scale",
    fatigue: "Fresh"
  },
  {
    id: "vid-003",
    date: "2026-09-30",
    platform: "TikTok Ads",
    videoTitle: "SUVÉE Night Cream - Unboxing & ASMR Texture",
    hookType: "ASMR / Aesthetic Unboxing",
    spend: 20.0,
    views: 12400,
    hookRate3s: 28.0,
    completionRate: 14.2,
    leads: 10,
    salesClosed: 2,
    revenue: 78.0,
    cpa: 2.00,
    roas: 3.9,
    status: "Optimize",
    fatigue: "Moderate Fatigue"
  },
  {
    id: "vid-004",
    date: "2026-09-29",
    platform: "Facebook Reels",
    videoTitle: "General Skincare Routine Talk (Angle C)",
    hookType: "Educational / Talking Head",
    spend: 25.0,
    views: 8900,
    hookRate3s: 19.5,
    completionRate: 8.4,
    leads: 5,
    salesClosed: 1,
    revenue: 35.0,
    cpa: 5.00,
    roas: 1.4,
    status: "Fatigue / Kill",
    fatigue: "Severe Fatigue (Kill)"
  }
];

export const VIDEO_HOOK_TEMPLATES = [
  {
    id: "angle-1",
    name: "The Relatable Pain Point (ចាក់ចំបញ្ហាឈឺចាប់)",
    hookText: "ធ្លាប់ពិបាកចិត្តរឿងមុខស្រអាប់ ឡើងជាំ ប្រើអ្វីក៏មិនបាត់មែនទេ?",
    structure: "0-3s: បង្ហាញបញ្ហា -> 3-10s: មូលហេតុខុសពីមុន -> 10-25s: ដំណោះស្រាយ SUVÉE -> 25-30s: Offer + CTA",
    bestFor: "Facebook Reels & TikTok Feed Ads"
  },
  {
    id: "angle-2",
    name: "The 'Stop Scrolling' Shock Factor (បញ្ឈប់ដៃភ្លាមៗ)",
    hookText: "ឈប់ខាតលុយទិញ Skincare ផ្តេសផ្តាសទៀតទៅ! បើមិនទាន់បានសាកវិធីនេះ...",
    structure: "0-2s: សំឡេងខ្ទរ + Action ប្លែក -> 2-8s: ការពិតគួរឱ្យភ្ញាក់ផ្អើល -> 8-20s: ភស្តុតាង និងផលតេស្ត -> 20-30s: កាដូថែម",
    bestFor: "TikTok Spark Ads (High Hook Rate)"
  },
  {
    id: "angle-3",
    name: "Satisfying ASMR & Texture Showcase (ទាក់ទាញភ្នែក)",
    hookText: "តើជាតិសេរ៉ូមបែបនេះ ស្រួលលាប និងជ្រាបចូលស្បែកដល់កម្រិតណា? [សំឡេង Dropper + Sound Effect]",
    structure: "0-4s: Close-up សាច់ផលិតផលច្បាស់កម្រិត 4K -> 4-15s: លាបលើស្បែកផ្ទាល់ -> 15-25s: អារម្មណ៍ស្រស់ស្រាយ -> CTA",
    bestFor: "Instagram Reels & TikTok Aesthetic"
  },
  {
    id: "angle-4",
    name: "The 7-Day Transformation (លទ្ធផលជាក់ស្តែង)",
    hookText: "នេះជាស្បែកមុខរបស់ខ្ញុំកាលពី ៧ ថ្ងៃមុន និងពេលនេះ... គ្រាន់តែប្រើ ១ ដំណក់រាល់យប់!",
    structure: "0-3s: រូបថត Before/After ពិត -> 3-15s: ដំណើរការប្រើប្រចាំថ្ងៃ -> 15-25s: ទំនុកចិត្តពេលស្បែកស្អាត -> CTA",
    bestFor: "Customer Review / UGC Videos"
  }
];

export const INITIAL_EDITOR_REPORTS = [];

export const INITIAL_USERS = [
  {
    id: "usr-admin",
    username: "admin",
    password: "123",
    name: "Oun Boss (Manager)",
    role: "Admin",
    roleLabel: "Boss / General Manager",
    phone: "012 888 999",
    startDate: "2024-01-01",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "General Manager & Marketing Director at SUVÉE"
  },
  {
    id: "usr-marketing",
    username: "marketing",
    password: "123",
    name: "Vannak Meas",
    role: "Digital Marketing",
    roleLabel: "Digital Marketing Specialist",
    phone: "098 765 432",
    startDate: "2025-03-15",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Facebook Page Boost & TikTok Ads Lead"
  },
  {
    id: "usr-editor",
    username: "editor",
    password: "123",
    name: "Sokha Heng",
    role: "Video Editor",
    roleLabel: "Creative Video Editor",
    phone: "087 112 233",
    startDate: "2025-06-01",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    bio: "Reels, TikTok Video Hooks & Visual Creatives Specialist"
  }
];

export const INITIAL_WEEKLY_CONTENTS = [];



