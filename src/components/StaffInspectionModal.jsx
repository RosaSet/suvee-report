import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Scissors, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  FolderOpen, 
  FileText, 
  User, 
  Phone, 
  Clock, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import ScriptModal from './ScriptModal';

export default function StaffInspectionModal({
  isOpen,
  onClose,
  staff,
  allStaffs = [],
  onSelectStaff,
  dailyReports = [],
  editorReports = [],
  weeklyContents = [],
  onApproveReport,
  onRequestRevision
}) {
  const [activeOption, setActiveOption] = useState('boost'); // 'boost', 'editor', 'content'
  const [selectedScriptContent, setSelectedScriptContent] = useState(null);

  if (!isOpen || !staff) return null;

  // Filter reports specifically for this staff member
  const staffBoostReports = dailyReports.filter(r => 
    r.authorId === staff.id || 
    r.authorName?.toLowerCase() === staff.name?.toLowerCase() ||
    r.authorName?.toLowerCase() === staff.username?.toLowerCase()
  );

  const staffEditorReports = editorReports.filter(r => 
    r.authorId === staff.id || 
    r.authorName?.toLowerCase() === staff.name?.toLowerCase() ||
    r.editorName?.toLowerCase() === staff.name?.toLowerCase() ||
    r.authorName?.toLowerCase() === staff.username?.toLowerCase()
  );

  const staffWeeklyContents = weeklyContents.filter(r => 
    r.authorId === staff.id || 
    r.authorName?.toLowerCase() === staff.name?.toLowerCase() ||
    r.authorName?.toLowerCase() === staff.username?.toLowerCase()
  );

  // Department 1: Boost metrics for this staff
  const staffSpend = staffBoostReports.reduce((sum, r) => sum + Number(r.spend || 0), 0);
  const staffRevenue = staffBoostReports.reduce((sum, r) => sum + Number(r.revenue || 0), 0);
  const staffLeads = staffBoostReports.reduce((sum, r) => sum + Number(r.leads || 0), 0);
  const staffROAS = staffSpend > 0 ? (staffRevenue / staffSpend).toFixed(2) : '0.00';

  // Department 2: Video Editor metrics for this staff
  const staffVideos = staffEditorReports.reduce((sum, r) => sum + Number(r.videosCount || 0), 0);
  const staffHooks = staffEditorReports.reduce((sum, r) => sum + Number(r.hooksCount || 0), 0);
  const staffAvgHooks = staffVideos > 0 ? (staffHooks / staffVideos).toFixed(1) : '0.0';

  // Department 3: Weekly Content metrics for this staff
  const staffW1 = staffWeeklyContents.filter(c => c.week === 'Week 1').length;
  const staffW2 = staffWeeklyContents.filter(c => c.week === 'Week 2').length;
  const staffW3 = staffWeeklyContents.filter(c => c.week === 'Week 3').length;
  const staffW4 = staffWeeklyContents.filter(c => c.week === 'Week 4').length;
  const staffTotalContents = staffWeeklyContents.length;

  const totalAllUploads = staffBoostReports.length + staffEditorReports.length + staffWeeklyContents.length;

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 100000 }}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '980px', width: '96vw', maxHeight: '92vh', padding: '1.75rem' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header & Staff Info Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '1.5rem'
        }}>
          {/* Staff Profile Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src={staff.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'} 
              alt={staff.name}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--emerald-main)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {staff.name}
                </h3>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: staff.role === 'Admin' ? 'rgba(245, 158, 11, 0.15)' : staff.role === 'Digital Marketing' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(192, 132, 252, 0.15)',
                  color: staff.role === 'Admin' ? '#F59E0B' : staff.role === 'Digital Marketing' ? '#38BDF8' : '#C084FC',
                  border: '1px solid currentColor'
                }}>
                  {staff.role}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  @{staff.username}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <span>📅 ចូលធ្វើការ: <strong>{staff.startDate || '2024-01-01'}</strong></span>
                {staff.phone && <span>📞 ទូរស័ព្ទ: <strong>{staff.phone}</strong></span>}
                <span>📦 សរុប Upload ទាំងអស់: <strong style={{ color: 'var(--emerald-main)' }}>{totalAllUploads} របាយការណ៍</strong></span>
              </div>
            </div>
          </div>

          {/* Right Header: Staff Switcher Dropdown & Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {allStaffs.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--dark-inset)', padding: '0.35rem 0.65rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <Filter size={14} color="var(--emerald-main)" />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ប្តូរ Staff:</span>
                <select
                  value={staff.id}
                  onChange={(e) => {
                    const found = allStaffs.find(s => s.id === e.target.value);
                    if (found && onSelectStaff) onSelectStaff(found);
                  }}
                  className="form-select"
                  style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', width: 'auto', border: 'none', background: 'transparent', fontWeight: 700, color: 'var(--text-primary)' }}
                >
                  {allStaffs.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.role})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={onClose}
              title="បិទផ្ទាំង"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* THE 3 CORE OPTIONS / TABS (Boost Page, Video Editor, Content)  */}
        {/* ============================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          {/* OPTION 1: BOOST PAGE */}
          <button
            type="button"
            onClick={() => setActiveOption('boost')}
            style={{
              padding: '1rem',
              borderRadius: '12px',
              border: activeOption === 'boost' ? '2px solid #38BDF8' : '1px solid var(--border-color)',
              background: activeOption === 'boost' ? 'rgba(56, 189, 248, 0.12)' : 'var(--dark-inset)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: activeOption === 'boost' ? '#38BDF8' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} />
                <span>🔵 Boost Page & Ads</span>
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', background: activeOption === 'boost' ? '#38BDF8' : 'rgba(255,255,255,0.08)', color: activeOption === 'boost' ? '#0F172A' : 'var(--text-secondary)' }}>
                {staffBoostReports.length} Reports
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Spend: <strong style={{ color: '#FACC15' }}>${staffSpend.toFixed(2)}</strong> • ROAS: <strong style={{ color: 'var(--emerald-main)' }}>{staffROAS}x</strong>
            </div>
          </button>

          {/* OPTION 2: VIDEO EDITOR */}
          <button
            type="button"
            onClick={() => setActiveOption('editor')}
            style={{
              padding: '1rem',
              borderRadius: '12px',
              border: activeOption === 'editor' ? '2px solid #C084FC' : '1px solid var(--border-color)',
              background: activeOption === 'editor' ? 'rgba(192, 132, 252, 0.12)' : 'var(--dark-inset)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: activeOption === 'editor' ? '#C084FC' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scissors size={16} />
                <span>✂️ Video Editor Output</span>
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', background: activeOption === 'editor' ? '#C084FC' : 'rgba(255,255,255,0.08)', color: activeOption === 'editor' ? '#0F172A' : 'var(--text-secondary)' }}>
                {staffEditorReports.length} Reports
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              កាត់បាន: <strong style={{ color: '#C084FC' }}>{staffVideos} Vids</strong> • Hooks: <strong style={{ color: '#38BDF8' }}>{staffHooks}</strong> ({staffAvgHooks}x)
            </div>
          </button>

          {/* OPTION 3: CONTENT តាម WEEK */}
          <button
            type="button"
            onClick={() => setActiveOption('content')}
            style={{
              padding: '1rem',
              borderRadius: '12px',
              border: activeOption === 'content' ? '2px solid #FACC15' : '1px solid var(--border-color)',
              background: activeOption === 'content' ? 'rgba(250, 204, 21, 0.12)' : 'var(--dark-inset)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: activeOption === 'content' ? '#FACC15' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} />
                <span>📅 Content តាម Week</span>
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', background: activeOption === 'content' ? '#FACC15' : 'rgba(255,255,255,0.08)', color: activeOption === 'content' ? '#0F172A' : 'var(--text-secondary)' }}>
                {staffTotalContents} Contents
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              W1: <strong>{staffW1}</strong> • W2: <strong>{staffW2}</strong> • W3: <strong>{staffW3}</strong> • W4: <strong>{staffW4}</strong>
            </div>
          </button>
        </div>

        {/* ============================================================== */}
        {/* OPTION CONTENT DETAILS (TABLES + ACTIONS)                      */}
        {/* ============================================================== */}

        {/* 1. BOOST PAGE DETAILS FOR THIS STAFF */}
        {activeOption === 'boost' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                របាយការណ៍ Boost Ads ដែល {staff.name} បានបញ្ចូល ({staffBoostReports.length})
              </h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                សរុប Spend: ${staffSpend.toFixed(2)} | Leads: {staffLeads.toLocaleString()}
              </span>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>Campaign & Platform</th>
                    <th>គោលដៅ Boost</th>
                    <th style={{ textAlign: 'right' }}>Spend</th>
                    <th style={{ textAlign: 'right' }}>Leads</th>
                    <th style={{ textAlign: 'right' }}>Revenue</th>
                    <th style={{ textAlign: 'center' }}>ROAS</th>
                    <th style={{ textAlign: 'center' }}>Link Boost</th>
                    <th>ស្ថានភាព</th>
                    <th style={{ textAlign: 'center' }}>Boss Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffBoostReports.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>🔵</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          បុគ្គលិក {staff.name} មិនទាន់មានទិន្នន័យ Boost Page & TikTok នៅឡើយទេ
                        </div>
                        <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                          បង្ហាញចំនួន: <strong>0 Spend • 0 Leads • 0 Reports</strong>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    staffBoostReports.map((row) => (
                      <tr key={row.id}>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                          <div>{row.startBoost || row.date}</div>
                          {row.endBoost && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>➔ {row.endBoost}</div>}
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.campaignName}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{row.platform}</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            {row.objective || 'Sale'}
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
                        <td style={{ textAlign: 'center', fontWeight: 800, color: '#FACC15' }}>
                          {row.spend > 0 ? (row.revenue / row.spend).toFixed(1) : '0'}x
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {row.boostLink ? (
                            <a href={row.boostLink} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}>
                              <ExternalLink size={11} /> Link
                            </a>
                          ) : '-'}
                        </td>
                        <td>
                          {row.status === 'Needs Revision' ? (
                            <div>
                              <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                ⚠️ ត្រូវកែសម្រួល
                              </span>
                              {row.adminFeedback && (
                                <div style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '2px' }}>
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
                        <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => onApproveReport && onApproveReport(row.id, 'boost')}
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-main)', border: '1px solid rgba(16, 185, 129, 0.4)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                            >
                              <CheckCircle2 size={11} /> Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => onRequestRevision && onRequestRevision({
                                id: row.id,
                                type: 'boost',
                                title: row.campaignName,
                                authorName: staff.name,
                                date: row.date
                              })}
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.35)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                            >
                              <AlertTriangle size={11} /> សុំកែ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. VIDEO EDITOR DETAILS FOR THIS STAFF */}
        {activeOption === 'editor' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                របាយការណ៍ Video Editor ដែល {staff.name} បានបញ្ចូល ({staffEditorReports.length})
              </h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                កាត់បាន: {staffVideos} Vids | Hooks: {staffHooks} ({staffAvgHooks}x)
              </span>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>ប្រធានបទវីដេអូ (Title)</th>
                    <th>Platform & Format</th>
                    <th style={{ textAlign: 'center' }}>ចំនួនកាត់បាន</th>
                    <th style={{ textAlign: 'center' }}>ចំនួន Hooks</th>
                    <th>ស្ថានភាព</th>
                    <th style={{ textAlign: 'center' }}>Drive Link</th>
                    <th>សម្គាល់ (Notes)</th>
                    <th style={{ textAlign: 'center' }}>Boss Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffEditorReports.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>✂️</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          បុគ្គលិក {staff.name} មិនទាន់មានទិន្នន័យ Video Editor នៅឡើយទេ
                        </div>
                        <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                          បង្ហាញចំនួន: <strong>0 Videos • 0 Hooks • 0 Reports</strong>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    staffEditorReports.map((row) => (
                      <tr key={row.id}>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{row.date}</td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.videoTitle}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{row.platform}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{row.videoFormat || '9:16 Vertical'}</div>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.85rem' }}>
                            {row.videosCount} Vids
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#0284C7', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.85rem' }}>
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
                                <div style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '2px' }}>
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
                            <a href={row.driveLink} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}>
                              <FolderOpen size={11} color="#0284C7" /> Drive
                            </a>
                          ) : '-'}
                        </td>
                        <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '180px' }}>
                          {row.notes || '-'}
                        </td>
                        <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => onApproveReport && onApproveReport(row.id, 'editor')}
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-main)', border: '1px solid rgba(16, 185, 129, 0.4)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                            >
                              <CheckCircle2 size={11} /> Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => onRequestRevision && onRequestRevision({
                                id: row.id,
                                type: 'editor',
                                title: row.videoTitle,
                                authorName: staff.name,
                                date: row.date
                              })}
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.35)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                            >
                              <AlertTriangle size={11} /> សុំកែ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. WEEKLY CONTENT DETAILS FOR THIS STAFF */}
        {activeOption === 'content' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Content តាម Week ដែល {staff.name} បានបញ្ចូល ({staffWeeklyContents.length})
              </h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                W1: {staffW1} | W2: {staffW2} | W3: {staffW3} | W4: {staffW4}
              </span>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '90px' }}>សប្តាហ៍</th>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>ប្រធានបទ Content (Title / Hook)</th>
                    <th>ទម្រង់ & Platform</th>
                    <th>ស្ថានភាព</th>
                    <th style={{ textAlign: 'center' }}>ឯកសារ Script (PC)</th>
                    <th style={{ textAlign: 'center' }}>Links</th>
                    <th>សម្គាល់ (Notes)</th>
                    <th style={{ textAlign: 'center' }}>Boss Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffWeeklyContents.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>📅</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          បុគ្គលិក {staff.name} មិនទាន់មានទិន្នន័យ Weekly Content នៅឡើយទេ
                        </div>
                        <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                          បង្ហាញចំនួន: <strong>0 Contents គ្រប់សប្តាហ៍ (W1-W4)</strong>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    staffWeeklyContents.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
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
                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>{row.date}</td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.title}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>{row.contentType}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{row.platform}</div>
                        </td>
                        <td>
                          {row.status === 'Needs Revision' ? (
                            <div>
                              <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                ⚠️ ត្រូវកែសម្រួល
                              </span>
                              {row.adminFeedback && (
                                <div style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: '2px' }}>
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
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            >
                              <FileText size={11} color="var(--emerald-main)" />
                              <span>{row.scriptFileName ? (row.scriptFileName.length > 12 ? row.scriptFileName.slice(0, 10) + '...' : row.scriptFileName) : 'Script'}</span>
                            </button>
                          ) : '-'}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                            {row.driveLink && (
                              <a href={row.driveLink} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}>
                                <FolderOpen size={11} color="#0284C7" /> Drive
                              </a>
                            )}
                            {row.boostLink && (
                              <a href={row.boostLink} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }}>
                                <ExternalLink size={11} color="var(--emerald-main)" /> Post
                              </a>
                            )}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '160px' }}>
                          {row.notes || '-'}
                        </td>
                        <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => onApproveReport && onApproveReport(row.id, 'content')}
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald-main)', border: '1px solid rgba(16, 185, 129, 0.4)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                            >
                              <CheckCircle2 size={11} /> Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => onRequestRevision && onRequestRevision({
                                id: row.id,
                                type: 'content',
                                title: row.title,
                                authorName: staff.name,
                                date: row.date
                              })}
                              style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.35)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                            >
                              <AlertTriangle size={11} /> សុំកែ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={onClose}
            style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
          >
            បិទផ្ទាំង (Close)
          </button>
        </div>

        {/* SCRIPT PREVIEW MODAL */}
        <ScriptModal
          isOpen={!!selectedScriptContent}
          onClose={() => setSelectedScriptContent(null)}
          content={selectedScriptContent}
        />
      </div>
    </div>
  );
}
