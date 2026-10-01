import React, { useState } from 'react';
import { 
  Video, 
  Scissors, 
  Sparkles, 
  TrendingUp, 
  Eye, 
  Clock, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Smartphone, 
  Heart, 
  MessageCircle, 
  Share2, 
  PlusCircle, 
  Trash2,
  Volume2,
  ExternalLink,
  Layers,
  FolderOpen,
  UserCheck
} from 'lucide-react';
import { VIDEO_HOOK_TEMPLATES } from '../data/initialData';

export default function VideoReportSOP({ 
  videoReports, 
  onAddVideoReport, 
  onDeleteVideoReport,
  editorReports = [],
  onAddEditorReport,
  onDeleteEditorReport
}) {
  // Sub-tab: 'editor' (Video Editor Report) vs 'ads' (Media Buyer Video Ads Performance)
  const [activeSubTab, setActiveSubTab] = useState('editor');

  // Hook templates state
  const [selectedHookAngle, setSelectedHookAngle] = useState(VIDEO_HOOK_TEMPLATES[0]);
  const [copiedHook, setCopiedHook] = useState(false);

  // Form State: Video Editor Daily Report
  const todayStr = new Date().toISOString().split('T')[0];
  const [editorForm, setEditorForm] = useState({
    date: todayStr,
    editorName: 'Sokha (Editor)',
    videoTitle: '',
    platform: 'TikTok & Reels',
    videosCount: 2,
    hooksCount: 6,
    videoFormat: '9:16 Vertical (1080p)',
    driveLink: '',
    status: 'Ready to Launch',
    notes: ''
  });
  const [editorSuccess, setEditorSuccess] = useState(false);

  // Form State: Video Ads Performance
  const [videoForm, setVideoForm] = useState({
    date: todayStr,
    platform: 'TikTok Spark Ads',
    videoTitle: '',
    hookType: 'The Relatable Pain Point',
    spend: '',
    views: '',
    hookRate3s: '',
    completionRate: '',
    leads: '',
    salesClosed: '',
    revenue: ''
  });
  const [videoSuccess, setVideoSuccess] = useState(false);

  // Editor Calculations
  const totalVideosEdited = editorReports.reduce((sum, r) => sum + Number(r.videosCount || 0), 0);
  const totalHooksProduced = editorReports.reduce((sum, r) => sum + Number(r.hooksCount || 0), 0);
  const avgHooksPerVideo = totalVideosEdited > 0 ? (totalHooksProduced / totalVideosEdited).toFixed(1) : '0.0';
  const readyVideosCount = editorReports.filter(r => r.status === 'Ready to Launch').reduce((sum, r) => sum + Number(r.videosCount || 0), 0);

  // Video Ads Calculations
  const totalVideoSpend = videoReports.reduce((sum, v) => sum + Number(v.spend || 0), 0);
  const totalVideoViews = videoReports.reduce((sum, v) => sum + Number(v.views || 0), 0);
  const totalVideoLeads = videoReports.reduce((sum, v) => sum + Number(v.leads || 0), 0);
  const totalVideoRevenue = videoReports.reduce((sum, v) => sum + Number(v.revenue || 0), 0);
  
  const avgHookRate = videoReports.length > 0 
    ? (videoReports.reduce((sum, v) => sum + Number(v.hookRate3s || 0), 0) / videoReports.length).toFixed(1) 
    : '0.0';

  const avgCompletionRate = videoReports.length > 0 
    ? (videoReports.reduce((sum, v) => sum + Number(v.completionRate || 0), 0) / videoReports.length).toFixed(1) 
    : '0.0';

  const overallVideoROAS = totalVideoSpend > 0 ? (totalVideoRevenue / totalVideoSpend).toFixed(2) : '0.00';

  // Handle Video Editor Submit
  const handleEditorSubmit = (e) => {
    e.preventDefault();
    if (!editorForm.videoTitle) {
      alert("សូមបញ្ចូលចំណងជើងវីដេអូ ឬប្រធានបទដែលបានកាត់ត!");
      return;
    }

    const newEditReport = {
      id: `edit-${Date.now()}`,
      date: editorForm.date,
      editorName: editorForm.editorName,
      videoTitle: editorForm.videoTitle,
      platform: editorForm.platform,
      videosCount: parseInt(editorForm.videosCount, 10) || 1,
      hooksCount: parseInt(editorForm.hooksCount, 10) || 1,
      videoFormat: editorForm.videoFormat,
      driveLink: editorForm.driveLink || '',
      status: editorForm.status,
      notes: editorForm.notes || ''
    };

    if (onAddEditorReport) {
      onAddEditorReport(newEditReport);
    }
    setEditorSuccess(true);
    setTimeout(() => setEditorSuccess(false), 3000);

    setEditorForm({
      date: todayStr,
      editorName: editorForm.editorName,
      videoTitle: '',
      platform: editorForm.platform,
      videosCount: 2,
      hooksCount: 6,
      videoFormat: '9:16 Vertical (1080p)',
      driveLink: '',
      status: 'Ready to Launch',
      notes: ''
    });
  };

  // Handle Video Ads Performance Submit
  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (!videoForm.videoTitle || !videoForm.spend) {
      alert("សូមបញ្ចូលចំណងជើងវីដេអូ និងការចំណាយ ($ Spend)");
      return;
    }

    const spendNum = parseFloat(videoForm.spend) || 0;
    const leadsNum = parseInt(videoForm.leads, 10) || 0;
    const revNum = parseFloat(videoForm.revenue) || 0;
    const hookNum = parseFloat(videoForm.hookRate3s) || 0;

    let fatigueStatus = "Fresh (Good)";
    let decisionStatus = "Winning / Scale";

    if (hookNum < 25.0 || (spendNum > 30 && leadsNum === 0)) {
      fatigueStatus = "Severe Fatigue (Kill)";
      decisionStatus = "Fatigue / Kill";
    } else if (hookNum < 32.0) {
      fatigueStatus = "Moderate Fatigue";
      decisionStatus = "Optimize Hook";
    }

    const newReport = {
      id: `vid-${Date.now()}`,
      date: videoForm.date,
      platform: videoForm.platform,
      videoTitle: videoForm.videoTitle,
      hookType: videoForm.hookType,
      spend: spendNum,
      views: parseInt(videoForm.views, 10) || 0,
      hookRate3s: hookNum,
      completionRate: parseFloat(videoForm.completionRate) || 0,
      leads: leadsNum,
      salesClosed: parseInt(videoForm.salesClosed, 10) || 0,
      revenue: revNum,
      cpa: leadsNum > 0 ? (spendNum / leadsNum).toFixed(2) : '0',
      roas: spendNum > 0 ? (revNum / spendNum).toFixed(2) : '0',
      status: decisionStatus,
      fatigue: fatigueStatus
    };

    onAddVideoReport(newReport);
    setVideoSuccess(true);
    setTimeout(() => setVideoSuccess(false), 3000);

    setVideoForm({
      date: todayStr,
      platform: videoForm.platform,
      videoTitle: '',
      hookType: 'The Relatable Pain Point',
      spend: '',
      views: '',
      hookRate3s: '',
      completionRate: '',
      leads: '',
      salesClosed: '',
      revenue: ''
    });
  };

  const copyScript = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
  };

  return (
    <div className="video-report-sop-view">
      {/* Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <Video className="text-emerald" size={26} color="var(--emerald-main)" />
            Digital Marketing & Video SOP Portal
          </h2>
          <p>
            របាយការណ៍កាត់តវីដេអូសម្រាប់ Video Editor (ចំនួន Video & Hook) និងតាមដានប្រសិទ្ធភាព Video Ads
          </p>
        </div>

        {/* View Toggle Switcher: Video Editor vs Ads Performance */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--quick-stat-bg)', padding: '0.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <button
            className={`btn ${activeSubTab === 'editor' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.84rem' }}
            onClick={() => setActiveSubTab('editor')}
          >
            <Scissors size={16} />
            <span>✂️ Video Editor Daily Report</span>
          </button>

          <button
            className={`btn ${activeSubTab === 'ads' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.84rem' }}
            onClick={() => setActiveSubTab('ads')}
          >
            <TrendingUp size={16} />
            <span>🚀 Video Ads Performance</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: VIDEO EDITOR DAILY PRODUCTION REPORT                   */}
      {/* ============================================================== */}
      {activeSubTab === 'editor' && (
        <div>
          {/* Editor Stat Summary Cards */}
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="glass-card stat-card highlight">
              <div className="stat-card-header">
                <span className="stat-label">វីដេអូកាត់បានសរុប (Total Videos)</span>
                <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                  <Scissors size={20} color="var(--emerald-main)" />
                </div>
              </div>
              <div className="stat-value" style={{ color: 'var(--emerald-main)' }}>
                {totalVideosEdited} Videos
              </div>
              <div className="stat-footer">
                <span className="trend-badge positive">
                  <CheckCircle2 size={13} /> គោលដៅ 2-3 វីដេអូ/ថ្ងៃ
                </span>
              </div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-card-header">
                <span className="stat-label">ចំនួន Hook បង្កើតបាន (Total Hooks)</span>
                <div className="stat-icon-wrapper blue">
                  <Sparkles size={20} />
                </div>
              </div>
              <div className="stat-value" style={{ color: '#0284C7' }}>
                {totalHooksProduced} Hooks
              </div>
              <div className="stat-footer">
                <span style={{ color: 'var(--text-secondary)' }}>ត្រៀមធ្វើ A/B Testing</span>
              </div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-card-header">
                <span className="stat-label">មធ្យម Hook ក្នុង ១ វីដេអូ</span>
                <div className="stat-icon-wrapper gold">
                  <Target size={20} />
                </div>
              </div>
              <div className="stat-value" style={{ color: 'var(--gold-accent)' }}>
                {avgHooksPerVideo} Hooks/Vid
              </div>
              <div className="stat-footer">
                <span className="trend-badge positive">Standard &gt; 2.5x</span>
              </div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-card-header">
                <span className="stat-label">វីដេអូត្រៀម Launch (Ready)</span>
                <div className="stat-icon-wrapper purple">
                  <CheckCircle2 size={20} />
                </div>
              </div>
              <div className="stat-value" style={{ color: '#8B5CF6' }}>
                {readyVideosCount} Videos
              </div>
              <div className="stat-footer">
                <span style={{ color: 'var(--text-muted)' }}>បញ្ជូនទៅ Media Buyer</span>
              </div>
            </div>
          </div>

          {/* Form: Video Editor Daily Input */}
          <div className="glass-card highlight" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PlusCircle size={20} color="var(--emerald-main)" />
                  របាយការណ៍កាត់តវីដេអូប្រចាំថ្ងៃ (Video Editor Daily Production Form)
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  កត់ត្រាចំនួនវីដេអូ និងចំនួន Hook ដែលបានផលិតរួចរាល់ក្នុងថ្ងៃនេះ
                </p>
              </div>
              <span className="badge badge-scale" style={{ fontWeight: 700 }}>
                Video Editor SOP
              </span>
            </div>

            {editorSuccess && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: 'var(--emerald-main)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} />
                <strong>បានរក្សាទុករបាយការណ៍ Video Editor ជោគជ័យ!</strong>
              </div>
            )}

            <form onSubmit={handleEditorSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">កាលបរិច្ឆេទ</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={editorForm.date} 
                    onChange={(e) => setEditorForm({ ...editorForm, date: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ឈ្មោះ Video Editor</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="ឈ្មោះអ្នកកាត់ត..." 
                    value={editorForm.editorName} 
                    onChange={(e) => setEditorForm({ ...editorForm, editorName: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">
                    ចំណងជើងវីដេអូ ឬប្រធានបទ
                    <span className="sub">ឧ. SUVÉE Sunscreen Shock Test Angle A</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="បញ្ចូលប្រធានបទវីដេអូ..." 
                    value={editorForm.videoTitle} 
                    onChange={(e) => setEditorForm({ ...editorForm, videoTitle: e.target.value })} 
                    required 
                  />
                </div>

                {/* --- The core fields requested by user --- */}
                <div className="form-group" style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <label className="form-label" style={{ fontWeight: 800, color: 'var(--emerald-main)' }}>
                    <span>🎬 ថ្ងៃហ្នឹងកាត់បានប៉ុន្មាន Video?</span>
                    <span className="sub">ចំនួនវីដេអូពេញ</span>
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-input" 
                    style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}
                    value={editorForm.videosCount} 
                    onChange={(e) => setEditorForm({ ...editorForm, videosCount: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group" style={{ background: 'rgba(2, 132, 199, 0.05)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
                  <label className="form-label" style={{ fontWeight: 800, color: '#0284C7' }}>
                    <span>⚡ ហើយប៉ុន្មាន Hook?</span>
                    <span className="sub">ចំនួន 3s Hook ប្លែកៗ</span>
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-input" 
                    style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}
                    value={editorForm.hooksCount} 
                    onChange={(e) => setEditorForm({ ...editorForm, hooksCount: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">គោលដៅ Platform</label>
                  <select 
                    className="form-select"
                    value={editorForm.platform}
                    onChange={(e) => setEditorForm({ ...editorForm, platform: e.target.value })}
                  >
                    <option value="TikTok & Reels">TikTok & Facebook Reels</option>
                    <option value="TikTok Spark Ads">TikTok Spark Ads (Creator)</option>
                    <option value="Facebook Reels">Facebook Reels Boost</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">ទម្រង់វីដេអូ (Format)</label>
                  <select 
                    className="form-select"
                    value={editorForm.videoFormat}
                    onChange={(e) => setEditorForm({ ...editorForm, videoFormat: e.target.value })}
                  >
                    <option value="9:16 Vertical (1080p)">9:16 Vertical (1080x1920)</option>
                    <option value="1:1 Square">1:1 Square (Feed)</option>
                    <option value="4:5 Portrait">4:5 Portrait</option>
                  </select>
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">
                    <span>Drive / Cloud Folder Link</span>
                    <span className="sub">Link ផ្ទុកវីដេអូដែលកាត់រួច</span>
                  </label>
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="https://drive.google.com/..." 
                    value={editorForm.driveLink} 
                    onChange={(e) => setEditorForm({ ...editorForm, driveLink: e.target.value })} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ស្ថានភាពផលិត (Status)</label>
                  <select 
                    className="form-select"
                    value={editorForm.status}
                    onChange={(e) => setEditorForm({ ...editorForm, status: e.target.value })}
                  >
                    <option value="Ready to Launch">✅ Ready to Launch (រួចរាល់ 100%)</option>
                    <option value="In Review">🔄 In Review (កំពុងត្រួតពិនិត្យ)</option>
                    <option value="Need Re-cut">✏️ Need Re-cut (ត្រូវកែសម្រួលឡើងវិញ)</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">
                    កំណត់សម្គាល់ & Feedback (Editor Remarks)
                  </label>
                  <textarea 
                    rows="2" 
                    className="form-textarea" 
                    placeholder="បញ្ជាក់អំពី Sound effect, Font style, ឬ Hook angle ដែលបានសាកល្បង..."
                    value={editorForm.notes} 
                    onChange={(e) => setEditorForm({ ...editorForm, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                  រក្សាទុករបាយការណ៍ Editor &rarr;
                </button>
              </div>
            </form>
          </div>

          {/* Table: Video Editor Daily Production Logs */}
          <div className="glass-card" style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                📋 តារាងប្រវត្តិការងារ Video Editor (Production History Log)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                តាមដានផលិតភាពប្រចាំថ្ងៃរបស់ក្រុមការងារកាត់តវីដេអូ
              </p>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>Editor Name</th>
                    <th>ប្រធានបទវីដេអូ</th>
                    <th>Platform & Format</th>
                    <th style={{ textAlign: 'center' }}>ចំនួន Video</th>
                    <th style={{ textAlign: 'center' }}>ចំនួន Hook</th>
                    <th>ស្ថានភាព</th>
                    <th style={{ textAlign: 'center' }}>Drive Link</th>
                    <th>សម្គាល់ (Notes)</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {editorReports.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        មិនទាន់មានទិន្នន័យរបាយការណ៍ Video Editor ឡើយ
                      </td>
                    </tr>
                  ) : (
                    editorReports.map((row) => (
                      <tr key={row.id}>
                        <td style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{row.date}</td>
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <UserCheck size={14} color="var(--emerald-main)" /> {row.editorName}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.videoTitle}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{row.platform}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{row.videoFormat}</div>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ 
                            display: 'inline-block',
                            background: 'rgba(16, 185, 129, 0.12)', 
                            color: 'var(--emerald-main)', 
                            padding: '0.2rem 0.6rem', 
                            borderRadius: '999px',
                            fontWeight: 800,
                            fontSize: '0.95rem'
                          }}>
                            {row.videosCount} Vids
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ 
                            display: 'inline-block',
                            background: 'rgba(2, 132, 199, 0.12)', 
                            color: '#0284C7', 
                            padding: '0.2rem 0.6rem', 
                            borderRadius: '999px',
                            fontWeight: 800,
                            fontSize: '0.95rem'
                          }}>
                            {row.hooksCount} Hooks
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${row.status === 'Ready to Launch' ? 'badge-scale' : row.status === 'In Review' ? 'badge-optimize' : 'badge-kill'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {row.driveLink ? (
                            <a 
                              href={row.driveLink} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ color: '#0284C7', display: 'inline-flex', alignItems: 'center', gap: '2px', textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem' }}
                            >
                              <FolderOpen size={15} /> Open Link
                            </a>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>-</span>
                          )}
                        </td>
                        <td style={{ fontSize: '0.8rem', maxWidth: '200px', color: 'var(--text-secondary)' }}>
                          {row.notes || '-'}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            onClick={() => onDeleteEditorReport && onDeleteEditorReport(row.id)}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                            title="លុបរបាយការណ៍នេះ"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: VIDEO ADS PERFORMANCE (MEDIA BUYER)                    */}
      {/* ============================================================== */}
      {activeSubTab === 'ads' && (
        <div>
          {/* Video KPI Stats Grid */}
          <div className="stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="glass-card stat-card">
              <div className="stat-card-header">
                <span className="stat-label">ថវិកាវីដេអូបានចាយ (Video Spend)</span>
                <div className="stat-icon-wrapper blue">
                  <Eye size={20} />
                </div>
              </div>
              <div className="stat-value" style={{ color: 'var(--text-primary)' }}>${totalVideoSpend.toFixed(2)}</div>
              <div className="stat-footer">
                <span style={{ color: 'var(--text-secondary)' }}>Views សរុប: {totalVideoViews.toLocaleString()}</span>
              </div>
            </div>

            <div className="glass-card stat-card highlight">
              <div className="stat-card-header">
                <span className="stat-label">3s Hook View Rate (មធ្យម)</span>
                <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.25)' }}>
                  <Sparkles size={20} color="var(--emerald-main)" />
                </div>
              </div>
              <div className="stat-value" style={{ color: 'var(--emerald-main)' }}>{avgHookRate}%</div>
              <div className="stat-footer">
                <span className="trend-badge positive">
                  Benchmark &gt; 35%
                </span>
                <span style={{ color: 'var(--text-muted)' }}>អត្រាឈប់ Scroll</span>
              </div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-card-header">
                <span className="stat-label">Completion Rate (មើលដល់ចប់)</span>
                <div className="stat-icon-wrapper gold">
                  <Clock size={20} />
                </div>
              </div>
              <div className="stat-value" style={{ color: 'var(--gold-accent)' }}>{avgCompletionRate}%</div>
              <div className="stat-footer">
                <span className="trend-badge neutral">
                  Benchmark &gt; 18%
                </span>
              </div>
            </div>

            <div className="glass-card stat-card">
              <div className="stat-card-header">
                <span className="stat-label">Video ROAS សរុប</span>
                <div className="stat-icon-wrapper purple">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="stat-value" style={{ color: '#8B5CF6' }}>{overallVideoROAS}x</div>
              <div className="stat-footer">
                <span className="trend-badge positive">Leads: {totalVideoLeads}</span>
                <span style={{ color: 'var(--emerald-main)', fontWeight: 600 }}>${totalVideoRevenue.toFixed(0)} Rev</span>
              </div>
            </div>
          </div>

          {/* Main Grid: 9:16 Video Creative Simulator + Form Entry */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            
            {/* Interactive 9:16 Smartphone Simulator */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Smartphone size={20} color="var(--emerald-main)" />
                  9:16 Video Ad Creative Simulator
                </h3>
                <span style={{ fontSize: '0.75rem', background: 'rgba(254, 44, 85, 0.14)', color: '#E11D48', padding: '0.2rem 0.6rem', borderRadius: 999, fontWeight: 700 }}>
                  🎵 TikTok / Reels
                </span>
              </div>

              {/* Smartphone Frame Container */}
              <div style={{ 
                maxWidth: '310px', 
                margin: '0 auto', 
                borderRadius: '32px', 
                border: '4px solid #334155', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)', 
                overflow: 'hidden', 
                position: 'relative',
                background: '#000',
                aspectRatio: '9/16'
              }}>
                {/* Background Video Mockup Image */}
                <img 
                  src="/video-creative-demo.jpg" 
                  alt="SUVÉE TikTok Video Ad" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />

                {/* Top Bar Overlay */}
                <div style={{ position: 'absolute', top: 12, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  <span>LIVE CAMPAIGN</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Volume2 size={14} /> Trending Sound
                  </span>
                </div>

                {/* Right Action Icons (Like, Comment, Share) */}
                <div style={{ position: 'absolute', right: 12, bottom: 90, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Heart size={20} color="#FE2C55" fill="#FE2C55" />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>12.8k</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageCircle size={20} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>452</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Share2 size={20} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>1.4k</span>
                  </div>
                </div>

                {/* Bottom Caption & CTA Overlay */}
                <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#34D399', marginBottom: 2 }}>
                    @suvee.official • Sponsored
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#F8FAFC', lineHeight: 1.3, marginBottom: 8 }}>
                    {selectedHookAngle.hookText}
                  </div>
                  
                  {/* Call to Action Button */}
                  <div style={{ 
                    background: 'linear-gradient(135deg, #10B981, #059669)', 
                    color: '#fff', 
                    textAlign: 'center', 
                    padding: '6px 12px', 
                    borderRadius: '8px', 
                    fontWeight: 800, 
                    fontSize: '0.8rem',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                  }}>
                    💬 ឆាតទទួល Offer បញ្ចុះតម្លៃ 30% ឥឡូវនេះ
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                💡 ក្បួន <strong>Safe Zone 9:16</strong>: មិនត្រូវដាក់អក្សរ Hook ឬ Logo នៅគែមខាងស្តាំ ឬគែមក្រោមពេកឡើយ!
              </div>
            </div>

            {/* Video Daily Report Entry Form */}
            <div className="glass-card highlight">
              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PlusCircle size={20} color="var(--emerald-main)" />
                  បញ្ចូល Daily Video Performance Report
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  កត់ត្រាលទ្ធផលវីដេអូ Ad នីមួយៗដើម្បីតាមដាន Creative Fatigue
                </p>
              </div>

              {videoSuccess && (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: 'var(--emerald-main)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  ✓ បានរក្សាទុករបាយការណ៍វីដេអូដោយជោគជ័យ!
                </div>
              )}

              <form onSubmit={handleVideoSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">កាលបរិច្ឆេទ</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      value={videoForm.date} 
                      onChange={(e) => setVideoForm({ ...videoForm, date: e.target.value })} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Platform</label>
                    <select 
                      className="form-select"
                      value={videoForm.platform}
                      onChange={(e) => setVideoForm({ ...videoForm, platform: e.target.value })}
                    >
                      <option value="TikTok Spark Ads">🎵 TikTok Spark Ads</option>
                      <option value="Facebook Reels">🔵 Facebook Reels Boost</option>
                      <option value="Instagram Reels">📸 Instagram Reels Ads</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">
                      ចំណងជើងវីដេអូ / Post ID
                      <span className="sub">ឧ. SUVÉE Serum 3s Hook Angle A</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="ឈ្មោះវីដេអូ ឬ TikTok Code..." 
                      value={videoForm.videoTitle} 
                      onChange={(e) => setVideoForm({ ...videoForm, videoTitle: e.target.value })} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">ប្រភេទ Hook (Angle)</label>
                    <select 
                      className="form-select"
                      value={videoForm.hookType}
                      onChange={(e) => setVideoForm({ ...videoForm, hookType: e.target.value })}
                    >
                      <option value="The Relatable Pain Point">The Relatable Pain Point</option>
                      <option value="The 'Stop Scrolling' Shock Factor">Stop Scrolling Shock Factor</option>
                      <option value="Satisfying ASMR & Texture">Satisfying ASMR & Texture</option>
                      <option value="7-Day Transformation">7-Day Transformation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Video Spend ($)
                      <span className="sub">ចំណាយ</span>
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-input" 
                      placeholder="0.00" 
                      value={videoForm.spend} 
                      onChange={(e) => setVideoForm({ ...videoForm, spend: e.target.value })} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Total Views</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="ឧ. 25000" 
                      value={videoForm.views} 
                      onChange={(e) => setVideoForm({ ...videoForm, views: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      3s Hook Rate (%)
                      <span className="sub">Target &gt; 35%</span>
                    </label>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="form-input" 
                      placeholder="ឧ. 38.5" 
                      value={videoForm.hookRate3s} 
                      onChange={(e) => setVideoForm({ ...videoForm, hookRate3s: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Completion Rate (%)
                      <span className="sub">មើលចប់</span>
                    </label>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="form-input" 
                      placeholder="ឧ. 21.0" 
                      value={videoForm.completionRate} 
                      onChange={(e) => setVideoForm({ ...videoForm, completionRate: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Messages / Leads</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="ឧ. 20" 
                      value={videoForm.leads} 
                      onChange={(e) => setVideoForm({ ...videoForm, leads: e.target.value })} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Revenue ($)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="form-input" 
                      placeholder="0.00" 
                      value={videoForm.revenue} 
                      onChange={(e) => setVideoForm({ ...videoForm, revenue: e.target.value })} 
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                    រក្សាទុក Video Ads Report &rarr;
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Video Performance Log Table */}
          <div className="glass-card" style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                🎬 តារាងរបាយការណ៍ Video Ads ប្រចាំថ្ងៃ (Video Daily Reports Log)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                តាមដានអត្រា Hook Rate ៣ វិនាទី និងកម្រិត Fatigue នៃវីដេអូនីមួយៗ
              </p>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>Platform</th>
                    <th>ចំណងជើងវីដេអូ & Hook Angle</th>
                    <th style={{ textAlign: 'right' }}>Spend ($)</th>
                    <th style={{ textAlign: 'center' }}>3s Hook Rate</th>
                    <th style={{ textAlign: 'center' }}>Completion</th>
                    <th style={{ textAlign: 'center' }}>Leads</th>
                    <th style={{ textAlign: 'right' }}>Cost/Lead</th>
                    <th style={{ textAlign: 'center' }}>ROAS</th>
                    <th>Fatigue Alert</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {videoReports.map((row) => (
                    <tr key={row.id}>
                      <td style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{row.date}</td>
                      <td>
                        <span className={`badge ${row.platform.includes('TikTok') ? 'badge-platform-tt' : 'badge-platform-fb'}`}>
                          {row.platform.includes('TikTok') ? '🎵 TikTok' : '🔵 Reels'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.videoTitle}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.hookType}</div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)' }}>
                        ${Number(row.spend).toFixed(2)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ 
                          fontWeight: 800, 
                          color: Number(row.hookRate3s) >= 35 ? 'var(--emerald-main)' : Number(row.hookRate3s) >= 25 ? 'var(--gold-accent)' : 'var(--danger-accent)' 
                        }}>
                          {row.hookRate3s}%
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>
                        {row.completionRate}%
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: '#0284C7' }}>
                        {row.leads}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        ${row.cpa}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 800, color: Number(row.roas) >= 3.0 ? 'var(--emerald-main)' : 'var(--danger-accent)' }}>
                        {row.roas}x
                      </td>
                      <td>
                        <span className={`badge ${row.fatigue.includes('Severe') ? 'badge-kill' : row.fatigue.includes('Moderate') ? 'badge-optimize' : 'badge-scale'}`}>
                          {row.fatigue}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          onClick={() => onDeleteVideoReport(row.id)}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                          title="លុបរបាយការណ៍នេះ"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Video SOP: 4 Proven Hook Angles & Scriptwriting Framework */}
      <div className="glass-card highlight">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={22} color="var(--emerald-main)" />
              SOP ផលិតវីដេអូ៖ ៤ ទម្រង់ Hook សំខាន់ៗ (Proven Video Hooks)
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              រូបមន្តសរសេរ Script វីដេអូ 30 វិនាទីដែលទាក់ទាញអតិថិជនឱ្យមើល និងឆាតទិញភ្លាមៗ
            </p>
          </div>

          {copiedHook && (
            <span style={{ color: 'var(--emerald-main)', fontSize: '0.85rem', fontWeight: 700 }}>
              ✓ បានចម្លង Script!
            </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          {VIDEO_HOOK_TEMPLATES.map((tmpl) => (
            <div 
              key={tmpl.id}
              onClick={() => setSelectedHookAngle(tmpl)}
              style={{
                background: selectedHookAngle.id === tmpl.id ? 'rgba(16, 185, 129, 0.08)' : 'var(--card-glass)',
                border: `1px solid ${selectedHookAngle.id === tmpl.id ? 'var(--emerald-main)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {tmpl.name}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    copyScript(`【${tmpl.name}】\n🎯 Hook:\n"${tmpl.hookText}"\n\n🎬 Structure:\n${tmpl.structure}\n\n📌 Best for:\n${tmpl.bestFor}`);
                  }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                  title="ចម្លង Script"
                >
                  <Copy size={16} />
                </button>
              </div>

              <div style={{ background: 'var(--dark-inset)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--emerald-main)', marginBottom: '0.75rem' }}>
                "{tmpl.hookText}"
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                <strong>រចនាសម្ព័ន្ធ (Structure):</strong> {tmpl.structure}
              </div>

              <div style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: 600 }}>
                ល្អបំផុតសម្រាប់: {tmpl.bestFor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
