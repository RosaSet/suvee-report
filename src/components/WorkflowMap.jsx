import React, { useState } from 'react';
import { 
  GitFork, 
  Layers, 
  Calendar, 
  Smartphone, 
  FileSpreadsheet, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function WorkflowMap() {
  const [expandedStep, setExpandedStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "វគ្គទី ១: Monthly Planning & Strategy (Day 20 - 30 មុនដាច់ខែ)",
      subtitle: "ចំណាយពេល ១០ ថ្ងៃមុនចូលខែថ្មី ដើម្បីត្រៀមយុទ្ធសាស្ត្រ និងធនធាន",
      color: "#0284C7",
      details: [
        "Day 20 - 24 (Audit): ត្រួតពិនិត្យទិន្នន័យខែចាស់ (Creative Fatigue, High CPA Ads) និងវិភាគគូប្រជែងលើ Ad Library",
        "Day 25 - 27 (Strategy & Offer): កំណត់ Big Idea, Angle និងបង្កើត Irresistible Offer (Discount + Freebie + Risk Reversal)",
        "Day 28 - 29 (Media Production): ថត/កាត់តវីដេអូ TikTok 9:16 និងរចនា Banner Facebook HD",
        "Day 30 - 31 (QA Checklist): ផ្ទៀងផ្ទាត់ Planning Checklist 100% និង Schedule ដំណើរការនៅម៉ោង 00:01 ថ្ងៃទី 01"
      ]
    },
    {
      id: 2,
      title: "វគ្គទី ២: Ad Execution (Facebook Page Boost vs TikTok Ads)",
      subtitle: "រៀបចំ Campaign ទៅតាមជំនាញពិសេសនៃ Platform នីមួយៗ",
      color: "#0D9488",
      details: [
        "🔵 Facebook Page Boost: ផ្តោតលើ Messaging Objective (Inbox Chat) ដើម្បីឱ្យភ្ញៀវឆាតភ្លាមៗ",
        "🔵 Facebook Targeting: បើកទូលាយ (Broad Targeting) ទុកឱ្យ Meta AI ចាប់ភ្ញៀវតាម Video Hook, បូករួម Custom Retargeting",
        "🎵 TikTok Ads: ប្រើប្រាស់ Spark Ads (Boost ពី Organic Creator Video ដែលមាន View ល្អ)",
        "🎵 TikTok Creative: 3s Hook ខ្លាំង, Trending Sound, Fast Cut, CTA ច្បាស់លាស់នាំចូល Instant Form ឬ Chat"
      ]
    },
    {
      id: 3,
      title: "វគ្គទី ៣: SUVÉE Report Web System Automation",
      subtitle: "ប្រើប្រាស់ប្រព័ន្ធកណ្តាលដើម្បីគ្រប់គ្រងទិន្នន័យទាំងអស់",
      color: "#10B981",
      details: [
        "Central Database: រក្សាទុកប្រវត្តិ Campaign, Ad Spend, Leads, Sales និង ROAS",
        "Auto-Calculations: គណនា CPA, Profit និង ROAS ដោយស្វ័យប្រវត្តពេលបញ្ចូលតួលេខ",
        "SOP Integration: ភ្ជាប់ជាមួយ Checklist និង Decision Matrix (Scale / Optimize / Kill)"
      ]
    },
    {
      id: 4,
      title: "វគ្គទី ៤: Daily Routine & Daily Reporting (រៀងរាល់ថ្ងៃ)",
      subtitle: "កាលវិភាគត្រួតពិនិត្យ ៣ ពេលក្នុងមួយថ្ងៃសម្រាប់ Media Buyer",
      color: "#F59E0B",
      details: [
        "09:00 AM (Morning Check): ពិនិត្យ Ad Status (Active/Rejected), Delivery Health និងការចាយ Budget Pace",
        "02:00 PM (Midday Check): ពិនិត្យបរិមាណ Messages/Leads ធៀបនឹងល្បឿនឆ្លើយរបស់ Admin (Response Speed)",
        "06:00 PM (Submit Daily Report): បញ្ចូលតួលេខជាក់ស្តែង (Spend, Leads, Sales, Revenue) ចូលប្រព័ន្ធ SUVÉE Report"
      ]
    },
    {
      id: 5,
      title: "វគ្គទី ៥: Performance Review & Scaling Rules",
      subtitle: "សម្រេចចិត្តដោយផ្អែកលើទិន្នន័យ (Data-Driven Decisions)",
      color: "#8B5CF6",
      details: [
        "🚀 Scaling Rule: ប្រសិនបើ ROAS > 3.5x ជាប់គ្នា 3 ថ្ងៃ => បង្កើន Budget 15-20% រៀងរាល់ 48-72 ម៉ោង",
        "🔄 Optimize Rule: ប្រសិនបើ ROAS 2.0x - 3.0x និង CTR ធ្លាក់ចុះ => ប្តូររូបភាព Banner ឬ 3s Video Hook ថ្មី",
        "⛔ Kill Rule: ប្រសិនបើចំណាយលើស 3 ដង CPL គ្មាន Lead ឬ ROAS < 1.5x => បិទ Ad Set នោះចោលភ្លាម",
        "Weekly / Monthly Review: ប្រជុំបូកសរុបមេរៀន និងបញ្ជូន Feedback Loop ចូលទៅក្នុង Planning ខែបន្ទាប់"
      ]
    }
  ];

  return (
    <div className="mapflow-view">
      {/* Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <GitFork className="text-emerald" size={26} color="#10B981" />
            Full Digital Marketing Work Flow & Process Map
          </h2>
          <p>
            ដ្យាក្រាមលំហូរការងារទាំងមូលពីដើមដល់ចប់ (End-to-End SOP Lifecycle) សម្រាប់ Facebook & TikTok
          </p>
        </div>
      </div>

      {/* Visual Workflow Steps */}
      <div className="mapflow-container">
        {steps.map((step, idx) => {
          const isExpanded = expandedStep === idx;
          return (
            <div 
              key={step.id} 
              className="mapflow-step"
              style={{
                borderColor: isExpanded ? step.color : 'var(--border-color)',
                borderLeftWidth: '5px',
                borderLeftColor: step.color
              }}
            >
              <div className="mapflow-number" style={{ background: step.color }}>
                {step.id}
              </div>

              <div style={{ flex: 1 }}>
                <div 
                  onClick={() => setExpandedStep(isExpanded ? -1 : idx)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {step.subtitle}
                    </p>
                  </div>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ 
                    marginTop: '1.25rem', 
                    paddingTop: '1rem', 
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}>
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: '#F1F5F9' }}>
                        <CheckCircle2 size={16} color={step.color} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Continuous Loop Reminder */}
      <div className="glass-card highlight" style={{ marginTop: '2rem', textAlign: 'center', padding: '1.5rem' }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34D399', marginBottom: '0.4rem' }}>
          🔄 The Continuous Growth Loop
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          ទិន្នន័យពី <strong>Daily Report</strong> ជួយឱ្យយើងធ្វើ <strong>Performance Review</strong> កាន់តែច្បាស់លាស់ ហើយលទ្ធផលនៃ Review 
          នឹងក្លាយជាធាតុចូលដ៏សំខាន់សម្រាប់ <strong>Planning នៃខែបន្ទាប់ (Day 20)</strong> ដោយគ្មានការស្មាន!
        </p>
      </div>
    </div>
  );
}
