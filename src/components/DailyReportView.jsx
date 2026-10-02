import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Trash2, 
  FileSpreadsheet, 
  CheckCircle2, 
  DollarSign,
  Eye,
  MessageSquare,
  TrendingUp,
  Sparkles,
  Scissors,
  Calendar,
  Link as LinkIcon,
  X,
  ExternalLink,
  Plus,
  Layers,
  ArrowRight,
  Clock,
  UserCheck,
  FolderOpen
} from 'lucide-react';
import WeeklyContentModal from './WeeklyContentModal';
import ScriptModal from './ScriptModal';

export default function DailyReportView({ 
  dailyReports = [], 
  onAddReport, 
  onDeleteReport,
  editorReports = [],
  onAddEditorReport,
  onDeleteEditorReport,
  weeklyContents = [],
  onAddWeeklyContent,
  onDeleteWeeklyContent,
  currentUser
}) {
  // Active Column View: 'boost', 'editor', 'content'
  const [activeColumn, setActiveColumn] = useState('boost');

  // Modal Visibility States
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [selectedProgressionReport, setSelectedProgressionReport] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [selectedWeekFilter, setSelectedWeekFilter] = useState('All');
  const [contentTypeFilter, setContentTypeFilter] = useState('All');

  const todayStr = new Date().toISOString().split('T')[0];
  const isAdmin = currentUser?.role === 'Admin';

  // Helper to determine if an entry belongs to the current user
  const isMine = (item) => {
    if (!currentUser) return false;
    if (!item) return false;
    
    // Direct authorId match
    if (item.authorId && currentUser.id && item.authorId === currentUser.id) return true;
    
    const curName = (currentUser.name || '').toLowerCase().trim();
    const curUsername = (currentUser.username || '').toLowerCase().trim();
    
    const authorName = (item.authorName || '').toLowerCase().trim();
    const editorName = (item.editorName || '').toLowerCase().trim();

    if (curName && (authorName === curName || authorName.includes(curName) || curName.includes(authorName))) return true;
    if (curUsername && (authorName === curUsername || authorName.includes(curUsername))) return true;
    if (curName && (editorName === curName || editorName.includes(curName) || curName.includes(editorName))) return true;
    if (curUsername && (editorName === curUsername || editorName.includes(curUsername))) return true;

    return false;
  };

  // Staff sees ONLY their own data. Admin sees all.
  const myDailyReports = isAdmin ? (dailyReports || []) : (dailyReports || []).filter(isMine);
  const myEditorReports = isAdmin ? (editorReports || []) : (editorReports || []).filter(isMine);
  const myWeeklyContents = isAdmin ? (weeklyContents || []) : (weeklyContents || []).filter(isMine);

  // Weekly content counters
  const week1Count = myWeeklyContents.filter(c => c && c.week === 'Week 1').length;
  const week2Count = myWeeklyContents.filter(c => c && c.week === 'Week 2').length;
  const week3Count = myWeeklyContents.filter(c => c && c.week === 'Week 3').length;
  const week4Count = myWeeklyContents.filter(c => c && c.week === 'Week 4').length;

  // =========================================================
  // 1. BOOST PAGE & TIKTOK FORM STATE (POP-UP MODAL 1)
  // =========================================================
  const [boostForm, setBoostForm] = useState({
    platform: 'Facebook',
    campaignName: '',
    boostLink: '',
    startBoost: todayStr,
    endBoost: todayStr,
    boostObjective: 'Sale (Get Messages)', // 'Video Views' or 'Sale (Get Messages)'
    totalSpend: '',
    salesClosed: '',
    revenue: '',
    notes: '',
    status: 'Scale',
    // Milestone day progression: Day 1, Day 2, Day 3...
    dailyMilestones: [
      { day: 1, spend: '', results: '', sales: '', note: 'ថ្ងៃទី ១: ចាប់ផ្តើម Test' },
      { day: 2, spend: '', results: '', sales: '', note: '' }
    ]
  });

  // =========================================================
  // 2. VIDEO EDITOR FORM STATE (POP-UP MODAL 2)
  // =========================================================
  const [editorForm, setEditorForm] = useState({
    date: todayStr,
    editorName: currentUser?.name || 'Video Editor',
    videoTitle: '',
    platform: 'TikTok & Reels',
    videosCount: 2,
    hooksCount: 6,
    videoFormat: '9:16 Vertical (1080p)',
    driveLink: '',
    status: 'Ready to Launch',
    notes: ''
  });

  const handleOpenEditorModal = () => {
    setEditorForm(prev => ({
      ...prev,
      editorName: currentUser?.name || prev.editorName || 'Video Editor'
    }));
    setShowEditorModal(true);
  };

  // Helper: Calculate week number or weekly total
  const getWeeklyStats = (reports) => {
    // Current week calculation (last 7 days or current ISO week)
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekReports = reports.filter(r => {
      const rDate = new Date(r.date);
      return rDate >= oneWeekAgo && rDate <= now;
    });

    const weeklyVideos = weekReports.reduce((sum, r) => sum + Number(r.videosCount || 0), 0);
    const weeklyHooks = weekReports.reduce((sum, r) => sum + Number(r.hooksCount || 0), 0);
    const avgHooks = weeklyVideos > 0 ? (weeklyHooks / weeklyVideos).toFixed(1) : '0.0';

    return { weeklyVideos, weeklyHooks, avgHooks };
  };

  const weeklyEditorStats = getWeeklyStats(myEditorReports);

  // Overall Stats for Boost Page & TikTok
  const totalBoostSpend = myDailyReports.reduce((sum, r) => sum + Number(r.spend || 0), 0);
  const totalBoostRevenue = myDailyReports.reduce((sum, r) => sum + Number(r.revenue || 0), 0);
  const totalBoostResults = myDailyReports.reduce((sum, r) => sum + Number(r.leads || 0), 0);
  const overallBoostROAS = totalBoostSpend > 0 ? (totalBoostRevenue / totalBoostSpend).toFixed(2) : '0.00';

  // Overall Stats for Video Editor
  const totalEditorVideos = myEditorReports.reduce((sum, r) => sum + Number(r.videosCount || 0), 0);
  const totalEditorHooks = myEditorReports.reduce((sum, r) => sum + Number(r.hooksCount || 0), 0);

  // Handle Add Next Day Milestone in Modal 1
  const handleAddMilestoneDay = () => {
    setBoostForm(prev => ({
      ...prev,
      dailyMilestones: [
        ...prev.dailyMilestones,
        { 
          day: prev.dailyMilestones.length + 1, 
          spend: '', 
          results: '', 
          sales: '', 
          note: `ក្រោយ Boost បាន ${prev.dailyMilestones.length + 1} ថ្ងៃ` 
        }
      ]
    }));
  };

  const handleUpdateMilestone = (index, field, value) => {
    setBoostForm(prev => {
      const updated = [...prev.dailyMilestones];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, dailyMilestones: updated };
    });
  };

  // Submit Modal 1 (Boost Page & TikTok)
  const handleBoostSubmit = (e) => {
    e.preventDefault();
    if (!boostForm.campaignName || !boostForm.totalSpend) {
      alert("សូមបញ្ចូលឈ្មោះ Campaign និងថវិកាបានចាយ ($ Total Spend)");
      return;
    }

    const numSpend = parseFloat(boostForm.totalSpend) || 0;
    const numRevenue = parseFloat(boostForm.revenue) || 0;
    const numSales = parseInt(boostForm.salesClosed, 10) || 0;

    // Sum results from daily milestones if available
    const milestoneResultsSum = boostForm.dailyMilestones.reduce((sum, m) => sum + (parseInt(m.results, 10) || 0), 0);
    const totalResults = milestoneResultsSum > 0 ? milestoneResultsSum : 1;

    const newReport = {
      id: `rep-${Date.now()}`,
      date: boostForm.startBoost,
      startBoost: boostForm.startBoost,
      endBoost: boostForm.endBoost,
      platform: boostForm.platform,
      campaignName: boostForm.campaignName,
      boostLink: boostForm.boostLink || '',
      objective: boostForm.boostObjective,
      metricType: boostForm.boostObjective === 'Video Views' ? 'views' : 'messages',
      spend: numSpend,
      leads: totalResults,
      salesClosed: numSales,
      revenue: numRevenue,
      notes: boostForm.notes || '',
      status: boostForm.status,
      dailyMilestones: boostForm.dailyMilestones,
      authorId: currentUser?.id || 'usr-staff',
      authorName: currentUser?.name || currentUser?.username || 'Staff Member',
      authorRole: currentUser?.role || 'Digital Marketing',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    };

    onAddReport(newReport);
    setShowBoostModal(false);

    // Reset Form
    setBoostForm({
      platform: 'Facebook',
      campaignName: '',
      boostLink: '',
      startBoost: todayStr,
      endBoost: todayStr,
      boostObjective: 'Sale (Get Messages)',
      totalSpend: '',
      salesClosed: '',
      revenue: '',
      notes: '',
      status: 'Scale',
      dailyMilestones: [
        { day: 1, spend: '', results: '', sales: '', note: 'ថ្ងៃទី ១' },
        { day: 2, spend: '', results: '', sales: '', note: '' }
      ]
    });
  };

  // Submit Modal 2 (Video Editor)
  const handleEditorSubmit = (e) => {
    e.preventDefault();
    if (!editorForm.videoTitle) {
      alert("សូមបញ្ចូលចំណងជើងវីដេអូ ឬប្រធានបទ!");
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
      notes: editorForm.notes || '',
      authorId: currentUser?.id || 'usr-staff',
      authorName: currentUser?.name || editorForm.editorName || 'Video Editor',
      editorName: editorForm.editorName || currentUser?.name || 'Video Editor',
      authorRole: currentUser?.role || 'Video Editor',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
    };

    if (onAddEditorReport) {
      onAddEditorReport(newEditReport);
    }
    setShowEditorModal(false);

    setEditorForm({
      date: todayStr,
      editorName: currentUser?.name || 'Video Editor',
      videoTitle: '',
      platform: 'TikTok & Reels',
      videosCount: 2,
      hooksCount: 6,
      videoFormat: '9:16 Vertical (1080p)',
      driveLink: '',
      status: 'Ready to Launch',
      notes: ''
    });
  };

  // Filtered Boost Reports (Scoped to current staff if not Admin)
  const filteredBoostReports = myDailyReports.filter(r => {
    if (!r) return false;
    const matchPlatform = platformFilter === 'All' || r.platform === platformFilter;
    const q = (searchQuery || '').toLowerCase();
    const matchQuery = !q || 
      (r.campaignName && r.campaignName.toLowerCase().includes(q)) ||
      (r.boostLink && r.boostLink.toLowerCase().includes(q)) ||
      (r.authorName && r.authorName.toLowerCase().includes(q));
    return matchPlatform && matchQuery;
  });

  // Selected Script for PC Uploaded Preview & Download Modal
  const [selectedScriptContent, setSelectedScriptContent] = useState(null);

  // Filtered Weekly Contents (Scoped to current staff if not Admin)
  const filteredWeeklyContents = myWeeklyContents.filter(c => {
    if (!c || typeof c !== 'object') return false;
    const matchWeek = selectedWeekFilter === 'All' || c.week === selectedWeekFilter;
    const matchType = contentTypeFilter === 'All' || c.contentType === contentTypeFilter;
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return matchWeek && matchType;

    const titleStr = typeof c.title === 'string' ? c.title.toLowerCase() : '';
    const authorStr = typeof c.authorName === 'string' ? c.authorName.toLowerCase() : '';
    const notesStr = typeof c.notes === 'string' ? c.notes.toLowerCase() : '';
    const scriptFileStr = typeof c.scriptFileName === 'string' 
      ? c.scriptFileName.toLowerCase() 
      : (c.scriptFileName?.name ? String(c.scriptFileName.name).toLowerCase() : '');
    const scriptTextStr = typeof c.scriptText === 'string' ? c.scriptText.toLowerCase() : '';

    const matchQuery = titleStr.includes(q) || authorStr.includes(q) || notesStr.includes(q) || scriptFileStr.includes(q) || scriptTextStr.includes(q);
    return matchWeek && matchType && matchQuery;
  });

  // Filtered Editor Reports (Scoped to current staff if not Admin)
  const filteredEditorReports = myEditorReports.filter(e => {
    if (!e) return false;
    const q = (searchQuery || '').toLowerCase();
    return !q || 
      (e.videoTitle && e.videoTitle.toLowerCase().includes(q)) ||
      (e.authorName && e.authorName.toLowerCase().includes(q)) ||
      (e.editorName && e.editorName.toLowerCase().includes(q)) ||
      (e.notes && e.notes.toLowerCase().includes(q));
  });

  return (
    <div className="daily-report-view">
      {/* View Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <FileSpreadsheet className="text-emerald" size={26} color="var(--emerald-main)" />
            ផ្ទាំងបញ្ចូលទិន្នន័យការងារ (Staff Input Portal)
          </h2>
          <p>
            {isAdmin 
              ? 'ទិដ្ឋភាព Boss / Manager: បង្ហាញរបាយការណ៍ និង Uploads របស់គ្រប់បុគ្គលិកទាំងអស់' 
              : `ទិដ្ឋភាពផ្ទាល់ខ្លួន: បង្ហាញតែទិន្នន័យដែល ${currentUser?.name || 'លោកអ្នក'} បាន Upload ផ្ទាល់ប៉ុណ្ណោះ (មិនបង្ហាញរបស់បុគ្គលិកផ្សេងទេ)`}
          </p>
        </div>

        {/* 3 Column Switcher Button Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--dark-inset)', padding: '0.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn ${activeColumn === 'boost' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.86rem', border: 'none' }}
            onClick={() => setActiveColumn('boost')}
          >
            <span>🔵 Boost Page & 🎵 TikTok</span>
            <span style={{ fontSize: '0.75rem', background: activeColumn === 'boost' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.08)', padding: '2px 7px', borderRadius: '10px' }}>
              {myDailyReports.length}
            </span>
          </button>

          <button
            type="button"
            className={`btn ${activeColumn === 'editor' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.86rem', border: 'none' }}
            onClick={() => setActiveColumn('editor')}
          >
            <Scissors size={15} />
            <span>✂️ Video Editor</span>
            <span style={{ fontSize: '0.75rem', background: activeColumn === 'editor' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.08)', padding: '2px 7px', borderRadius: '10px' }}>
              {myEditorReports.length}
            </span>
          </button>

          <button
            type="button"
            className={`btn ${activeColumn === 'content' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.86rem', border: 'none' }}
            onClick={() => setActiveColumn('content')}
          >
            <Calendar size={15} />
            <span>📅 Upload Content តាម Week</span>
            <span style={{ fontSize: '0.75rem', background: activeColumn === 'content' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.08)', padding: '2px 7px', borderRadius: '10px' }}>
              {myWeeklyContents.length}
            </span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3 MAIN SUMMARY CARDS (COLUMNS 1, 2, & 3)                        */}
      {/* ============================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        {/* COLUMN 1 CARD: Boost Page & TikTok */}
        <div 
          className="glass-card" 
          style={{ 
            border: activeColumn === 'boost' ? '2px solid var(--emerald-main)' : '1px solid var(--border-color)',
            cursor: 'pointer' 
          }}
          onClick={() => setActiveColumn('boost')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <span className="badge badge-platform-fb" style={{ marginBottom: '0.4rem' }}>
                Column 1: Paid Traffic
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                🔵 Boost Page & TikTok
              </h3>
            </div>
            <button 
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              onClick={(e) => { e.stopPropagation(); setShowBoostModal(true); }}
            >
              <PlusCircle size={14} />
              <span>+ Boost Report</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center', background: 'var(--dark-inset)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Spend សរុប</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>${totalBoostSpend.toFixed(0)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Views / Leads</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0284C7' }}>{totalBoostResults.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Overall ROAS</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--emerald-main)' }}>{overallBoostROAS}x</div>
            </div>
          </div>
          
          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>* ចុចដើម្បីមើល Paid Ads Log</span>
            <span style={{ color: 'var(--emerald-main)', fontWeight: 700 }}>{myDailyReports.length} Campaigns</span>
          </div>
        </div>

        {/* COLUMN 2 CARD: Video Editor */}
        <div 
          className="glass-card" 
          style={{ 
            border: activeColumn === 'editor' ? '2px solid var(--emerald-main)' : '1px solid var(--border-color)',
            cursor: 'pointer' 
          }}
          onClick={() => setActiveColumn('editor')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <span className="badge badge-scale" style={{ marginBottom: '0.4rem' }}>
                Column 2: Video Production
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ✂️ Video Editor (Daily)
              </h3>
            </div>
            <button 
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              onClick={(e) => { e.stopPropagation(); handleOpenEditorModal(); }}
            >
              <PlusCircle size={14} />
              <span>+ Editor Report</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center', background: 'var(--dark-inset)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>កាត់បានសប្តាហ៍នេះ</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--emerald-main)' }}>
                {weeklyEditorStats.weeklyVideos} Vids
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Hook សប្តាហ៍នេះ</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0284C7' }}>
                {weeklyEditorStats.weeklyHooks} Hooks
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>មធ្យម Hook/Vid</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--gold-accent)' }}>
                {weeklyEditorStats.avgHooks}x
              </div>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>* សរុបស្វ័យប្រវត្តក្នុង ១ សប្តាហ៍</span>
            <span style={{ color: '#0284C7', fontWeight: 700 }}>សរុប: {totalEditorVideos} Vids</span>
          </div>
        </div>

        {/* COLUMN 3 CARD: Weekly Content Schedule & Upload */}
        <div 
          className="glass-card" 
          style={{ 
            border: activeColumn === 'content' ? '2px solid var(--emerald-main)' : '1px solid var(--border-color)',
            cursor: 'pointer' 
          }}
          onClick={() => setActiveColumn('content')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <span className="badge badge-platform-fb" style={{ marginBottom: '0.4rem', background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                Column 3: Weekly Content Plan
              </span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                📅 Upload Content តាម Week
              </h3>
            </div>
            <button 
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              onClick={(e) => { e.stopPropagation(); setShowWeeklyModal(true); }}
            >
              <PlusCircle size={14} />
              <span>+ Upload Content</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem', textAlign: 'center', background: 'var(--dark-inset)', padding: '0.75rem 0.5rem', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>W1 (01-07)</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#38BDF8' }}>
                {week1Count}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>W2 (08-14)</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--emerald-main)' }}>
                {week2Count}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>W3 (15-21)</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FACC15' }}>
                {week3Count}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>W4 (22-31)</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#C084FC' }}>
                {week4Count}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>* បែងចែកតាមសប្តាហ៍ក្នុងខែ</span>
            <span style={{ color: 'var(--emerald-main)', fontWeight: 700 }}>សរុប: {myWeeklyContents.length} Contents</span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* SECTION A: BOOST PAGE & TIKTOK TABLE (COLUMN 1)                */}
      {/* ============================================================== */}
      {activeColumn === 'boost' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                🔵 របាយការណ៍យុទ្ធនាការ Boost Page & TikTok (Paid Ads Log)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                តាមដាន Link ដែលត្រូវ Boost, រយៈពេល (Start ➔ End), និងទិន្នន័យបន្តបន្ទាប់ (Day 1, Day 2...)
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={() => setShowBoostModal(true)}>
                <PlusCircle size={16} />
                <span>+ បញ្ចូល Boost ថ្មី</span>
              </button>

              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="ស្វែងរក Campaign..." 
                  className="form-input" 
                  style={{ paddingLeft: '2rem', width: '180px' }} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <Search size={14} style={{ position: 'absolute', left: 10, top: 12, color: 'var(--text-muted)' }} />
              </div>

              <select 
                className="form-select" 
                value={platformFilter} 
                onChange={(e) => setPlatformFilter(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="All">គ្រប់ Platform</option>
                <option value="Facebook">🔵 Facebook</option>
                <option value="TikTok">🎵 TikTok</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Campaign & Link ត្រូវ Boost</th>
                  <th>កាលបរិច្ឆេទ (Start ➔ End)</th>
                  <th>គោលដៅ Boost</th>
                  <th style={{ textAlign: 'right' }}>Spend ($)</th>
                  <th style={{ textAlign: 'center' }}>Leads / Views</th>
                  <th style={{ textAlign: 'center' }}>Milestones (1ថ្ងៃ, 2ថ្ងៃ...)</th>
                  <th style={{ textAlign: 'right' }}>Revenue ($)</th>
                  <th style={{ textAlign: 'center' }}>ROAS</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoostReports.length === 0 ? (
                  <tr>
                    <td colSpan="11" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      មិនមានទិន្នន័យយុទ្ធនាការឡើយ
                    </td>
                  </tr>
                ) : (
                  filteredBoostReports.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <span className={`badge ${row.platform === 'Facebook' ? 'badge-platform-fb' : 'badge-platform-tt'}`}>
                          {row.platform === 'Facebook' ? '🔵 FB' : '🎵 TikTok'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.campaignName}</div>
                        {row.boostLink ? (
                          <a 
                            href={row.boostLink} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{ color: '#0284C7', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}
                          >
                            <LinkIcon size={12} /> មើល Link ដែល Boost
                          </a>
                        ) : (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>គ្មាន Link ភ្ជាប់</div>
                        )}
                      </td>
                      <td>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {row.startBoost || row.date}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          ដល់ {row.endBoost || row.date}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${row.objective && row.objective.includes('Video') ? 'badge-platform-tt' : 'badge-scale'}`}>
                          {row.objective || 'Sale (Messages)'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)' }}>
                        ${Number(row.spend).toFixed(2)}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 800, color: '#0284C7' }}>
                        {Number(row.leads || 0).toLocaleString()}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {row.dailyMilestones && row.dailyMilestones.length > 0 ? (
                          <button
                            className="btn btn-outline"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                            onClick={() => setSelectedProgressionReport(row)}
                          >
                            <Clock size={13} /> {row.dailyMilestones.length} ថ្ងៃតាមដាន
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>-</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--emerald-main)' }}>
                        ${Number(row.revenue || 0).toFixed(2)}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 800 }}>
                        {row.spend > 0 ? (row.revenue / row.spend).toFixed(2) : '0.00'}x
                      </td>
                      <td>
                        <span className={`badge badge-${(row.status || 'scale').toLowerCase()}`}>
                          {row.status || 'Scale'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          onClick={() => onDeleteReport(row.id)}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                          title="លុបរបាយការណ៍"
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
      )}

      {/* ============================================================== */}
      {/* SECTION B: VIDEO EDITOR TABLE (COLUMN 2)                       */}
      {/* ============================================================== */}
      {activeColumn === 'editor' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ✂️ របាយការណ៍ផលិត & កាត់តវីដេអូប្រចាំថ្ងៃ (Video Editor Daily Log)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                កត់ត្រាចំនួន Video ដែលកាត់បាន, ចំនួន Hook បង្កើតបាន និងសរុបផលិតភាពក្នុង ១ សប្តាហ៍
              </p>
            </div>

            <button className="btn btn-primary" onClick={handleOpenEditorModal}>
              <PlusCircle size={16} />
              <span>+ បញ្ចូលការងារ Editor</span>
            </button>
          </div>

          {/* Weekly Aggregation Highlight Banner */}
          <div className="week-summary-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--emerald-main)' }}>
                🗓️ សរុបចំនួនក្នុងមួយ ១ សប្តាហ៍ (This 1-Week Total Summary)
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                គណនាស្វ័យប្រវត្តក្នុងរយៈពេល ៧ ថ្ងៃចុងក្រោយ សម្រាប់វាស់ស្ទង់ផលិតភាពក្រុម Video Editor
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>កាត់បានសរុប (1 Week)</span>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--emerald-main)' }}>
                  {weeklyEditorStats.weeklyVideos} Videos
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Hook សរុប (1 Week)</span>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0284C7' }}>
                  {weeklyEditorStats.weeklyHooks} Hooks
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>មធ្យម Hook / Video</span>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--gold-accent)' }}>
                  {weeklyEditorStats.avgHooks}x
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>កាលបរិច្ឆេទ</th>
                  <th>Video Editor</th>
                  <th>ប្រធានបទវីដេអូ</th>
                  <th>Platform & Format</th>
                  <th style={{ textAlign: 'center' }}>ចំនួន Video កាត់បាន</th>
                  <th style={{ textAlign: 'center' }}>ចំនួន Hook បង្កើតបាន</th>
                  <th>ស្ថានភាព</th>
                  <th style={{ textAlign: 'center' }}>Drive Link</th>
                  <th>សម្គាល់ (Notes)</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEditorReports.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      មិនទាន់មានទិន្នន័យការងារ Video Editor ឡើយ
                    </td>
                  </tr>
                ) : (
                  filteredEditorReports.map((row) => (
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
                            style={{ color: '#0284C7', display: 'inline-flex', alignItems: 'center', gap: 3, textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem' }}
                          >
                            <FolderOpen size={14} /> Open Drive
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
                          title="លុបរបាយការណ៍"
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
      )}

      {/* ============================================================== */}
      {/* SECTION C: UPLOAD CONTENT តាម WEEK (COLUMN 3)                  */}
      {/* ============================================================== */}
      {activeColumn === 'content' && (
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                📅 តារាងគ្រប់គ្រង & Upload Content តាម Week (Weekly Content Operations)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                តាមដានផែនការ Content និងការ Upload ជាក់ស្តែងតាម Week 1, Week 2, Week 3, Week 4 ជាមួយ Drive និង Post Links
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={() => setShowWeeklyModal(true)}>
                <PlusCircle size={16} />
                <span>+ Upload Content តាម Week</span>
              </button>

              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="ស្វែងរក Content..." 
                  className="form-input" 
                  style={{ paddingLeft: '2rem', width: '180px' }} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <Search size={14} style={{ position: 'absolute', left: 10, top: 12, color: 'var(--text-muted)' }} />
              </div>

              <select 
                className="form-select" 
                value={contentTypeFilter} 
                onChange={(e) => setContentTypeFilter(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="All">គ្រប់ទម្រង់ (All Types)</option>
                <option value="Short-form Video (9:16)">Short-form Video (9:16)</option>
                <option value="Single Banner Graphic">Single Banner Graphic</option>
                <option value="Carousel / Album">Carousel / Album</option>
                <option value="UGC / Customer Review">UGC / Review</option>
              </select>
            </div>
          </div>

          {/* Week Filter Pills Bar */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginBottom: '1.25rem', 
            padding: '0.5rem', 
            background: 'var(--dark-inset)', 
            borderRadius: '10px', 
            border: '1px solid var(--border-color)',
            overflowX: 'auto',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', paddingLeft: '0.5rem' }}>
              ជ្រើសរើសសប្តាហ៍:
            </span>
            {[
              { id: 'All', label: 'ទាំងអស់ (All Weeks)', count: myWeeklyContents.length },
              { id: 'Week 1', label: 'Week 1 (01 - 07)', count: week1Count },
              { id: 'Week 2', label: 'Week 2 (08 - 14)', count: week2Count },
              { id: 'Week 3', label: 'Week 3 (15 - 21)', count: week3Count },
              { id: 'Week 4', label: 'Week 4 (22 - 31)', count: week4Count }
            ].map(w => (
              <button
                key={w.id}
                type="button"
                className={`btn ${selectedWeekFilter === w.id ? 'btn-primary' : 'btn-outline'}`}
                style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.35rem 0.85rem', 
                  border: 'none',
                  borderRadius: '8px'
                }}
                onClick={() => setSelectedWeekFilter(w.id)}
              >
                <span>{w.label}</span>
                <span style={{ 
                  fontSize: '0.72rem', 
                  background: selectedWeekFilter === w.id ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.08)', 
                  padding: '2px 6px', 
                  borderRadius: '8px' 
                }}>
                  {w.count}
                </span>
              </button>
            ))}
          </div>

          {/* Weekly Contents Table */}
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '110px' }}>សប្តាហ៍</th>
                  <th>កាលបរិច្ឆេទ</th>
                  <th>ប្រធានបទ Content (Title / Hook)</th>
                  <th>ទម្រង់ & Platform</th>
                  <th>Staff រៀបចំ</th>
                  <th>ស្ថានភាព</th>
                  <th style={{ textAlign: 'center' }}>ឯកសារ Script (PC)</th>
                  <th style={{ textAlign: 'center' }}>Drive & Post Link</th>
                  <th>សម្គាល់ (Notes)</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredWeeklyContents.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                      <Calendar size={36} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>មិនទាន់មាន Content ក្នុងសប្តាហ៍នេះទេ</div>
                      <p style={{ fontSize: '0.82rem', margin: '4px 0 1rem 0' }}>ចុចប៊ូតុងខាងក្រោមដើម្បី Upload ឬកត់ត្រា Content ថ្មី</p>
                      <button className="btn btn-primary" style={{ margin: '0 auto' }} onClick={() => setShowWeeklyModal(true)}>
                        <PlusCircle size={15} /> + Upload Content តាម Week
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredWeeklyContents.map((row) => {
                    if (!row) return null;
                    const fileName = typeof row.scriptFileName === 'string'
                      ? row.scriptFileName
                      : (row.scriptFileName?.name ? String(row.scriptFileName.name) : '');
                    const hasScript = Boolean(fileName || (typeof row.scriptText === 'string' && row.scriptText.trim()));

                    return (
                      <tr key={row.id || Math.random()}>
                        <td>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            background: row.week === 'Week 1' ? 'rgba(56, 189, 248, 0.15)' :
                                        row.week === 'Week 2' ? 'rgba(16, 185, 129, 0.15)' :
                                        row.week === 'Week 3' ? 'rgba(250, 204, 21, 0.15)' : 'rgba(192, 132, 252, 0.15)',
                            color: row.week === 'Week 1' ? '#38BDF8' :
                                   row.week === 'Week 2' ? 'var(--emerald-main)' :
                                   row.week === 'Week 3' ? '#FACC15' : '#C084FC',
                            border: '1px solid currentColor'
                          }}>
                            {row.week || 'Week 1'}
                          </span>
                        </td>
                        <td style={{ whiteSpace: 'nowrap', fontWeight: 600, fontSize: '0.82rem' }}>
                          {row.date || '-'}
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                            {typeof row.title === 'string' ? row.title : 'Content'}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {row.contentType || 'Short-form Video'}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {row.platform || 'TikTok'}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img 
                              src={row.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} 
                              alt={row.authorName || 'Staff'} 
                              style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)' }}>{row.authorName || 'Staff'}</div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{row.authorRole || 'Digital Marketing'}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${
                            row.status === 'Published' || row.status === 'Ready to Launch' ? 'badge-scale' :
                            row.status === 'In Production' ? 'badge-optimize' : 'badge-kill'
                          }`} style={{ fontSize: '0.75rem' }}>
                            {row.status || 'Ready'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {hasScript ? (
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
                              <span>{fileName ? (fileName.length > 15 ? fileName.slice(0, 13) + '...' : fileName) : 'Script Text'}</span>
                            </button>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>-</span>
                          )}
                        </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                          {row.driveLink ? (
                            <a 
                              href={row.driveLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="btn btn-outline"
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                              title="បើក Google Drive Link"
                            >
                              <FolderOpen size={12} color="#0284C7" /> Drive
                            </a>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>-</span>
                          )}

                          {row.boostLink && (
                            <a 
                              href={row.boostLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="btn btn-outline"
                              style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                              title="បើក Post / Live Link"
                            >
                              <ExternalLink size={12} color="var(--emerald-main)" /> Post
                            </a>
                          )}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.8rem', maxWidth: '180px', color: 'var(--text-secondary)' }}>
                        {row.notes || '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          onClick={() => onDeleteWeeklyContent && onDeleteWeeklyContent(row.id)}
                          style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                          title="លុប Content"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* POP-UP MODAL 1: BOOST PAGE & TIKTOK REPORT (MODAL 1)            */}
      {/* ============================================================== */}
      {showBoostModal && (
        <div className="modal-overlay" onClick={() => setShowBoostModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>
                  <PlusCircle size={22} color="var(--emerald-main)" />
                  បញ្ចូលទិន្នន័យ Boost Page & TikTok
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  កត់ត្រាកាលបរិច្ឆេទ Start ➔ End, គោលដៅ Boost, Link និងទិន្នន័យបន្តបន្ទាប់ (Day 1, Day 2...)
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowBoostModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleBoostSubmit}>
              <div className="form-grid">
                {/* Platform */}
                <div className="form-group">
                  <label className="form-label">Platform</label>
                  <select 
                    className="form-select"
                    value={boostForm.platform}
                    onChange={(e) => setBoostForm({ ...boostForm, platform: e.target.value })}
                  >
                    <option value="Facebook">🔵 Facebook Page Boost</option>
                    <option value="TikTok">🎵 TikTok Ads</option>
                  </select>
                </div>

                {/* Campaign Name */}
                <div className="form-group">
                  <label className="form-label">ឈ្មោះ Campaign / Post ID</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="ឈ្មោះយុទ្ធនាការ..." 
                    value={boostForm.campaignName} 
                    onChange={(e) => setBoostForm({ ...boostForm, campaignName: e.target.value })} 
                    required 
                  />
                </div>

                {/* Start Boost Date */}
                <div className="form-group">
                  <label className="form-label">
                    <span>Start Boost (ថ្ងៃចាប់ផ្តើម)</span>
                  </label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={boostForm.startBoost} 
                    onChange={(e) => setBoostForm({ ...boostForm, startBoost: e.target.value })} 
                    required 
                  />
                </div>

                {/* End Boost Date */}
                <div className="form-group">
                  <label className="form-label">
                    <span>End Boost (ថ្ងៃបញ្ចប់)</span>
                  </label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={boostForm.endBoost} 
                    onChange={(e) => setBoostForm({ ...boostForm, endBoost: e.target.value })} 
                    required 
                  />
                </div>

                {/* Link to Boost */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <span>🔗 បញ្ចូល Link ដែលត្រូវ Boost (Post / Ad URL)</span>
                    <span className="sub">Facebook Post Link ឬ TikTok Spark Code</span>
                  </label>
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="https://facebook.com/... ឬ https://vt.tiktok.com/..." 
                    value={boostForm.boostLink} 
                    onChange={(e) => setBoostForm({ ...boostForm, boostLink: e.target.value })} 
                  />
                </div>

                {/* Boost Objective: Video Views or Sale (Get Messages) */}
                <div className="form-group full-width">
                  <label className="form-label" style={{ fontWeight: 800 }}>
                    🎯 ជ្រើសរើសគោលដៅ Boost (Boost Objective)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.3rem' }}>
                    <button
                      type="button"
                      className={`btn ${boostForm.boostObjective === 'Sale (Get Messages)' ? 'btn-primary' : 'btn-outline'}`}
                      style={{ justifyContent: 'center', padding: '0.7rem' }}
                      onClick={() => setBoostForm({ ...boostForm, boostObjective: 'Sale (Get Messages)' })}
                    >
                      <MessageSquare size={16} />
                      <span>Sale (Get Messages - ភ្ញៀវឆាត)</span>
                    </button>

                    <button
                      type="button"
                      className={`btn ${boostForm.boostObjective === 'Video Views' ? 'btn-primary' : 'btn-outline'}`}
                      style={{ justifyContent: 'center', padding: '0.7rem' }}
                      onClick={() => setBoostForm({ ...boostForm, boostObjective: 'Video Views' })}
                    >
                      <Eye size={16} />
                      <span>Video Views (ចំនួន View)</span>
                    </button>
                  </div>
                </div>

                {/* Total Spend ($) */}
                <div className="form-group">
                  <label className="form-label">
                    ថវិកាបានចាយ ($ Total Spend)
                    <span className="sub">ដុល្លារ</span>
                  </label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-input" 
                    placeholder="0.00" 
                    value={boostForm.totalSpend} 
                    onChange={(e) => setBoostForm({ ...boostForm, totalSpend: e.target.value })} 
                    required 
                  />
                </div>

                {/* Total Revenue ($) */}
                <div className="form-group">
                  <label className="form-label">
                    ចំណូលលក់បាន ($ Revenue)
                    <span className="sub">ដុល្លារ</span>
                  </label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-input" 
                    placeholder="0.00" 
                    value={boostForm.revenue} 
                    onChange={(e) => setBoostForm({ ...boostForm, revenue: e.target.value })} 
                  />
                </div>

                {/* Status */}
                <div className="form-group full-width">
                  <label className="form-label">ការសម្រេចចិត្ត (SOP Status)</label>
                  <select 
                    className="form-select"
                    value={boostForm.status}
                    onChange={(e) => setBoostForm({ ...boostForm, status: e.target.value })}
                  >
                    <option value="Scale">🚀 Scale (បង្កើន Budget 15-20%)</option>
                    <option value="Optimize">🔄 Optimize (កែសម្រួល Hook/Targeting)</option>
                    <option value="Kill">⛔ Kill (បិទ Ad មិនចំណេញ)</option>
                  </select>
                </div>
              </div>

              {/* Day-by-Day Milestone Section (ក្រោយ Boost បាន ១ ថ្ងៃ, ២ ថ្ងៃ...) */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={16} color="var(--emerald-main)" />
                      ទិន្នន័យក្រោយ Boost បាន ១ ថ្ងៃ, ២ ថ្ងៃ... (Milestones Progression)
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      កត់ត្រាការវិវត្តន៍លទ្ធផលតាមថ្ងៃនីមួយៗ
                    </span>
                  </div>

                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    onClick={handleAddMilestoneDay}
                  >
                    <Plus size={14} /> + បន្ថែមថ្ងៃបន្ទាប់
                  </button>
                </div>

                {boostForm.dailyMilestones.map((ms, idx) => (
                  <div key={idx} className="day-progression-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--emerald-main)' }}>
                      <span>🗓️ ក្រោយ Boost បាន {ms.day} ថ្ងៃ (Day {ms.day})</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem' }}>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Spend ថ្ងៃទី {ms.day} ($)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          placeholder="0.00" 
                          className="form-input" 
                          style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}
                          value={ms.spend}
                          onChange={(e) => handleUpdateMilestone(idx, 'spend', e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          {boostForm.boostObjective === 'Video Views' ? 'Views ថ្ងៃទី' : 'Messages ថ្ងៃទី'} {ms.day}
                        </label>
                        <input 
                          type="number" 
                          placeholder="ចំនួន..." 
                          className="form-input" 
                          style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}
                          value={ms.results}
                          onChange={(e) => handleUpdateMilestone(idx, 'results', e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Orders លក់បាន</label>
                        <input 
                          type="number" 
                          placeholder="0" 
                          className="form-input" 
                          style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}
                          value={ms.sales}
                          onChange={(e) => handleUpdateMilestone(idx, 'sales', e.target.value)}
                        />
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>កំណត់សម្គាល់ថ្ងៃទី {ms.day}</label>
                        <input 
                          type="text" 
                          placeholder="លទ្ធផលល្អ ឬធ្លាក់ចុះ..." 
                          className="form-input" 
                          style={{ padding: '0.45rem 0.6rem', fontSize: '0.82rem' }}
                          value={ms.note}
                          onChange={(e) => handleUpdateMilestone(idx, 'note', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowBoostModal(false)}>
                  បោះបង់
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                  រក្សាទុក Boost Report &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* POP-UP MODAL 2: VIDEO EDITOR DAILY REPORT (MODAL 2)            */}
      {/* ============================================================== */}
      {showEditorModal && (
        <div className="modal-overlay" onClick={() => setShowEditorModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>
                  <Scissors size={22} color="var(--emerald-main)" />
                  បញ្ចូលទិន្នន័យ Video Editor (ការកាត់តវីដេអូ)
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  កត់ត្រាចំនួនវីដេអូកាត់បាន និងចំនួន Hook ថ្ងៃនេះ ជាមួយការសរុបក្នុង ១ សប្តាហ៍
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowEditorModal(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Weekly Quick Summary inside Modal */}
            <div className="week-summary-banner" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--emerald-main)' }}>
                  🗓️ សរុបផលិតផលសប្តាហ៍នេះ (This 1 Week):
                </span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  {weeklyEditorStats.weeklyVideos} Videos &bull; {weeklyEditorStats.weeklyHooks} Hooks
                </span>
              </div>
            </div>

            <form onSubmit={handleEditorSubmit}>
              <div className="form-grid">
                {/* Date */}
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

                {/* Editor Name */}
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

                {/* Video Title */}
                <div className="form-group full-width">
                  <label className="form-label">ចំណងជើងវីដេអូ ឬប្រធានបទ</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="ឧ. SUVÉE Sunscreen Shock Water Test Angle A..." 
                    value={editorForm.videoTitle} 
                    onChange={(e) => setEditorForm({ ...editorForm, videoTitle: e.target.value })} 
                    required 
                  />
                </div>

                {/* The 2 Core Fields requested: Videos Count & Hooks Count */}
                <div className="form-group" style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <label className="form-label" style={{ fontWeight: 800, color: 'var(--emerald-main)' }}>
                    <span>🎬 ថ្ងៃហ្នឹងកាត់បានប៉ុន្មាន Video?</span>
                    <span className="sub">ចំនួនវីដេអូ</span>
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-input" 
                    style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}
                    value={editorForm.videosCount} 
                    onChange={(e) => setEditorForm({ ...editorForm, videosCount: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group" style={{ background: 'rgba(2, 132, 199, 0.08)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(2, 132, 199, 0.3)' }}>
                  <label className="form-label" style={{ fontWeight: 800, color: '#0284C7' }}>
                    <span>⚡ ហើយប៉ុន្មាន Hook?</span>
                    <span className="sub">ចំនួន 3s Hook</span>
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-input" 
                    style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}
                    value={editorForm.hooksCount} 
                    onChange={(e) => setEditorForm({ ...editorForm, hooksCount: e.target.value })} 
                    required 
                  />
                </div>

                {/* Platform */}
                <div className="form-group">
                  <label className="form-label">Platform</label>
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

                {/* Video Format */}
                <div className="form-group">
                  <label className="form-label">Format វីដេអូ</label>
                  <select 
                    className="form-select"
                    value={editorForm.videoFormat}
                    onChange={(e) => setEditorForm({ ...editorForm, videoFormat: e.target.value })}
                  >
                    <option value="9:16 Vertical (1080p)">9:16 Vertical (1080x1920 HD)</option>
                    <option value="1:1 Square">1:1 Square (Feed)</option>
                    <option value="4:5 Portrait">4:5 Portrait</option>
                  </select>
                </div>

                {/* Drive Link */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <span>Drive / Telegram Video Link</span>
                    <span className="sub">តំណភ្ជាប់ទាញយកវីដេអូ</span>
                  </label>
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="https://drive.google.com/..." 
                    value={editorForm.driveLink} 
                    onChange={(e) => setEditorForm({ ...editorForm, driveLink: e.target.value })} 
                  />
                </div>

                {/* Status */}
                <div className="form-group full-width">
                  <label className="form-label">ស្ថានភាពផលិត (Status)</label>
                  <select 
                    className="form-select"
                    value={editorForm.status}
                    onChange={(e) => setEditorForm({ ...editorForm, status: e.target.value })}
                  >
                    <option value="Ready to Launch">✅ Ready to Launch (រួចរាល់ 100%)</option>
                    <option value="In Review">🔄 In Review (កំពុងត្រួតពិនិត្យ)</option>
                    <option value="Need Re-cut">✏️ Need Re-cut (ត្រូវកែតម្រូវ)</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="form-group full-width">
                  <label className="form-label">សម្គាល់ & Feedback</label>
                  <textarea 
                    rows="2" 
                    className="form-textarea" 
                    placeholder="បញ្ជាក់អំពី Hook Angle ឬ Sound effect..."
                    value={editorForm.notes} 
                    onChange={(e) => setEditorForm({ ...editorForm, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowEditorModal(false)}>
                  បោះបង់
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                  រក្សាទុកការងារ Editor &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* POP-UP DETAIL: VIEW MILESTONE DAYS PROGRESSION MODAL            */}
      {/* ============================================================== */}
      {selectedProgressionReport && (
        <div className="modal-overlay" onClick={() => setSelectedProgressionReport(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>
                  <Clock size={20} color="var(--emerald-main)" />
                  ទិន្នន័យក្រោយ Boost តាមថ្ងៃ (Day-by-Day Progression)
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {selectedProgressionReport.campaignName} ({selectedProgressionReport.platform})
                </p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedProgressionReport(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedProgressionReport.dailyMilestones && selectedProgressionReport.dailyMilestones.map((ms, idx) => (
                <div key={idx} className="day-progression-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--emerald-main)' }}>
                      🗓️ ក្រោយ Boost បាន {ms.day} ថ្ងៃ (Day {ms.day})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Spend: <strong>${ms.spend || 0}</strong>
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Results (Leads/Views):</span>
                      <div style={{ fontWeight: 700, color: '#0284C7' }}>{Number(ms.results || 0).toLocaleString()}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Sales (Orders):</span>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{ms.sales || 0}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Notes:</span>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }}>{ms.note || '-'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
              <button className="btn btn-outline" onClick={() => setSelectedProgressionReport(null)}>
                បិទផ្ទាំង
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP MODAL 3: WEEKLY CONTENT UPLOAD MODAL */}
      <WeeklyContentModal
        isOpen={showWeeklyModal}
        onClose={() => setShowWeeklyModal(false)}
        onAddContent={onAddWeeklyContent}
        currentUser={currentUser}
      />

      {/* POP-UP MODAL 4: SCRIPT PREVIEW & DOWNLOAD MODAL */}
      <ScriptModal
        isOpen={!!selectedScriptContent}
        onClose={() => setSelectedScriptContent(null)}
        content={selectedScriptContent}
      />
    </div>
  );
}
