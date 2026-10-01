import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  FileText, 
  Flame, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { KPI_BENCHMARKS, SCALING_RULES } from '../data/initialData';

export default function KPIPerformanceReview() {
  const [reviewNotes, setReviewNotes] = useState({
    reviewType: 'Weekly Sprint Review',
    winningCreative: 'SUVÉE Skin Glow Set - Video Hook Before/After Soft',
    losingCreative: 'Body Lotion Broad Testing (CPA $4.28 - Killed)',
    adminFeedback: 'Admin ឆ្លើយតបលឿនមធ្យម 2.5 នាទី, បិទការលក់បាន 21.8%',
    actionItems: '1. Scale Budget 20% លើ Winning Ad. 2. ផលិត 3s Hook វីដេអូ TikTok ថ្មី 3 ទៀត។ 3. ត្រៀម Offer ដាច់ខែ។'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveReview = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="kpi-review-view">
      {/* Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <TrendingUp className="text-emerald" size={26} color="#10B981" />
            KPI Ads Campaign & Performance Review SOP
          </h2>
          <p>
            ស្តង់ដារវាស់វែង KPIs សម្រាប់ Facebook & TikTok, ច្បាប់ Scaling/Killing Ad, និងការធ្វើ Performance Review
          </p>
        </div>
      </div>

      {/* Section 1: KPI Benchmarks Table */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
          🎯 ១. តារាងស្តង់ដារ KPI Ads (Facebook Page Boost vs TikTok Ads)
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
          រាល់ពេលពិនិត្យរបាយការណ៍ ត្រូវផ្ទៀងផ្ទាត់តួលេខជាមួយ Benchmark ខាងក្រោមដើម្បីដឹងពីសុខភាពរបស់ Campaign
        </p>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>សូចនាករ (KPI Metric)</th>
                <th>គោលដៅល្អប្រសើរ (Target Benchmark)</th>
                <th>អត្ថន័យ & សារៈសំខាន់</th>
                <th>ចំណាត់ការដោះស្រាយ (Action if Low)</th>
              </tr>
            </thead>
            <tbody>
              {KPI_BENCHMARKS.map((kpi, idx) => (
                <tr key={idx}>
                  <td>
                    <span className={`badge ${kpi.platform.includes('Facebook') ? 'badge-platform-fb' : kpi.platform.includes('TikTok') ? 'badge-platform-tt' : 'badge-platform-all'}`}>
                      {kpi.platform}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#FFFFFF' }}>{kpi.metric}</td>
                  <td style={{ fontWeight: 800, color: '#34D399', fontSize: '0.95rem' }}>
                    {kpi.benchmark}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{kpi.meaning}</td>
                  <td style={{ fontSize: '0.85rem', color: '#FDA4AF' }}>
                    ⚠️ {kpi.lowAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Decision Matrix (Scale / Optimize / Kill Rules) */}
      <div className="glass-card highlight" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
          ⚖️ ២. Decision Matrix: ច្បាប់ Scaling, Optimize និង Kill Ad
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          ជៀសវាងការប្រើអារម្មណ៍ក្នុងការគ្រប់គ្រង Ad - ត្រូវសម្រេចចិត្តដោយផ្អែកលើទិន្នន័យជាក់ស្តែង (Data-Driven Decisions)
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
          {SCALING_RULES.map((rule, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(10, 25, 47, 0.6)',
                border: `1px solid ${rule.badgeColor}40`,
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                position: 'relative'
              }}
            >
              <div style={{ 
                display: 'inline-block', 
                fontSize: '0.8rem', 
                fontWeight: 800, 
                color: rule.badgeColor, 
                background: `${rule.badgeColor}18`,
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                marginBottom: '0.75rem'
              }}>
                {rule.type}
              </div>

              <div style={{ marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  លក្ខខណ្ឌ (Trigger Condition):
                </span>
                <p style={{ fontSize: '0.88rem', color: '#F8FAFC', fontWeight: 600, marginTop: '0.2rem' }}>
                  {rule.condition}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  សកម្មភាពអនុវត្ត (Action SOP):
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem', lineHeight: 1.5 }}>
                  {rule.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Performance Review SOP Log */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#10B981" />
              ៣. Performance Review Log (ការវាយតម្លៃ និងកែលម្អ)
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              កត់ត្រាការវាយតម្លៃប្រចាំសប្តាហ៍ (Weekly Sprint) និងប្រចាំខែ (Monthly Deep-Dive)
            </p>
          </div>
          {savedSuccess && (
            <span style={{ color: '#34D399', fontSize: '0.85rem', fontWeight: 700 }}>
              ✓ បានរក្សាទុកកំណត់ត្រា Review!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveReview}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">ប្រភេទ Review</label>
              <select 
                className="form-select"
                value={reviewNotes.reviewType}
                onChange={(e) => setReviewNotes({ ...reviewNotes, reviewType: e.target.value })}
              >
                <option value="Weekly Sprint Review">Weekly Sprint Review (រៀងរាល់ថ្ងៃច័ន្ទ)</option>
                <option value="Monthly Deep-Dive Review">Monthly Deep-Dive Review (ដំណាច់ខែ)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Winning Creative / Ad ល្អបំផុត</label>
              <input 
                type="text" 
                className="form-input" 
                value={reviewNotes.winningCreative}
                onChange={(e) => setReviewNotes({ ...reviewNotes, winningCreative: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Losing Ad / មេរៀនដែលបរាជ័យ (Killed)</label>
              <input 
                type="text" 
                className="form-input" 
                value={reviewNotes.losingCreative}
                onChange={(e) => setReviewNotes({ ...reviewNotes, losingCreative: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Admin Sales & Chat Performance</label>
              <input 
                type="text" 
                className="form-input" 
                value={reviewNotes.adminFeedback}
                onChange={(e) => setReviewNotes({ ...reviewNotes, adminFeedback: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                ផែនការសកម្មភាពកែលម្អ (Action Items សម្រាប់សប្តាហ៍/ខែបន្ទាប់)
              </label>
              <textarea 
                rows="3" 
                className="form-textarea"
                value={reviewNotes.actionItems}
                onChange={(e) => setReviewNotes({ ...reviewNotes, actionItems: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">
              រក្សាទុក Performance Review Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
