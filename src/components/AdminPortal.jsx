import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Crown, 
  Search, 
  Trash2, 
  CheckCircle2, 
  TrendingUp, 
  Scissors, 
  FileSpreadsheet, 
  ExternalLink, 
  AlertCircle, 
  Filter, 
  Sparkles, 
  Calendar, 
  DollarSign
} from 'lucide-react';
import CreateStaffModal from './CreateStaffModal';

export default function AdminPortal({ 
  currentUser, 
  users = [], 
  onAddUser, 
  onDeleteUser, 
  onSwitchUser,
  dailyReports = [], 
  editorReports = [],
  weeklyContents = []
}) {
  const [activeSubTab, setActiveSubTab] = useState('staff-list'); // 'staff-list', 'live-reports', 'weekly-content'
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Filter for live reports
  const [selectedStaffFilter, setSelectedStaffFilter] = useState('All');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [reportSearchQuery, setReportSearchQuery] = useState('');

  const isAdmin = currentUser?.role === 'Admin';

  // Calculate Tenure
  const calculateTenure = (dateString) => {
    if (!dateString) return 'ទើបចូលធ្វើការ';
    const start = new Date(dateString);
    const now = new Date();
    if (isNaN(start.getTime())) return 'មិនទាន់កំណត់';

    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;

    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      return `${years} ឆ្នាំ ${remMonths} ខែ`;
    } else if (months > 0) {
      return `${months} ខែ ${days} ថ្ងៃ`;
    }
    return `${diffDays} ថ្ងៃ`;
  };

  // Combine and format all reports for Boss monitoring
  const allStaffReports = [
    ...dailyReports.map(r => ({
      ...r,
      feedType: 'boost',
      feedTypeName: 'Boost Page & TikTok',
      feedIcon: TrendingUp,
      feedColor: '#38BDF8',
      displayTitle: r.campaignName,
      authorDisplayName: r.authorName || 'Vannak Meas',
      authorDisplayRole: r.authorRole || 'Digital Marketing',
      authorDisplayAvatar: r.authorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    })),
    ...editorReports.map(e => ({
      ...e,
      feedType: 'editor',
      feedTypeName: 'Video Editor Output',
      feedIcon: Scissors,
      feedColor: '#C084FC',
      displayTitle: e.videoTitle,
      authorDisplayName: e.authorName || e.editorName || 'Sokha Heng',
      authorDisplayRole: e.authorRole || 'Video Editor',
      authorDisplayAvatar: e.authorAvatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filtered reports
  const filteredReports = allStaffReports.filter(r => {
    if (selectedDeptFilter === 'marketing' && r.feedType !== 'boost') return false;
    if (selectedDeptFilter === 'editor' && r.feedType !== 'editor') return false;
    if (selectedStaffFilter !== 'All' && r.authorDisplayName !== selectedStaffFilter) return false;

    if (reportSearchQuery.trim()) {
      const q = reportSearchQuery.toLowerCase();
      const matchTitle = (r.displayTitle || '').toLowerCase().includes(q);
      const matchAuthor = (r.authorDisplayName || '').toLowerCase().includes(q);
      const matchNotes = (r.notes || '').toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor && !matchNotes) return false;
    }

    return true;
  });

  // Boss KPIs
  const totalStaffCount = users.filter(u => u.role !== 'Admin').length;
  const marketingStaffCount = users.filter(u => u.role === 'Digital Marketing').length;
  const editorStaffCount = users.filter(u => u.role === 'Video Editor').length;
  const totalBoostSpendMonitored = dailyReports.reduce((s, r) => s + Number(r.spend || 0), 0);
  const totalVideosProduced = editorReports.reduce((s, r) => s + Number(r.videosCount || 0), 0);
  const totalHooksProduced = editorReports.reduce((s, r) => s + Number(r.hooksCount || 0), 0);

  return (
    <div className="admin-portal-view" style={{ animation: 'fadeIn 0.25s ease' }}>
      
      {/* 1. Clean Boss Portal Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.25)'
            }}>
              <Crown size={20} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ផ្ទាំងគ្រប់គ្រង Boss / Manager (Admin Portal)
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                បង្កើតគណនីបុគ្គលិក • តាមដានរាល់ Report និង Content តាម Week ដែល Staff បាន Upload
              </p>
            </div>
          </div>
        </div>

        {/* Clean Segment Switcher */}
        <div style={{
          display: 'flex',
          background: 'var(--dark-inset)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '4px',
          gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => setActiveSubTab('staff-list')}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              border: 'none',
              background: activeSubTab === 'staff-list' ? 'var(--emerald-main)' : 'transparent',
              color: activeSubTab === 'staff-list' ? '#0F172A' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Users size={14} />
            <span>គ្រប់គ្រងបុគ្គលិក ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('live-reports')}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              border: 'none',
              background: activeSubTab === 'live-reports' ? 'var(--emerald-main)' : 'transparent',
              color: activeSubTab === 'live-reports' ? '#0F172A' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={14} />
            <span>របាយការណ៍ Staff ({allStaffReports.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('weekly-content')}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              border: 'none',
              background: activeSubTab === 'weekly-content' ? 'var(--emerald-main)' : 'transparent',
              color: activeSubTab === 'weekly-content' ? '#0F172A' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Calendar size={14} />
            <span>Content តាម Week ({weeklyContents.length})</span>
          </button>
        </div>
      </div>

      {/* Permission Warning if not Admin */}
      {!isAdmin && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '0.85rem 1.25rem',
          borderRadius: '12px',
          background: 'rgba(234, 179, 8, 0.1)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <AlertCircle size={20} color="#F59E0B" />
            <div>
              <div style={{ fontWeight: 700, color: '#F59E0B', fontSize: '0.9rem' }}>
                អ្នកកំពុង Login ក្នុងនាម Staff ({currentUser?.role})
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                ទំព័រនេះមានមុខងារសម្រាប់ Boss / Admin បង្កើតគណនី Staff និងត្រួតពិនិត្យរបាយការណ៍ទាំងអស់។
              </div>
            </div>
          </div>
          <button 
            className="btn btn-primary"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #B45309)', fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
            onClick={() => {
              const bossUser = users.find(u => u.role === 'Admin');
              if (bossUser) onSwitchUser(bossUser);
            }}
          >
            <Crown size={14} />
            <span>Switch ទៅ Boss Admin</span>
          </button>
        </div>
      )}

      {/* 2. Top Executive Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div className="glass-card stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-card-header">
            <span className="stat-label">បុគ្គលិកសរុប (Staffs)</span>
            <div className="stat-icon-wrapper blue">
              <Users size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--text-primary)', fontSize: '1.75rem' }}>
            {totalStaffCount} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>នាក់</span>
          </div>
          <div className="stat-footer">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              🔵 Marketing: {marketingStaffCount} | ✂️ Editor: {editorStaffCount}
            </span>
          </div>
        </div>

        <div className="glass-card stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-card-header">
            <span className="stat-label">Report បាន Upload</span>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-main)' }}>
              <FileSpreadsheet size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--emerald-main)', fontSize: '1.75rem' }}>
            {allStaffReports.length} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>Reports</span>
          </div>
          <div className="stat-footer">
            <span className="trend-badge positive">Synced to Boss</span>
          </div>
        </div>

        <div className="glass-card stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-card-header">
            <span className="stat-label">ថវិកា Boost បានចាយ</span>
            <div className="stat-icon-wrapper gold">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#FACC15', fontSize: '1.75rem' }}>
            ${totalBoostSpendMonitored.toFixed(2)}
          </div>
          <div className="stat-footer">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Facebook & TikTok Ads
            </span>
          </div>
        </div>

        <div className="glass-card stat-card" style={{ padding: '1.25rem' }}>
          <div className="stat-card-header">
            <span className="stat-label">Content បាន Upload តាម Week</span>
            <div className="stat-icon-wrapper purple">
              <Calendar size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: '#C084FC', fontSize: '1.75rem' }}>
            {weeklyContents.length} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>Contents</span>
          </div>
          <div className="stat-footer">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Videos & Graphics Across Weeks
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: STAFF MANAGEMENT (CLEAN FULL-WIDTH DIRECTORY TABLE)            */}
      {/* ========================================================================= */}
      {activeSubTab === 'staff-list' && (
        <div className="card-box" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                បញ្ជីបុគ្គលិកក្នុងប្រព័ន្ធ (Staff Directory)
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                គណនីបុគ្គលិកទាំងអស់ដែល Boss បានបង្កើត ({users.length} គណនី)
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}
              onClick={() => setShowCreateModal(true)}
            >
              <UserPlus size={16} />
              <span>+ បង្កើតគណនី Staff ថ្មី</span>
            </button>
          </div>

          <div className="table-responsive">
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>បុគ្គលិក (Staff)</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>Login Access</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>ថ្ងៃចូល & រយៈពេល</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 1rem' }}>បាន Upload</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => {
                  const isSuperAdmin = u.role === 'Admin';
                  const userReportsCount = allStaffReports.filter(r => 
                    r.authorId === u.id || r.authorDisplayName === u.name
                  ).length;
                  const userContentCount = weeklyContents.filter(c => 
                    c.authorId === u.id || c.authorName === u.name
                  ).length;

                  return (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      
                      {/* Staff Profile Cell */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img 
                            src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                            alt={u.name} 
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: isSuperAdmin ? '2px solid #F59E0B' : '2px solid var(--border-color)'
                            }}
                          />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                                {u.name}
                              </span>
                              <span style={{
                                fontSize: '0.68rem',
                                padding: '0.1rem 0.45rem',
                                borderRadius: '8px',
                                fontWeight: 700,
                                background: isSuperAdmin 
                                  ? 'rgba(234, 179, 8, 0.15)' 
                                  : u.role === 'Digital Marketing' 
                                    ? 'rgba(59, 130, 246, 0.15)' 
                                    : 'rgba(168, 85, 247, 0.15)',
                                color: isSuperAdmin 
                                  ? '#FACC15' 
                                  : u.role === 'Digital Marketing' 
                                    ? '#60A5FA' 
                                    : '#C084FC',
                                border: '1px solid currentColor'
                              }}>
                                {u.role}
                              </span>
                            </div>
                            {u.phone && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                📞 {u.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Login Credentials Cell */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                          @{u.username}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Pass: <code style={{ background: 'var(--dark-inset)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>{u.password}</code>
                        </div>
                      </td>

                      {/* Tenure Cell */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {u.startDate || 'N/A'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--emerald-main)', fontWeight: 600 }}>
                          {calculateTenure(u.startDate)}
                        </div>
                      </td>

                      {/* Upload Activity Cell */}
                      <td style={{ textAlign: 'center', padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                          <span style={{
                            background: 'rgba(16, 185, 129, 0.12)',
                            color: 'var(--emerald-main)',
                            padding: '0.15rem 0.55rem',
                            borderRadius: '999px',
                            fontWeight: 700,
                            fontSize: '0.78rem'
                          }}>
                            {userReportsCount} Daily Reports
                          </span>
                          {userContentCount > 0 && (
                            <span style={{
                              background: 'rgba(168, 85, 247, 0.12)',
                              color: '#C084FC',
                              padding: '0.1rem 0.45rem',
                              borderRadius: '999px',
                              fontWeight: 700,
                              fontSize: '0.72rem'
                            }}>
                              {userContentCount} Weekly Contents
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions Cell */}
                      <td style={{ textAlign: 'center', padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <button
                            type="button"
                            className="btn btn-outline"
                            style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem', height: 'auto' }}
                            onClick={() => onSwitchUser(u)}
                            title="ចូលប្រើប្រព័ន្ធក្នុងនាមបុគ្គលិកនេះ"
                          >
                            Switch
                          </button>

                          {!isSuperAdmin && (
                            <button
                              type="button"
                              className="action-icon-btn delete-btn"
                              title="លុបគណនីបុគ្គលិកនេះ"
                              onClick={() => {
                                if (window.confirm(`តើ Boss ពិតជាចង់លុបគណនី "${u.name}" មែនទេ?`)) {
                                  onDeleteUser(u.id);
                                }
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: LIVE STAFF REPORTS FEED                                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'live-reports' && (
        <div className="card-box" style={{ padding: '1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                រាល់ Report ដែល Staff បាន Upload (Live Feed)
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ទិន្នន័យពីគ្រប់បុគ្គលិក (Digital Marketing & Video Editor) លោតចូល Boss Manager ផ្ទាល់
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <select 
                className="form-select"
                style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.82rem', height: '34px' }}
                value={selectedDeptFilter}
                onChange={e => setSelectedDeptFilter(e.target.value)}
              >
                <option value="All">ផ្នែកទាំងអស់ (All)</option>
                <option value="marketing">🔵 Digital Marketing</option>
                <option value="editor">✂️ Video Editor</option>
              </select>

              <select 
                className="form-select"
                style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.82rem', height: '34px' }}
                value={selectedStaffFilter}
                onChange={e => setSelectedStaffFilter(e.target.value)}
              >
                <option value="All">បុគ្គលិកទាំងអស់</option>
                {users.map(u => (
                  <option key={u.id} value={u.name}>{u.name} ({u.role})</option>
                ))}
              </select>

              <div style={{ position: 'relative', width: '200px' }}>
                <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="ស្វែងរក Campaign/Video..."
                  style={{ paddingLeft: '28px', fontSize: '0.8rem', height: '34px' }}
                  value={reportSearchQuery}
                  onChange={e => setReportSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <FileSpreadsheet size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>មិនទាន់មាន Report ត្រូវនឹងលក្ខខណ្ឌស្វែងរកទេ</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredReports.map((report) => {
                const IconComponent = report.feedIcon;
                const isBoost = report.feedType === 'boost';

                return (
                  <div 
                    key={report.id}
                    style={{
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '1.1rem 1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img 
                          src={report.authorDisplayAvatar} 
                          alt={report.authorDisplayName} 
                          style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${report.feedColor}` }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.88rem' }}>
                              {report.authorDisplayName}
                            </span>
                            <span style={{
                              fontSize: '0.68rem',
                              padding: '0.1rem 0.45rem',
                              borderRadius: '8px',
                              background: `${report.feedColor}18`,
                              color: report.feedColor,
                              fontWeight: 700
                            }}>
                              {report.authorDisplayRole}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            កាលបរិច្ឆេទ Upload: <strong>{report.date}</strong>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)'
                        }}>
                          <IconComponent size={13} color={report.feedColor} />
                          <span>{report.feedTypeName}</span>
                        </span>

                        <span style={{
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '8px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#34D399',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: 600
                        }}>
                          <CheckCircle2 size={12} />
                          <span>Boss បានទទួល</span>
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1.4fr) minmax(200px, 2fr) auto', gap: '1rem', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                          {report.displayTitle}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Platform: <strong style={{ color: 'var(--text-secondary)' }}>{report.platform}</strong>
                          {isBoost && report.startBoost && (
                            <span style={{ marginLeft: '0.4rem' }}>
                              ({report.startBoost} ➔ {report.endBoost})
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isBoost ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
                        gap: '0.5rem',
                        background: 'var(--dark-inset)',
                        border: '1px solid var(--border-color)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px'
                      }}>
                        {isBoost ? (
                          <>
                            <div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Spend</div>
                              <div style={{ fontWeight: 700, color: '#FACC15', fontSize: '0.88rem' }}>${Number(report.spend || 0).toFixed(2)}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{report.metricType === 'views' ? 'Views' : 'Messages'}</div>
                              <div style={{ fontWeight: 700, color: '#38BDF8', fontSize: '0.88rem' }}>{Number(report.leads || 0).toLocaleString()}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Sales</div>
                              <div style={{ fontWeight: 700, color: 'var(--emerald-main)', fontSize: '0.88rem' }}>{report.salesClosed || 0} Closes</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ROAS</div>
                              <div style={{ fontWeight: 700, color: '#F472B6', fontSize: '0.88rem' }}>
                                {report.spend > 0 ? (report.revenue / report.spend).toFixed(1) : '0'}x
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ចំនួនកាត់</div>
                              <div style={{ fontWeight: 700, color: '#C084FC', fontSize: '0.88rem' }}>{report.videosCount || 1} វីដេអូ</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ចំនួន Hooks</div>
                              <div style={{ fontWeight: 700, color: '#38BDF8', fontSize: '0.88rem' }}>{report.hooksCount || 1} Hooks</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ទម្រង់</div>
                              <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{report.videoFormat || '9:16'}</div>
                            </div>
                          </>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-end' }}>
                        {(report.boostLink || report.driveLink) && (
                          <a 
                            href={report.boostLink || report.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ fontSize: '0.72rem', padding: '0.3rem 0.65rem', height: 'auto', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                          >
                            <ExternalLink size={12} />
                            <span>{isBoost ? 'Link Boost' : 'Drive វីដេអូ'}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: WEEKLY CONTENT PRODUCTION MONITORING                           */}
      {/* ========================================================================= */}
      {activeSubTab === 'weekly-content' && (
        <div className="card-box" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                📅 តាមដាន Content Upload តាម Week (Weekly Content Production)
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                រាល់ Content ដែលបុគ្គលិកផលិត និង Upload តាមសប្តាហ៍នីមួយៗក្នុងខែ
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--dark-inset)', padding: '3px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--emerald-main)', padding: '0.35rem 0.75rem' }}>
                សរុប {weeklyContents.length} Content
              </span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>សប្តាហ៍ (Week)</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>ប្រធានបទ Content</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>ប្រភេទ & Platform</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>អ្នក Upload</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 1rem' }}>ស្ថានភាព</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 1rem' }}>Link</th>
                </tr>
              </thead>
              <tbody>
                {weeklyContents.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        background: 'rgba(234, 179, 8, 0.15)',
                        color: '#FACC15',
                        border: '1px solid rgba(234, 179, 8, 0.3)'
                      }}>
                        {c.week}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                        {c.date}
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                        {c.title}
                      </div>
                      {c.notes && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          📝 {c.notes}
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {c.contentType}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#38BDF8' }}>
                        {c.platform}
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img 
                          src={c.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                          alt={c.authorName} 
                          style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {c.authorName}
                        </span>
                      </div>
                    </td>

                    <td style={{ textAlign: 'center', padding: '0.85rem 1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#34D399',
                        border: '1px solid rgba(16, 185, 129, 0.3)'
                      }}>
                        {c.status || 'Ready'}
                      </span>
                    </td>

                    <td style={{ textAlign: 'center', padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                        {c.driveLink && (
                          <a 
                            href={c.driveLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-outline"
                            style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem', height: 'auto' }}
                          >
                            <ExternalLink size={12} /> Drive
                          </a>
                        )}
                        {c.boostLink && (
                          <a 
                            href={c.boostLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-outline"
                            style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem', height: 'auto', color: '#38BDF8', borderColor: 'rgba(56, 189, 248, 0.3)' }}
                          >
                            <ExternalLink size={12} /> Post
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Staff Modal */}
      <CreateStaffModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onAddUser={onAddUser}
        users={users}
      />

    </div>
  );
}
