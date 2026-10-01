import React, { useState } from 'react';
import { 
  CheckSquare, 
  Target, 
  Sparkles, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Zap, 
  HelpCircle,
  CheckCircle2,
  Copy,
  Plus
} from 'lucide-react';

export default function PlanningSOP({ checklist, onToggleChecklist }) {
  const [checklistPlatform, setChecklistPlatform] = useState('All');
  const [totalMonthlyBudget, setTotalMonthlyBudget] = useState(1200);

  // Offer builder state
  const [offerState, setOfferState] = useState({
    productName: 'SUVÉE Natural Radiance Set',
    hook3s: 'មុខស្រអាប់ ឡើងជាំ ប្រើអ្វីក៏មិនត្រូវ? សាកវិធីសាស្រ្តនេះត្រឹមតែ ៧ ថ្ងៃ!',
    coreOffer: 'បញ្ចុះតម្លៃពិសេស 35% + ដឹកជញ្ជូនឥតគិតថ្លៃទូទាំងប្រទេស',
    bonusGift: 'ថែមជូន Mini Toner និង Beauty Sponge ឥតគិតថ្លៃ',
    guarantee: 'ធានាសងលុយវិញ 100% ប្រសិនបើប្រើហើយមិនពេញចិត្តក្នុងរយៈពេល 7 ថ្ងៃ',
    scarcity: 'កំណត់ត្រឹមតែ 30 ឈុតដំបូងសម្រាប់អតិថិជនឆាតមកក្នុងថ្ងៃនេះប៉ុណ្ណោះ',
    cta: 'ផ្ញើសារមកកាន់ Page ឥឡូវនេះដើម្បីទទួលបានកាដូពិសេស'
  });

  const [copied, setCopied] = useState(false);

  // Checklist Calculations
  const filteredChecklist = checklist.filter(c => 
    checklistPlatform === 'All' || c.platform === 'All' || c.platform === checklistPlatform
  );
  const completedCount = filteredChecklist.filter(c => c.checked).length;
  const progressPercent = filteredChecklist.length > 0 
    ? Math.round((completedCount / filteredChecklist.length) * 100) 
    : 0;

  // Budget calculations
  const scaleBudget = (totalMonthlyBudget * 0.60).toFixed(0);
  const testBudget = (totalMonthlyBudget * 0.25).toFixed(0);
  const retargetBudget = (totalMonthlyBudget * 0.15).toFixed(0);
  const dailyPacing = (totalMonthlyBudget / 30).toFixed(2);

  const handleCopyScript = () => {
    const fullScript = `【${offerState.productName}】\n\n🎯 3-Second Hook:\n"${offerState.hook3s}"\n\n🎁 Irresistible Offer:\n${offerState.coreOffer}\n\n✨ កាដូថែមពិសេស:\n${offerState.bonusGift}\n\n🛡️ Risk Reversal (ការធានា):\n${offerState.guarantee}\n\n⏳ Scarcity / Urgency:\n${offerState.scarcity}\n\n👉 Call to Action:\n${offerState.cta}`;
    navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="planning-sop-view">
      {/* Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <CheckSquare className="text-emerald" size={26} color="#10B981" />
            SOP: Campaign Planning & Strategy
          </h2>
          <p>
            គោលការណ៍ស្តង់ដាររៀបចំ Campaign មុនពេល Boost: Planning Checklist, Target Persona, Offer & Budget
          </p>
        </div>
      </div>

      {/* Grid: Checklist & Budget Allocation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Module 1: Pre-Launch Planning Checklist */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                ១. Planning Checklist (មុនពេល Run Ads)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                ត្រួតពិនិត្យភាពរួចរាល់ 100% មុនពេលចុច Turn ON Campaign
              </p>
            </div>
            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button 
                className={`btn ${checklistPlatform === 'All' ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => setChecklistPlatform('All')}
              >
                All
              </button>
              <button 
                className={`btn ${checklistPlatform === 'Facebook' ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => setChecklistPlatform('Facebook')}
              >
                🔵 FB
              </button>
              <button 
                className={`btn ${checklistPlatform === 'TikTok' ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => setChecklistPlatform('TikTok')}
              >
                🎵 TikTok
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>ភាពរួចរាល់ (Launch Readiness):</span>
              <span style={{ fontWeight: 800, color: progressPercent === 100 ? '#34D399' : '#FBBF24' }}>
                {completedCount}/{filteredChecklist.length} ({progressPercent}%)
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${progressPercent}%`, 
                  height: '100%', 
                  background: progressPercent === 100 ? '#10B981' : 'linear-gradient(90deg, #F59E0B, #10B981)',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredChecklist.map((item) => (
              <div 
                key={item.id} 
                className={`checklist-item ${item.checked ? 'completed' : ''}`}
                onClick={() => onToggleChecklist(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <input 
                  type="checkbox" 
                  checked={item.checked} 
                  onChange={() => {}} // handled by wrapper
                />
                <div className="checklist-content">
                  <div className="checklist-title">
                    {item.title}
                    {item.platform !== 'All' && (
                      <span className={`badge ${item.platform === 'Facebook' ? 'badge-platform-fb' : 'badge-platform-tt'}`}>
                        {item.platform}
                      </span>
                    )}
                  </div>
                  <div className="checklist-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Budget Allocation Strategy (60/25/15 Rule) */}
        <div className="glass-card">
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign size={20} color="#10B981" />
              ២. ការបែងចែក Ad Budget (60/25/15 Formula)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              រូបមន្តបែងចែកកញ្ចប់ថវិកាផ្សព្វផ្សាយដើម្បីការពារការខាតបង់ និងបង្កើនប្រាក់ចំណេញ
            </p>
          </div>

          {/* Budget Input */}
          <div style={{ background: 'rgba(10, 25, 47, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
            <label className="form-label">
              កញ្ចប់ថវិកាប្រចាំខែសរុប (Total Monthly Budget)
              <span className="sub">USD ($)</span>
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.4rem' }}>
              <input 
                type="number" 
                className="form-input" 
                style={{ fontSize: '1.2rem', fontWeight: 700 }}
                value={totalMonthlyBudget} 
                onChange={(e) => setTotalMonthlyBudget(Math.max(0, parseFloat(e.target.value) || 0))}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                = <strong>${dailyPacing}</strong> / ថ្ងៃ
              </span>
            </div>
          </div>

          {/* 3 Tier Splits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Tier 1: 60% Scale */}
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.08)', 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              borderRadius: 'var(--radius-md)', 
              padding: '1rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: '#34D399', fontSize: '0.95rem' }}>
                  🚀 60% Scale Budget: Winning Ads
                </span>
                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#FFFFFF' }}>
                  ${scaleBudget}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                ដាក់ផ្តោតលើ Campaign ឬ Ad Creative ដែលមាន CPA ទាប និង ROAS &gt; 3.5x រួចស្រាប់។
              </p>
            </div>

            {/* Tier 2: 25% Testing */}
            <div style={{ 
              background: 'rgba(2, 132, 199, 0.08)', 
              border: '1px solid rgba(2, 132, 199, 0.3)', 
              borderRadius: 'var(--radius-md)', 
              padding: '1rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: '#38BDF8', fontSize: '0.95rem' }}>
                  🧪 25% Testing Budget: New Creatives & Hooks
                </span>
                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#FFFFFF' }}>
                  ${testBudget}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                សាកល្បង TikTok Spark Ads ថ្មី 3-5 វីដេអូរៀងរាល់សប្តាហ៍ ឬ តេស្ត Broad Audience នៅលើ Facebook។
              </p>
            </div>

            {/* Tier 3: 15% Retargeting */}
            <div style={{ 
              background: 'rgba(245, 158, 11, 0.08)', 
              border: '1px solid rgba(245, 158, 11, 0.3)', 
              borderRadius: 'var(--radius-md)', 
              padding: '1rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: '#FBBF24', fontSize: '0.95rem' }}>
                  🎯 15% Retargeting Budget: Warm Leads
                </span>
                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#FFFFFF' }}>
                  ${retargetBudget}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                រត់ចាប់ភ្ញៀវដែលធ្លាប់ Inbox ឬមើល Video បាន 50% ក្នុងរយៈពេល 90 ថ្ងៃមុន ដើម្បីជម្រុញឱ្យទិញភ្លាម។
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Module 3: Irresistible Offer Framework & Hook Builder */}
      <div className="glass-card highlight">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={22} color="#10B981" />
              ៣. Irresistible Offer & Copywriting SOP (រូបមន្តទាក់ទាញភ្ញៀវឆាត)
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              កសាងសំណើដែលភ្ញៀវពិបាកនឹងបដិសេធ (Irresistible Offer) សម្រាប់ Facebook Boost & TikTok Video
            </p>
          </div>

          <button className="btn btn-outline" onClick={handleCopyScript}>
            <Copy size={16} />
            <span>{copied ? 'បានចម្លងរួចរាល់! ✓' : 'ចម្លង Offer Script ពេញ'}</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Hook 3s */}
          <div className="form-group">
            <label className="form-label">
              <span>🎯 Hook ៣ វិនាទីដំបូង (បញ្ឈប់ការ Scroll)</span>
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={offerState.hook3s} 
              onChange={(e) => setOfferState({ ...offerState, hook3s: e.target.value })} 
            />
          </div>

          {/* Core Offer */}
          <div className="form-group">
            <label className="form-label">
              <span>🎁 Core Offer & Discount (តម្លៃពិសេស)</span>
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={offerState.coreOffer} 
              onChange={(e) => setOfferState({ ...offerState, coreOffer: e.target.value })} 
            />
          </div>

          {/* Bonus Stacking */}
          <div className="form-group">
            <label className="form-label">
              <span>✨ Value Stacking (កាដូថែមបន្ថែមតម្លៃ)</span>
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={offerState.bonusGift} 
              onChange={(e) => setOfferState({ ...offerState, bonusGift: e.target.value })} 
            />
          </div>

          {/* Risk Reversal */}
          <div className="form-group">
            <label className="form-label">
              <span>🛡️ Risk Reversal (ការធានាកាត់បន្ថយការភ័យខ្លាច)</span>
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={offerState.guarantee} 
              onChange={(e) => setOfferState({ ...offerState, guarantee: e.target.value })} 
            />
          </div>

          {/* Scarcity */}
          <div className="form-group">
            <label className="form-label">
              <span>⏳ Urgency & Scarcity (ចំនួនមានកំណត់)</span>
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={offerState.scarcity} 
              onChange={(e) => setOfferState({ ...offerState, scarcity: e.target.value })} 
            />
          </div>

          {/* CTA */}
          <div className="form-group">
            <label className="form-label">
              <span>👉 Clear Call to Action (ពាក្យបញ្ជាឱ្យឆាត)</span>
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={offerState.cta} 
              onChange={(e) => setOfferState({ ...offerState, cta: e.target.value })} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
