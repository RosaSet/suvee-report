import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Flame, 
  CheckCircle2, 
  Scissors, 
  Video, 
  FileSpreadsheet, 
  ExternalLink, 
  Calendar, 
  Clock, 
  RotateCcw,
  PlusCircle,
  Eye,
  MessageSquare,
  Crown,
  UserPlus,
  FolderOpen,
  ArrowRight,
  Search,
  UserCheck,
  ShieldCheck,
  Layers,
  FileText,
  ThumbsUp,
  AlertTriangle,
  XOctagon
} from 'lucide-react';
import ScriptModal from './ScriptModal';
import ReviewFeedbackModal from './ReviewFeedbackModal';

export default function Dashboard({ 
  dailyReports = [], 
  onUpdateDailyReport,
  editorReports = [],
  onUpdateEditorReport,
  weeklyContents = [],
  onUpdateWeeklyContent,
  users = [],
  currentUser,
  stats, 
  onNavigateToReport,
  onOpenAddStaff,
  onResetDemoData,
  onClearAllData 
}) {
  const isAdmin = currentUser?.role === 'Admin';

  // Admin Active Department View: 'marketing', 'editor', 'content'
  const [selectedDept, setSelectedDept] = useState('marketing');
  const [searchQuery, setSearchQuery] = useState('');
  const [weekFilter, setWeekFilter] = useState('All');
  const [selectedScriptContent, setSelectedScriptContent] = useState(null);

  // Boss Review & Rejection Modal State
  const [reviewModalReport, setReviewModalReport] = useState(null);
  const [feedbackSuccessToast, setFeedbackSuccessToast] = useState('');

  // Staff Feed Filter
  const [feedFilter, setFeedFilter] = useState('all');

  const handleApproveReport = (reportId, reportType) => {
    if (reportType === 'editor') {
      const target = editorReports.find(r => r.id === reportId);
      if (target && onUpdateEditorReport) {
        onUpdateEditorReport({
          ...target,
          status: 'Ready to Launch',
          adminFeedback: ''
        });
      }
    } else if (reportType === 'content') {
      const target = weeklyContents.find(c => c.id === reportId);
      if (target && onUpdateWeeklyContent) {
        onUpdateWeeklyContent({
          ...target,
          status: 'Ready to Launch',
          adminFeedback: ''
        });
      }
    } else if (reportType === 'boost') {
      const target = dailyReports.find(r => r.id === reportId);
      if (target && onUpdateDailyReport) {
        onUpdateDailyReport({
          ...target,
          status: 'Scale',
          adminFeedback: ''
        });
      }
    }
    setFeedbackSuccessToast('បានអនុម័តរបាយការណ៍ជោគជ័យ! ✅');
    setTimeout(() => setFeedbackSuccessToast(''), 3000);
  };

  const handleSubmitFeedback = ({ reportId, reportType, status, adminFeedback }) => {
    if (reportType === 'editor') {
      const target = editorReports.find(r => r.id === reportId);
      if (target && onUpdateEditorReport) {
        onUpdateEditorReport({
          ...target,
          status: 'Needs Revision',
          adminFeedback: adminFeedback,
          notes: target.notes ? `${target.notes} | [Boss Feedback]: ${adminFeedback}` : `[Boss Feedback]: ${adminFeedback}`
        });
      }
    } else if (reportType === 'content') {
      const target = weeklyContents.find(c => c.id === reportId);
      if (target && onUpdateWeeklyContent) {
        onUpdateWeeklyContent({
          ...target,
          status: 'Needs Revision',
          adminFeedback: adminFeedback,
          notes: target.notes ? `${target.notes} | [Boss Feedback]: ${adminFeedback}` : `[Boss Feedback]: ${adminFeedback}`
        });
      }
    } else if (reportType === 'boost') {
      const target = dailyReports.find(r => r.id === reportId);
      if (target && onUpdateDailyReport) {
        onUpdateDailyReport({
          ...target,
          status: 'Needs Revision',
          adminFeedback: adminFeedback,
          notes: target.notes ? `${target.notes} | [Boss Feedback]: ${adminFeedback}` : `[Boss Feedback]: ${adminFeedback}`
        });
      }
    }
    setFeedbackSuccessToast('បានបញ្ជូនការសុំកែសម្រួលទៅកាន់បុគ្គលិកជោគជ័យ! 📩');
    setTimeout(() => setFeedbackSuccessToast(''), 3000);
  };

  // =========================================================
  // DEPARTMENT 1: DIGITAL MARKETING STATS & AUTHORS
  // =========================================================
  const fbReports = dailyReports.filter(r => r.platform === 'Facebook');
  const ttReports = dailyReports.filter(r => r.platform === 'TikTok');

  const fbSpend = fbReports.reduce((sum, r) => sum + Number(r.spend || 0), 0);
  const fbRevenue = fbReports.reduce((sum, r) => sum + Number(r.revenue || 0), 0);
  const fbLeads = fbReports.reduce((sum, r) => sum + Number(r.leads || 0), 0);
  const fbROAS = fbSpend > 0 ? (fbRevenue / fbSpend).toFixed(2) : '0.00';

  const ttSpend = ttReports.reduce((sum, r) => sum + Number(r.spend || 0), 0);
  const ttRevenue = ttReports.reduce((sum, r) => sum + Number(r.revenue || 0), 0);
  const ttLeads = ttReports.reduce((sum, r) => sum + Number(r.leads || 0), 0);
  const ttROAS = ttSpend > 0 ? (ttRevenue / ttSpend).toFixed(2) : '0.00';

  const marketingAuthors = Array.from(new Set(dailyReports.map(r => r.authorName).filter(Boolean)));

  // =========================================================
  // DEPARTMENT 2: VIDEO EDITOR STATS & AUTHORS
  // =========================================================
  const totalVideos = editorReports.reduce((sum, r) => sum + Number(r.videosCount || 0), 0);
  const totalHooks = editorReports.reduce((sum, r) => sum + Number(r.hooksCount || 0), 0);
  const avgHooksPerVideo = totalVideos > 0 ? (totalHooks / totalVideos).toFixed(1) : '0.0';
  const readyVideosCount = editorReports.filter(r => r.status === 'Ready to Launch').length;

  const editorAuthors = Array.from(new Set(editorReports.map(e => e.authorName || e.editorName).filter(Boolean)));

  // =========================================================
  // DEPARTMENT 3: WEEKLY CONTENT STATS & AUTHORS
  // =========================================================
  const w1Count = weeklyContents.filter(c => c.week === 'Week 1').length;
  const w2Count = weeklyContents.filter(c => c.week === 'Week 2').length;
  const w3Count = weeklyContents.filter(c => c.week === 'Week 3').length;
  const w4Count = weeklyContents.filter(c => c.week === 'Week 4').length;
  const contentAuthors = Array.from(new Set(weeklyContents.map(c => c.authorName).filter(Boolean)));

  // Filtered detailed reports for Admin
  const filteredBoostReports = dailyReports.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (r.campaignName || '').toLowerCase().includes(q) ||
           (r.authorName || '').toLowerCase().includes(q) ||
           (r.platform || '').toLowerCase().includes(q);
  });

  const filteredEditorReports = editorReports.filter(r => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (r.videoTitle || '').toLowerCase().includes(q) ||
           (r.editorName || '').toLowerCase().includes(q) ||
           (r.authorName || '').toLowerCase().includes(q);
  });

  const filteredWeeklyContents = weeklyContents.filter(c => {
    const matchWeek = weekFilter === 'All' || c.week === weekFilter;
    if (!matchWeek) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (c.title || '').toLowerCase().includes(q) ||
           (c.authorName || '').toLowerCase().includes(q) ||
           (c.contentType || '').toLowerCase().includes(q);
  });

  // Combine All Staff Submissions for Staff Live Feed
  const allSubmissions = [
    ...dailyReports.map(r => ({
      ...r,
      feedType: 'boost',
      feedTypeName: 'Boost Page & TikTok',
      feedIcon: TrendingUp,
      feedColor: '#38BDF8',
      displayTitle: r.campaignName,
      authorName: r.authorName || 'Vannak Meas',
      authorRole: r.authorRole || 'Digital Marketing',
      authorAvatar: r.authorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    })),
    ...editorReports.map(e => ({
      ...e,
      feedType: 'editor',
      feedTypeName: 'Video Editor Output',
      feedIcon: Scissors,
      feedColor: '#C084FC',
      displayTitle: e.videoTitle,
      authorName: e.authorName || e.editorName || 'Sokha Heng',
      authorRole: e.authorRole || 'Video Editor',
      authorAvatar: e.authorAvatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
    })),
    ...weeklyContents.map(c => ({
      ...c,
      feedType: 'content',
      feedTypeName: `Content ${c.week}`,
      feedIcon: Calendar,
      feedColor: '#FACC15',
      displayTitle: c.title,
      authorName: c.authorName || 'Marketing Team',
      authorRole: c.authorRole || 'Digital Marketing',
      authorAvatar: c.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredFeed = allSubmissions.filter(item => {
    if (feedFilter === 'boost') return item.feedType === 'boost';
    if (feedFilter === 'editor') return item.feedType === 'editor';
    if (feedFilter === 'content') return item.feedType === 'content';
    return true;
  });

  // =========================================================================
  // VIEW A: ADMIN / BOSS MANAGER DASHBOARD (3 CATEGORIES ONLY + ADD STAFF)
  // =========================================================================
  if (isAdmin) {
    return (
      <div className="dashboard-view" style={{ animation: 'fadeIn 0.25s ease' }}>
        
        {/* Top Executive Header */}
        <div className="section-header" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="section-title-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
              }}>
                <Crown size={22} color="#FFFFFF" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  ផ្ទាំងគ្រប់គ្រង Boss / Manager (Executive Dashboard)
                </h2>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  តាមដានរបាយការណ៍បុគ្គលិកបាន Upload លើ ៣ ផ្នែកធំៗ: 🔵 Digital Marketing, ✂️ Video Editor, 📅 Content តាម Week
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {onClearAllData && (
              <button 
                type="button"
                className="btn btn-outline" 
                onClick={onClearAllData}
                title="សម្អាតទិន្នន័យរបាយការណ៍ទាំងអស់ឱ្យទៅជាទទេ (Wipe to Empty)"
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem', color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.35)' }}
              >
                <RotateCcw size={14} />
                <span>សម្អាតទិន្នន័យ (Clear All)</span>
              </button>
            )}

            <button 
              type="button"
              className="btn" 
              onClick={onOpenAddStaff}
              style={{ 
                fontSize: '0.88rem', 
                padding: '0.55rem 1.15rem', 
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}
            >
              <UserPlus size={16} />
              <span>+ Add Staff (បន្ថែមបុគ្គលិក)</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* THE 3 CORE DEPARTMENT CARDS (CLICKABLE TO VIEW UPLOADS)         */}
        {/* ============================================================== */}
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            ជ្រើសរើសផ្នែកខាងក្រោម ដើម្បីពិនិត្យទិន្នន័យដែលបុគ្គលិកបាន Upload:
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--emerald-main)', fontWeight: 700 }}>
            * ចុចលើ Card ដើម្បីបើកមើលទិន្នន័យលម្អិត
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          
          {/* CARD 1: 🔵 DIGITAL MARKETING (BOOST PAGE & TIKTOK) */}
          <div 
            className="glass-card" 
            style={{ 
              border: selectedDept === 'marketing' ? '2px solid var(--emerald-main)' : '1px solid var(--border-color)',
              background: selectedDept === 'marketing' ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-glass)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedDept === 'marketing' ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none'
            }}
            onClick={() => setSelectedDept('marketing')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-platform-fb" style={{ marginBottom: '0.35rem' }}>
                  ផ្នែកទី ១: Paid Traffic
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  🔵 Digital Marketing (Boost Ads)
                </h3>
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.2rem 0.55rem',
                borderRadius: '8px',
                background: selectedDept === 'marketing' ? 'var(--emerald-main)' : 'rgba(255, 255, 255, 0.08)',
                color: selectedDept === 'marketing' ? '#0F172A' : 'var(--text-secondary)'
              }}>
                {selectedDept === 'marketing' ? '✓ កំពុងមើលទិន្នន័យ' : `${dailyReports.length} Reports`}
              </span>
            </div>

            {/* Staff Who Uploaded Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', background: 'var(--dark-inset)', border: '1px solid var(--border-color)', padding: '0.45rem 0.75rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>បុគ្គលិកបាន Upload:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                {marketingAuthors.length > 0 ? (
                  marketingAuthors.map((author, idx) => (
                    <span key={idx} style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <UserCheck size={13} /> {author}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>មិនទាន់មាន (រង់ចាំ Staff Upload)</span>
                )}
              </div>
            </div>

            {/* Metrics Inset Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', textAlign: 'center', background: 'var(--dark-inset)', border: '1px solid var(--border-color)', padding: '0.75rem 0.5rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Spend</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>${stats.totalSpend.toFixed(0)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Leads</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0284C7' }}>{stats.totalLeads}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Revenue</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--emerald-main)' }}>${stats.totalRevenue.toFixed(0)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>ROAS</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FACC15' }}>{stats.overallROAS.toFixed(1)}x</div>
              </div>
            </div>

            <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: selectedDept === 'marketing' ? 'var(--emerald-main)' : 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>FB: ${fbSpend.toFixed(0)} | TikTok: ${ttSpend.toFixed(0)}</span>
              <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {selectedDept === 'marketing' ? 'បង្ហាញខាងក្រោម ↓' : 'ចុចមើលទិន្នន័យ →'}
              </span>
            </div>
          </div>

          {/* CARD 2: ✂️ VIDEO EDITOR (CREATIVES & HOOKS) */}
          <div 
            className="glass-card" 
            style={{ 
              border: selectedDept === 'editor' ? '2px solid #C084FC' : '1px solid var(--border-color)',
              background: selectedDept === 'editor' ? 'rgba(192, 132, 252, 0.05)' : 'var(--bg-glass)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedDept === 'editor' ? '0 0 20px rgba(192, 132, 252, 0.2)' : 'none'
            }}
            onClick={() => setSelectedDept('editor')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-scale" style={{ marginBottom: '0.35rem' }}>
                  ផ្នែកទី ២: Video Production
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  ✂️ Video Editor (កាត់ត & Hook)
                </h3>
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.2rem 0.55rem',
                borderRadius: '8px',
                background: selectedDept === 'editor' ? '#C084FC' : 'rgba(255, 255, 255, 0.08)',
                color: selectedDept === 'editor' ? '#0F172A' : 'var(--text-secondary)'
              }}>
                {selectedDept === 'editor' ? '✓ កំពុងមើលទិន្នន័យ' : `${editorReports.length} Reports`}
              </span>
            </div>

            {/* Staff Who Uploaded Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', background: 'var(--dark-inset)', border: '1px solid var(--border-color)', padding: '0.45rem 0.75rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>បុគ្គលិកបាន Upload:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                {editorAuthors.length > 0 ? (
                  editorAuthors.map((author, idx) => (
                    <span key={idx} style={{ fontSize: '0.78rem', fontWeight: 700, color: '#C084FC', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Scissors size={13} /> {author}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>មិនទាន់មាន (រង់ចាំ Staff Upload)</span>
                )}
              </div>
            </div>

            {/* Metrics Inset Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', textAlign: 'center', background: 'var(--dark-inset)', border: '1px solid var(--border-color)', padding: '0.75rem 0.5rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>វីដេអូកាត់រួច</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#C084FC' }}>{totalVideos} Vids</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Hooks សរុប</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FACC15' }}>{totalHooks}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Hook/Vid</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--emerald-main)' }}>{avgHooksPerVideo}x</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Launch Ready</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#38BDF8' }}>{readyVideosCount}</div>
              </div>
            </div>

            <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: selectedDept === 'editor' ? '#C084FC' : 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Format: 9:16 Vertical HD</span>
              <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {selectedDept === 'editor' ? 'បង្ហាញខាងក្រោម ↓' : 'ចុចមើលទិន្នន័យ →'}
              </span>
            </div>
          </div>

          {/* CARD 3: 📅 CONTENT តាម WEEK (WEEKLY CONTENT) */}
          <div 
            className="glass-card" 
            style={{ 
              border: selectedDept === 'content' ? '2px solid #FACC15' : '1px solid var(--border-color)',
              background: selectedDept === 'content' ? 'rgba(250, 204, 21, 0.05)' : 'var(--bg-glass)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedDept === 'content' ? '0 0 20px rgba(250, 204, 21, 0.2)' : 'none'
            }}
            onClick={() => setSelectedDept('content')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-platform-fb" style={{ marginBottom: '0.35rem', background: 'rgba(250, 204, 21, 0.15)', color: '#FACC15', borderColor: 'rgba(250, 204, 21, 0.3)' }}>
                  ផ្នែកទី ៣: Content Schedule
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  📅 Content តាម Week (Uploads)
                </h3>
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.2rem 0.55rem',
                borderRadius: '8px',
                background: selectedDept === 'content' ? '#FACC15' : 'rgba(255, 255, 255, 0.08)',
                color: selectedDept === 'content' ? '#0F172A' : 'var(--text-secondary)'
              }}>
                {selectedDept === 'content' ? '✓ កំពុងមើលទិន្នន័យ' : `${weeklyContents.length} Contents`}
              </span>
            </div>

            {/* Staff Who Uploaded Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', background: 'var(--dark-inset)', border: '1px solid var(--border-color)', padding: '0.45rem 0.75rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>បុគ្គលិកបាន Upload:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                {contentAuthors.length > 0 ? (
                  contentAuthors.map((author, idx) => (
                    <span key={idx} style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FACC15', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Calendar size={13} /> {author}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>មិនទាន់មាន (រង់ចាំ Staff Upload)</span>
                )}
              </div>
            </div>

            {/* Metrics Inset Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', textAlign: 'center', background: 'var(--dark-inset)', border: '1px solid var(--border-color)', padding: '0.75rem 0.5rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>W1 (01-07)</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#38BDF8' }}>{w1Count}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>W2 (08-14)</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--emerald-main)' }}>{w2Count}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>W3 (15-21)</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FACC15' }}>{w3Count}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>W4 (22-31)</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#C084FC' }}>{w4Count}</div>
              </div>
            </div>

            <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: selectedDept === 'content' ? '#FACC15' : 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>សរុបខែនេះ: {weeklyContents.length} Contents</span>
              <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {selectedDept === 'content' ? 'បង្ហាញខាងក្រោម ↓' : 'ចុចមើលទិន្នន័យ →'}
              </span>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE DETAILED DATA VIEW FOR SELECTED DEPARTMENT          */}
        {/* ============================================================== */}
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedDept === 'marketing' && '🔵 របាយការណ៍ Digital Marketing (Boost Page & TikTok) ដែលបុគ្គលិកបាន Upload'}
                {selectedDept === 'editor' && '✂️ របាយការណ៍ Video Editor (វីដេអូ & Hook) ដែលបុគ្គលិកបាន Upload'}
                {selectedDept === 'content' && '📅 តារាង Content តាម Week ដែលបុគ្គលិកបាន Upload (Weekly Content)'}
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {selectedDept === 'marketing' && 'ពិនិត្យឈ្មោះបុគ្គលិក, ថវិកាចំណាយ, Leads, Revenue, ROAS និង Link Boost'}
                {selectedDept === 'editor' && 'ពិនិត្យឈ្មោះ Video Editor, ចំនួនកាត់បាន, ចំនួន Hooks និង Google Drive Link'}
                {selectedDept === 'content' && 'ពិនិត្យផែនការ និងការ Upload ជាក់ស្តែងតាម Week 1, 2, 3, 4 ជាមួយ Drive និង Live Links'}
              </p>
            </div>

            {/* Search Input */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {selectedDept === 'content' && (
                <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--dark-inset)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  {['All', 'Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => (
                    <button
                      key={w}
                      type="button"
                      className={`btn ${weekFilter === w ? 'btn-primary' : 'btn-outline'}`}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', border: 'none' }}
                      onClick={() => setWeekFilter(w)}
                    >
                      {w === 'All' ? 'គ្រប់ Week' : w}
                    </button>
                  ))}
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="ស្វែងរកតាមឈ្មោះបុគ្គលិក ឬចំណងជើង..." 
                  className="form-input" 
                  style={{ paddingLeft: '2rem', width: '220px', fontSize: '0.82rem' }} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <Search size={14} style={{ position: 'absolute', left: 10, top: 12, color: 'var(--text-muted)' }} />
              </div>
            </div>
          </div>

          {/* TABLE 1: DIGITAL MARKETING DETAILS */}
          {selectedDept === 'marketing' && (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Staff អ្នក Upload</th>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>Platform & Campaign</th>
                    <th>គោលដៅ Boost</th>
                    <th style={{ textAlign: 'right' }}>Spend</th>
                    <th style={{ textAlign: 'right' }}>Leads/Views</th>
                    <th style={{ textAlign: 'right' }}>Revenue</th>
                    <th style={{ textAlign: 'center' }}>ROAS</th>
                    <th style={{ textAlign: 'center' }}>Link Boost</th>
                    <th style={{ textAlign: 'center' }}>Status SOP</th>
                    {isAdmin && <th style={{ textAlign: 'center' }}>ការអនុម័ត (Boss Actions)</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredBoostReports.length === 0 ? (
                    <tr>
                      <td colSpan={isAdmin ? "11" : "10"} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '1.6rem' }}>📊</span>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>មិនទាន់មានទិន្នន័យ Digital Marketing Report នៅឡើយទេ</span>
                          <span style={{ fontSize: '0.78rem' }}>រង់ចាំ Staff ផ្នែក Marketing បញ្ចូលទិន្នន័យ Boost</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredBoostReports.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img 
                              src={row.authorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'} 
                              alt={row.authorName} 
                              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                {row.authorName || 'Vannak Meas'}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#38BDF8' }}>
                                {row.authorRole || 'Digital Marketing'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                          <div>{row.startBoost || row.date}</div>
                          {row.endBoost && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>➔ {row.endBoost}</div>}
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.campaignName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.platform}</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {row.objective || 'Sale (Messages)'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--text-primary)' }}>
                          ${Number(row.spend || 0).toFixed(2)}
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: '#0284C7' }}>
                          {Number(row.leads || 0).toLocaleString()}
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--emerald-main)' }}>
                          ${Number(row.revenue || 0).toFixed(2)}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ fontWeight: 800, color: '#FACC15' }}>
                            {row.spend > 0 ? (row.revenue / row.spend).toFixed(1) : '0'}x
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {row.boostLink ? (
                            <a 
                              href={row.boostLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="btn btn-outline"
                              style={{ padding: '0.2rem 0.55rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              <ExternalLink size={12} /> Link
                            </a>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>-</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {row.status === 'Needs Revision' ? (
                            <div>
                              <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                ⚠️ ត្រូវកែសម្រួល
                              </span>
                              {row.adminFeedback && (
                                <div style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: '2px', fontWeight: 600 }}>
                                  💬 {row.adminFeedback}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className={`badge ${row.status === 'Scale' ? 'badge-scale' : row.status === 'Optimize' ? 'badge-optimize' : 'badge-kill'}`}>
                              {row.status}
                            </span>
                          )}
                        </td>
                        {isAdmin && (
                          <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', gap: '4px' }}>
                              <button
                                type="button"
                                onClick={() => handleApproveReport(row.id, 'boost')}
                                title="អនុម័ត (Approve)"
                                style={{
                                  padding: '0.22rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  background: 'rgba(16, 185, 129, 0.15)',
                                  color: 'var(--emerald-main)',
                                  border: '1px solid rgba(16, 185, 129, 0.4)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px'
                                }}
                              >
                                <CheckCircle2 size={13} />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setReviewModalReport({
                                  id: row.id,
                                  type: 'boost',
                                  title: row.campaignName,
                                  authorName: row.authorName,
                                  date: row.date
                                })}
                                title="សុំឱ្យកែសម្រួល (Reject / Request Revision)"
                                style={{
                                  padding: '0.22rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  background: 'rgba(239, 68, 68, 0.12)',
                                  color: '#EF4444',
                                  border: '1px solid rgba(239, 68, 68, 0.35)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px'
                                }}
                              >
                                <AlertTriangle size={13} />
                                <span>Reject (សុំកែ)</span>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TABLE 2: VIDEO EDITOR DETAILS */}
          {selectedDept === 'editor' && (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Staff អ្នក Upload (Editor)</th>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>ប្រធានបទវីដេអូ (Title)</th>
                    <th>Platform & Format</th>
                    <th style={{ textAlign: 'center' }}>ចំនួនកាត់បាន</th>
                    <th style={{ textAlign: 'center' }}>ចំនួន Hooks</th>
                    <th>ស្ថានភាព</th>
                    <th style={{ textAlign: 'center' }}>Drive Link</th>
                    <th>សម្គាល់ (Notes)</th>
                    {isAdmin && <th style={{ textAlign: 'center' }}>ការអនុម័ត (Boss Actions)</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredEditorReports.length === 0 ? (
                    <tr>
                      <td colSpan={isAdmin ? "10" : "9"} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '1.6rem' }}>✂️</span>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>មិនទាន់មានទិន្នន័យ Video Editor នៅឡើយទេ</span>
                          <span style={{ fontSize: '0.78rem' }}>រង់ចាំ Editor បញ្ចូលរបាយការណ៍កាត់តវីដេអូ</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredEditorReports.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img 
                              src={row.authorAvatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'} 
                              alt={row.editorName || row.authorName} 
                              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                {row.authorName || row.editorName || 'Sokha Heng'}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#C084FC' }}>
                                {row.authorRole || 'Video Editor'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{row.date}</td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.videoTitle}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{row.platform}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{row.videoFormat || '9:16 Vertical'}</div>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ 
                            background: 'rgba(168, 85, 247, 0.15)', 
                            color: '#C084FC', 
                            padding: '0.2rem 0.6rem', 
                            borderRadius: '999px',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                          }}>
                            {row.videosCount} Vids
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ 
                            background: 'rgba(2, 132, 199, 0.15)', 
                            color: '#0284C7', 
                            padding: '0.2rem 0.6rem', 
                            borderRadius: '999px',
                            fontWeight: 800,
                            fontSize: '0.9rem'
                          }}>
                            {row.hooksCount} Hooks
                          </span>
                        </td>
                        <td>
                          {row.status === 'Needs Revision' ? (
                            <div>
                              <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                ⚠️ ត្រូវកែសម្រួល
                              </span>
                              {row.adminFeedback && (
                                <div style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: '2px', fontWeight: 600 }}>
                                  💬 {row.adminFeedback}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className={`badge ${row.status === 'Ready to Launch' ? 'badge-scale' : 'badge-optimize'}`}>
                              {row.status}
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {row.driveLink ? (
                            <a 
                              href={row.driveLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="btn btn-outline"
                              style={{ padding: '0.2rem 0.55rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              <FolderOpen size={12} color="#0284C7" /> Drive
                            </a>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>-</span>
                          )}
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '200px' }}>
                          {row.notes || '-'}
                        </td>
                        {isAdmin && (
                          <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', gap: '4px' }}>
                              <button
                                type="button"
                                onClick={() => handleApproveReport(row.id, 'editor')}
                                title="អនុម័ត (Approve)"
                                style={{
                                  padding: '0.22rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  background: 'rgba(16, 185, 129, 0.15)',
                                  color: 'var(--emerald-main)',
                                  border: '1px solid rgba(16, 185, 129, 0.4)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px'
                                }}
                              >
                                <CheckCircle2 size={13} />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setReviewModalReport({
                                  id: row.id,
                                  type: 'editor',
                                  title: row.videoTitle,
                                  authorName: row.authorName || row.editorName,
                                  date: row.date
                                })}
                                title="សុំឱ្យកែសម្រួល (Reject / Request Revision)"
                                style={{
                                  padding: '0.22rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  background: 'rgba(239, 68, 68, 0.12)',
                                  color: '#EF4444',
                                  border: '1px solid rgba(239, 68, 68, 0.35)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px'
                                }}
                              >
                                <AlertTriangle size={13} />
                                <span>Reject (សុំកែ)</span>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TABLE 3: CONTENT តាម WEEK DETAILS */}
          {selectedDept === 'content' && (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Staff អ្នក Upload</th>
                    <th style={{ width: '100px' }}>សប្តាហ៍</th>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>ប្រធានបទ Content (Title / Hook)</th>
                    <th>ទម្រង់ & Platform</th>
                    <th>ស្ថានភាព</th>
                    <th style={{ textAlign: 'center' }}>ឯកសារ Script (PC)</th>
                    <th style={{ textAlign: 'center' }}>Drive & Post Link</th>
                    <th>សម្គាល់ (Notes)</th>
                    {isAdmin && <th style={{ textAlign: 'center' }}>ការអនុម័ត (Boss Actions)</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredWeeklyContents.length === 0 ? (
                    <tr>
                      <td colSpan={isAdmin ? "10" : "9"} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '1.6rem' }}>📅</span>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>មិនទាន់មានទិន្នន័យ Weekly Content នៅឡើយទេ</span>
                          <span style={{ fontSize: '0.78rem' }}>រង់ចាំ Staff បញ្ចូលមាតិកា Content ប្រចាំសប្តាហ៍</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredWeeklyContents.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img 
                              src={row.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} 
                              alt={row.authorName} 
                              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                {row.authorName}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#FACC15' }}>
                                {row.authorRole}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            background: row.week === 'Week 1' ? 'rgba(56, 189, 248, 0.15)' :
                                        row.week === 'Week 2' ? 'rgba(16, 185, 129, 0.15)' :
                                        row.week === 'Week 3' ? 'rgba(250, 204, 21, 0.15)' : 'rgba(192, 132, 252, 0.15)',
                            color: row.week === 'Week 1' ? '#38BDF8' :
                                   row.week === 'Week 2' ? 'var(--emerald-main)' :
                                   row.week === 'Week 3' ? '#FACC15' : '#C084FC',
                            border: '1px solid currentColor'
                          }}>
                            {row.week}
                          </span>
                        </td>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{row.date}</td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.title}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{row.contentType}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{row.platform}</div>
                        </td>
                        <td>
                          {row.status === 'Needs Revision' ? (
                            <div>
                              <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                ⚠️ ត្រូវកែសម្រួល
                              </span>
                              {row.adminFeedback && (
                                <div style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: '2px', fontWeight: 600 }}>
                                  💬 {row.adminFeedback}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className={`badge ${row.status === 'Published' || row.status === 'Ready to Launch' ? 'badge-scale' : 'badge-optimize'}`}>
                              {row.status}
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {row.scriptFileName || row.scriptText ? (
                            <button
                              type="button"
                              onClick={() => setSelectedScriptContent(row)}
                              className="btn btn-outline"
                              style={{
                                padding: '0.22rem 0.55rem',
                                fontSize: '0.74rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                borderColor: 'rgba(16, 185, 129, 0.4)',
                                color: 'var(--emerald-main)',
                                background: 'rgba(16, 185, 129, 0.08)'
                              }}
                              title="មើល Script & Download File"
                            >
                              <FileText size={12} />
                              <span>{row.scriptFileName ? (row.scriptFileName.length > 15 ? row.scriptFileName.slice(0, 13) + '...' : row.scriptFileName) : 'Script'}</span>
                            </button>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>-</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                            {row.driveLink ? (
                              <a 
                                href={row.driveLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="btn btn-outline"
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                              >
                                <FolderOpen size={12} color="#0284C7" /> Drive
                              </a>
                            ) : null}
                            {row.boostLink ? (
                              <a 
                                href={row.boostLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="btn btn-outline"
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                              >
                                <ExternalLink size={12} color="var(--emerald-main)" /> Post
                              </a>
                            ) : null}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '180px' }}>
                          {row.notes || '-'}
                        </td>
                        {isAdmin && (
                          <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', gap: '4px' }}>
                              <button
                                type="button"
                                onClick={() => handleApproveReport(row.id, 'content')}
                                title="អនុម័ត (Approve)"
                                style={{
                                  padding: '0.22rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  background: 'rgba(16, 185, 129, 0.15)',
                                  color: 'var(--emerald-main)',
                                  border: '1px solid rgba(16, 185, 129, 0.4)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px'
                                }}
                              >
                                <CheckCircle2 size={13} />
                                <span>Approve</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setReviewModalReport({
                                  id: row.id,
                                  type: 'content',
                                  title: row.title,
                                  authorName: row.authorName,
                                  date: row.date
                                })}
                                title="សុំឱ្យកែសម្រួល (Reject / Request Revision)"
                                style={{
                                  padding: '0.22rem 0.5rem',
                                  borderRadius: '6px',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  background: 'rgba(239, 68, 68, 0.12)',
                                  color: '#EF4444',
                                  border: '1px solid rgba(239, 68, 68, 0.35)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px'
                                }}
                              >
                                <AlertTriangle size={13} />
                                <span>Reject (សុំកែ)</span>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* ============================================================== */}
        {/* STAFF DIRECTORY QUICK SECTION (WITH ADD STAFF)                  */}
        {/* ============================================================== */}
        <div className="card-box" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="#F59E0B" />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ក្រុមការងារបុគ្គលិក SUVÉE (Staff Management)
              </h3>
            </div>

            <button 
              type="button"
              className="btn btn-primary" 
              onClick={onOpenAddStaff}
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}
            >
              <UserPlus size={14} />
              <span>+ Add Staff ថ្មី</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {users.map(u => (
              <div 
                key={u.id}
                style={{ 
                  background: 'var(--dark-inset)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '12px', 
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}
              >
                <img 
                  src={u.avatar} 
                  alt={u.name} 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{u.name}</span>
                    <span style={{ 
                      fontSize: '0.68rem', 
                      fontWeight: 700, 
                      padding: '1px 6px', 
                      borderRadius: '6px',
                      background: u.role === 'Admin' ? 'rgba(245, 158, 11, 0.15)' : u.role === 'Digital Marketing' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(192, 132, 252, 0.15)',
                      color: u.role === 'Admin' ? '#F59E0B' : u.role === 'Digital Marketing' ? '#38BDF8' : '#C084FC'
                    }}>
                      {u.role}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Login: <strong>@{u.username}</strong> • ចាប់ផ្តើម: {u.startDate || '2025-01-01'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW B: STAFF ROLE DASHBOARD (PERSONAL GREETING + UPLOAD CTAs + FEED)
  // =========================================================================
  return (
    <div className="dashboard-view" style={{ animation: 'fadeIn 0.25s ease' }}>
      
      {/* Top Welcome & Control Header */}
      <div className="section-header" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="section-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'} 
              alt={currentUser?.name} 
              style={{ width: '42px', height: '42px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--emerald-main)' }}
            />
            <div>
              <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                សួស្តី, {currentUser?.name || 'Staff Member'}! 👋
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                តួនាទី: <strong style={{ color: 'var(--emerald-main)' }}>{currentUser?.role}</strong> • រួចរាល់ក្នុងការ Upload របាយការណ៍ និង Content ថ្ងៃនេះ
              </p>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={onNavigateToReport}
          style={{ fontSize: '0.88rem', padding: '0.55rem 1.15rem' }}
        >
          <PlusCircle size={16} />
          <span>+ បញ្ចូលទិន្នន័យ (Upload Report)</span>
        </button>
      </div>

      {/* 3 Quick Action Cards for Staff */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        {/* CTA 1: Boost Page & TikTok */}
        <div 
          className="glass-card" 
          style={{ cursor: 'pointer', padding: '1.25rem', border: '1px solid var(--border-color)' }}
          onClick={onNavigateToReport}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
              <TrendingUp size={18} />
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>🔵 Boost Page & TikTok</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Paid Traffic & Ads Spend</div>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.85rem 0' }}>
            បញ្ចូលទិន្នន័យ Boost ថ្មី, Spend, Leads, Sales និង Milestone តាមថ្ងៃ
          </p>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ចុចទៅបញ្ចូលទិន្នន័យ &rarr;
          </span>
        </div>

        {/* CTA 2: Video Editor */}
        <div 
          className="glass-card" 
          style={{ cursor: 'pointer', padding: '1.25rem', border: '1px solid var(--border-color)' }}
          onClick={onNavigateToReport}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(192, 132, 252, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C084FC' }}>
              <Scissors size={18} />
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>✂️ Video Editor</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Videos Cut & Hook Testing</div>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.85rem 0' }}>
            កត់ត្រាចំនួនវីដេអូកាត់បាន, ចំនួន Hooks និងដាក់ Google Drive Link
          </p>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C084FC', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ចុចទៅបញ្ចូលទិន្នន័យ &rarr;
          </span>
        </div>

        {/* CTA 3: Upload Content តាម Week */}
        <div 
          className="glass-card" 
          style={{ cursor: 'pointer', padding: '1.25rem', border: '1px solid var(--border-color)' }}
          onClick={onNavigateToReport}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(250, 204, 21, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FACC15' }}>
              <Calendar size={18} />
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>📅 Upload Content តាម Week</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Week 1, Week 2, Week 3, Week 4</div>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.85rem 0' }}>
            Upload Content តាមសប្តាហ៍នីមួយៗ (Video 9:16, Banner, Carousel, UGC)
          </p>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FACC15', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ចុចទៅបញ្ចូលទិន្នន័យ &rarr;
          </span>
        </div>

      </div>

      {/* Live Staff Activity Feed */}
      <div className="card-box" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--emerald-main)' }}>
                <Layers size={18} />
              </span>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                រាល់ទិន្នន័យដែល Staff បាន Upload (Live Activity Feed)
              </h3>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              កត់ត្រារាល់របាយការណ៍ដែលក្រុមការងារបាន Upload ចូលប្រព័ន្ធ
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-glass)', padding: '0.35rem', borderRadius: '10px', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn ${feedFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', border: 'none' }}
              onClick={() => setFeedFilter('all')}
            >
              ទាំងអស់ ({allSubmissions.length})
            </button>
            <button
              type="button"
              className={`btn ${feedFilter === 'boost' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', border: 'none' }}
              onClick={() => setFeedFilter('boost')}
            >
              🔵 Boost Ads ({dailyReports.length})
            </button>
            <button
              type="button"
              className={`btn ${feedFilter === 'editor' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', border: 'none' }}
              onClick={() => setFeedFilter('editor')}
            >
              ✂️ Video Editor ({editorReports.length})
            </button>
            <button
              type="button"
              className={`btn ${feedFilter === 'content' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', border: 'none' }}
              onClick={() => setFeedFilter('content')}
            >
              📅 Content តាម Week ({weeklyContents.length})
            </button>
          </div>
        </div>

        {/* Feed List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFeed.map((item) => {
            const IconComponent = item.feedIcon;
            const isBoost = item.feedType === 'boost';
            const isContent = item.feedType === 'content';

            return (
              <div 
                key={item.id}
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img 
                      src={item.authorAvatar} 
                      alt={item.authorName} 
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${item.feedColor}` }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                          {item.authorName}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '0.1rem 0.5rem',
                          borderRadius: '10px',
                          background: `${item.feedColor}20`,
                          color: item.feedColor,
                          fontWeight: 700,
                          border: `1px solid ${item.feedColor}40`
                        }}>
                          {item.authorRole}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        កាលបរិច្ឆេទ: <strong>{item.date}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)'
                    }}>
                      <IconComponent size={14} color={item.feedColor} />
                      <span>{item.feedTypeName}</span>
                    </span>

                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '8px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#34D399',
                      fontWeight: 600,
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <CheckCircle2 size={13} />
                      <span>បានកត់ត្រា</span>
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1.4fr) minmax(220px, 2fr) auto', gap: '1.25rem', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {item.displayTitle}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {isContent ? (
                        <>
                          សប្តាហ៍: <strong style={{ color: '#FACC15' }}>{item.week}</strong> • ទម្រង់: <strong style={{ color: 'var(--text-secondary)' }}>{item.contentType}</strong>
                        </>
                      ) : (
                        <>
                          Platform: <strong style={{ color: 'var(--text-secondary)' }}>{item.platform}</strong>
                          {!isBoost && (
                            <span style={{ marginLeft: '0.5rem', color: '#C084FC' }}>
                              • Format: {item.videoFormat || '9:16'}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isBoost ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    background: 'var(--dark-inset)',
                    border: '1px solid var(--border-color)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px'
                  }}>
                    {isBoost ? (
                      <>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Spend</div>
                          <div style={{ fontWeight: 800, color: '#FACC15', fontSize: '0.95rem' }}>${Number(item.spend || 0).toFixed(2)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Leads</div>
                          <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '0.95rem' }}>{Number(item.leads || 0).toLocaleString()}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Revenue</div>
                          <div style={{ fontWeight: 800, color: 'var(--emerald-main)', fontSize: '0.95rem' }}>${Number(item.revenue || 0).toFixed(2)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ROAS</div>
                          <div style={{ fontWeight: 800, color: '#F472B6', fontSize: '0.95rem' }}>{item.spend > 0 ? (item.revenue / item.spend).toFixed(1) : '0'}x</div>
                        </div>
                      </>
                    ) : isContent ? (
                      <>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>សប្តាហ៍</div>
                          <div style={{ fontWeight: 800, color: '#FACC15', fontSize: '0.95rem' }}>{item.week}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Platform</div>
                          <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '0.95rem' }}>{item.platform}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ស្ថានភាព</div>
                          <div style={{ fontWeight: 700, color: item.status === 'Needs Revision' ? '#EF4444' : 'var(--emerald-main)', fontSize: '0.82rem' }}>
                            {item.status === 'Needs Revision' ? '⚠️ ត្រូវកែសម្រួល' : item.status}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ចំនួនកាត់បាន</div>
                          <div style={{ fontWeight: 800, color: '#C084FC', fontSize: '0.95rem' }}>{item.videosCount || 1} Vids</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ចំនួន Hooks</div>
                          <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '0.95rem' }}>{item.hooksCount || 1} Hooks</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ស្ថានភាព</div>
                          <div style={{ fontWeight: 700, color: item.status === 'Needs Revision' ? '#EF4444' : 'var(--emerald-main)', fontSize: '0.82rem' }}>
                            {item.status === 'Needs Revision' ? '⚠️ ត្រូវកែសម្រួល' : (item.status || 'Ready to Launch')}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {item.status === 'Needs Revision' && item.adminFeedback && (
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.4rem 0.65rem',
                      borderRadius: '6px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      💬 <strong>Boss Feedback:</strong> {item.adminFeedback}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end', marginTop: '0.5rem' }}>
                    {isAdmin && (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={() => handleApproveReport(item.id, isContent ? 'content' : isBoost ? 'boost' : 'editor')}
                          style={{
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.72rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: 'var(--emerald-main)',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}
                        >
                          <CheckCircle2 size={12} />
                          <span>Approve</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setReviewModalReport({
                            id: item.id,
                            type: isContent ? 'content' : isBoost ? 'boost' : 'editor',
                            title: item.title || item.campaignName || item.videoTitle,
                            authorName: item.authorName || item.editorName,
                            date: item.date
                          })}
                          style={{
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.72rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            background: 'rgba(239, 68, 68, 0.12)',
                            color: '#EF4444',
                            border: '1px solid rgba(239, 68, 68, 0.35)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}
                        >
                          <AlertTriangle size={12} />
                          <span>Reject (សុំកែ)</span>
                        </button>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      {isContent && (item.scriptFileName || item.scriptText) && (
                        <button
                          type="button"
                          onClick={() => setSelectedScriptContent(item)}
                          className="btn btn-outline"
                          style={{
                            fontSize: '0.74rem',
                            padding: '0.3rem 0.65rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            borderColor: 'rgba(16, 185, 129, 0.4)',
                            color: 'var(--emerald-main)',
                            background: 'rgba(16, 185, 129, 0.08)'
                          }}
                          title="មើល Script & Download"
                        >
                          <FileText size={12} />
                          <span>{item.scriptFileName ? (item.scriptFileName.length > 14 ? item.scriptFileName.slice(0, 12) + '...' : item.scriptFileName) : 'Script (PC)'}</span>
                        </button>
                      )}
                      {(item.boostLink || item.driveLink) && (
                        <a 
                          href={item.boostLink || item.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                          <ExternalLink size={13} />
                          <span>{isContent ? 'Link Content' : isBoost ? 'Link Boost' : 'Drive វីដេអូ'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SCRIPT PREVIEW & DOWNLOAD MODAL */}
      <ScriptModal
        isOpen={!!selectedScriptContent}
        onClose={() => setSelectedScriptContent(null)}
        content={selectedScriptContent}
      />

      {/* REVIEW & FEEDBACK MODAL (BOSS REJECT / APPROVE) */}
      <ReviewFeedbackModal
        isOpen={!!reviewModalReport}
        onClose={() => setReviewModalReport(null)}
        report={reviewModalReport}
        onSubmitFeedback={handleSubmitFeedback}
        onApproveReport={handleApproveReport}
      />

      {/* TOAST NOTIFICATION */}
      {feedbackSuccessToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(15, 23, 42, 0.95)',
          color: '#10B981',
          border: '1px solid #10B981',
          padding: '0.85rem 1.25rem',
          borderRadius: '10px',
          fontSize: '0.88rem',
          fontWeight: 700,
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(8px)'
        }}>
          {feedbackSuccessToast}
        </div>
      )}

    </div>
  );
}
