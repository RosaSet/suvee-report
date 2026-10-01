import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';
import { TIMELINE_STAGES } from '../data/initialData';

export default function TimelineCalendar() {
  const [activeStageIndex, setActiveStageIndex] = useState(1);

  // Calendar Strategy Weeks
  const calendarWeeks = [
    {
      week: "សប្តាហ៍ទី ១ (Day 01 - 07)",
      theme: "🚀 Launch & Testing Wave",
      objective: "Top-of-Funnel Awareness & Hook Testing",
      tactics: [
        "បញ្ចេញ 3-5 Creatives ថ្មីលើ TikTok (ផ្តោតលើ Spark Ads)",
        "រត់ Broad Targeting លើ Facebook ស្វែងរក winning angle",
        "តាមដាន CPM និង 3s Hook Rate រាល់ព្រឹកម៉ោង 9:00 AM"
      ],
      budgetShare: "25% នៃ Budget ប្រចាំខែ"
    },
    {
      week: "សប្តាហ៍ទី ២ (Day 08 - 14)",
      theme: "📈 Scaling Winning Creatives",
      objective: "Scale Winners & Lower CPA",
      tactics: [
        "បន្ថែម Budget 15-20% លើ Ad ដែលមាន ROAS > 3.5x",
        "បិទ Ad ណាដែលចាញ់ (CPA ខ្ពស់លើស $2.50)",
        "រៀបចំ Lookalike Audience ផ្អែកលើអ្នកទិញខែមុន"
      ],
      budgetShare: "30% នៃ Budget ប្រចាំខែ"
    },
    {
      week: "សប្តាហ៍ទី ៣ (Day 15 - 21)",
      theme: "🎯 Mid-Month Retargeting Push",
      objective: "Middle & Bottom Funnel Conversion",
      tactics: [
        "បើក Retargeting Campaign លើអ្នកធ្លាប់ Inbox ឬ Engage Page",
        "ផ្តល់ Offer បន្ថែម (ឧ. ទិញ ២ ថែម ១ ឬ Free Delivery)",
        "ចាប់ផ្តើម Audit ខែចាស់ដើម្បីត្រៀម Plan ខែបន្ទាប់ (Day 20)"
      ],
      budgetShare: "25% នៃ Budget ប្រចាំខែ"
    },
    {
      week: "សប្តាហ៍ទី ៤ (Day 22 - 30/31)",
      theme: "⚡ Month-End Flash Sale & Next Cycle Prep",
      objective: "Urgency Climax & Next Month Planning SOP",
      tactics: [
        "រត់ Flash Sale រយៈពេល ៣ ថ្ងៃចុងក្រោយបង្កើនចំណូលសរុប",
        "ធ្វើ Creative Audit និងរៀបចំ Strategy ខែថ្មី (Day 25-30)",
        "បិទបញ្ជី Daily Report និងធ្វើ Monthly Deep-Dive Review"
      ],
      budgetShare: "20% នៃ Budget ប្រចាំខែ"
    }
  ];

  return (
    <div className="timeline-view">
      {/* Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <CalendarDays className="text-emerald" size={26} color="#10B981" />
            Timeline & Calendar Strategy (ពី ១ ខែ ទៅ ១ ខែ)
          </h2>
          <p>
            វដ្តនៃការរៀបចំផែនការ (ចំណាយពេល ១០ ថ្ងៃមុនដាច់ខែ) និងយុទ្ធសាស្ត្រប្រតិទិនផ្សាយ Ads ប្រចាំសប្តាហ៍
          </p>
        </div>
      </div>

      {/* Planning Timeline Breakdown Banner */}
      <div className="glass-card highlight" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
          ⏱️ តើពី ១ ខែទៅ ១ ខែ ត្រូវចំណាយពេលប៉ុន្មានក្នុងការ Planning?
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          តាមស្តង់ដារ SOP របស់ <strong>SUVÉE</strong> ការ Planning សម្រាប់ខែបន្ទាប់មិនត្រូវធ្វើនៅថ្ងៃទី ០១ នោះទេ ប៉ុន្តែត្រូវចាប់ផ្តើម 
          <strong style={{ color: '#34D399' }}> ១០ ថ្ងៃមុនដាច់ខែ (Day 20 នៃខែចាស់)</strong>។ នេះធានាថានៅម៉ោង 00:01 ថ្ងៃទី 01 ខែថ្មី 
          រាល់ Campaign, Video TikTok, Banner Facebook និង Offer គឺត្រៀមរួចជាស្រេច (Zero Delay)!
        </p>

        {/* 5 Stages Interactive Visual Stepper */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {TIMELINE_STAGES.map((stg, idx) => {
            const isSelected = activeStageIndex === idx;
            return (
              <div 
                key={idx}
                onClick={() => setActiveStageIndex(idx)}
                style={{
                  background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(10, 25, 47, 0.6)',
                  border: `1px solid ${isSelected ? 'var(--emerald-main)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: stg.color, letterSpacing: '0.5px' }}>
                    {stg.dayRange}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.06)', padding: '0.15rem 0.45rem', borderRadius: 4 }}>
                    {stg.duration}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#FFFFFF', marginBottom: '0.3rem' }}>
                  {stg.stage}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {stg.tasks.length} សកម្មភាពសំខាន់ៗ
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Box */}
        <div style={{ 
          marginTop: '1.25rem', 
          background: 'rgba(0, 0, 0, 0.3)', 
          borderRadius: 'var(--radius-md)', 
          padding: '1.25rem',
          borderLeft: `4px solid ${TIMELINE_STAGES[activeStageIndex].color}`
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            សកម្មភាពលម្អិតក្នុងវគ្គ៖ {TIMELINE_STAGES[activeStageIndex].stage} ({TIMELINE_STAGES[activeStageIndex].dayRange})
          </h4>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-primary)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {TIMELINE_STAGES[activeStageIndex].tasks.map((task, tIdx) => (
              <li key={tIdx}>{task}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Calendar Strategy: 4-Week Execution Blueprint */}
      <div className="glass-card">
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
            📅 យុទ្ធសាស្ត្រប្រតិទិន ៤ សប្តាហ៍ (30-Day Calendar Strategy)
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            របៀបបែងចែកយុទ្ធនាការ និងគោលបំណង Ads ពីសប្តាហ៍ទី ១ ដល់សប្តាហ៍ទី ៤
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {calendarWeeks.map((cw, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: 'rgba(10, 25, 47, 0.5)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)', 
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-main)' }}>
                    {cw.week}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '0.2rem 0.5rem', borderRadius: 999 }}>
                    {cw.budgetShare}
                  </span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.3rem' }}>
                  {cw.theme}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#38BDF8', marginBottom: '0.75rem', fontWeight: 600 }}>
                  {cw.objective}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {cw.tactics.map((tac, tIdx) => (
                    <div key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <span style={{ color: 'var(--emerald-main)' }}>•</span>
                      <span>{tac}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Target Funnel: {idx === 0 ? 'Top Funnel' : idx === 1 ? 'Mid/Scale' : idx === 2 ? 'Retargeting' : 'Bottom Conversion'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
