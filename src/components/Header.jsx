import React from 'react';
import { 
  BarChart3, 
  FileSpreadsheet, 
  Download,
  PlusCircle,
  Sun,
  Moon,
  Crown,
  ChevronDown,
  LogIn,
  User
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onQuickNewReport,
  onOpenAddStaff,
  onExportCSV,
  theme,
  setTheme,
  currentUser,
  onOpenLogin,
  onOpenProfile,
  isCloudConnected = false
}) {
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getRoleBadge = (role) => {
    if (role === 'Admin') {
      return { label: 'Boss Admin', color: '#FACC15', bg: 'rgba(234, 179, 8, 0.15)' };
    }
    if (role === 'Digital Marketing') {
      return { label: 'Marketing', color: '#60A5FA', bg: 'rgba(59, 130, 246, 0.15)' };
    }
    return { label: 'Video Editor', color: '#C084FC', bg: 'rgba(168, 85, 247, 0.15)' };
  };

  const isAdmin = currentUser?.role === 'Admin';
  const roleInfo = getRoleBadge(currentUser?.role);

  return (
    <header className="site-header" style={{ borderBottom: '1px solid var(--border-color)', backdropFilter: 'blur(16px)' }}>
      <div className="header-inner" style={{ padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Brand Logo & Title */}
        <div 
          className="brand-wrapper" 
          onClick={() => setActiveTab('dashboard')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.85rem' }}
        >
          <img src="/logo.svg" alt="SUVÉE Report" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.5px', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              SUVÉE REPORT
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.2px' }}>
              Digital Marketing & Video Ops
            </span>
          </div>
        </div>

        {/* Center Navigation Segment Control (Role-based: Admin vs Staff) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--dark-inset)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '4px',
          gap: '4px'
        }}>
          {/* Dashboard (Both Admin and Staff have this) */}
          <button 
            type="button"
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: 'none',
              background: activeTab === 'dashboard' ? 'var(--emerald-main)' : 'transparent',
              color: activeTab === 'dashboard' ? '#0F172A' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <BarChart3 size={16} />
            <span>Dashboard</span>
          </button>

          {/* STAFF ROLE: Has 'បញ្ចូលទិន្នន័យ (Input Report)' */}
          {!isAdmin && (
            <button 
              type="button"
              className={`nav-tab-btn ${activeTab === 'daily-report' ? 'active' : ''}`}
              onClick={() => setActiveTab('daily-report')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                background: activeTab === 'daily-report' ? 'var(--emerald-main)' : 'transparent',
                color: activeTab === 'daily-report' ? '#0F172A' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <FileSpreadsheet size={16} />
              <span>បញ្ចូលទិន្នន័យ (Upload Report)</span>
            </button>
          )}

          {/* ADMIN ROLE: Has 'គ្រប់គ្រងបុគ្គលិក (Staff Management)' - NO Daily Report! */}
          {isAdmin && (
            <button 
              type="button"
              className={`nav-tab-btn ${activeTab === 'admin-portal' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin-portal')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                background: activeTab === 'admin-portal' ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'transparent',
                color: activeTab === 'admin-portal' ? '#FFFFFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Crown size={16} color={activeTab === 'admin-portal' ? '#FFFFFF' : '#F59E0B'} />
              <span>គ្រប់គ្រងបុគ្គលិក (Staff Directory)</span>
            </button>
          )}
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Cloud Database Sync Status Indicator */}
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.35rem 0.65rem',
              borderRadius: '20px',
              background: isCloudConnected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(148, 163, 184, 0.12)',
              color: isCloudConnected ? 'var(--emerald-main)' : 'var(--text-secondary)',
              border: `1px solid ${isCloudConnected ? 'rgba(16, 185, 129, 0.35)' : 'var(--border-color)'}`
            }}
            title={isCloudConnected ? "🟢 Supabase Cloud Database ដំណើរការ Sync គ្រប់កុំព្យូទ័រ" : "💻 កំពុងប្រើ Local Storage លើម៉ាស៊ីននេះ"}
          >
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: isCloudConnected ? 'var(--emerald-main)' : '#94A3B8',
              boxShadow: isCloudConnected ? '0 0 8px var(--emerald-main)' : 'none'
            }} />
            <span>{isCloudConnected ? 'Cloud Sync' : 'Local Mode'}</span>
          </span>

          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? "ប្តូរទៅ Light Mode" : "ប្តូរទៅ Dark Mode"}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? <Sun size={17} color="#FBBF24" /> : <Moon size={17} color="#0D9488" />}
          </button>

          {/* Export CSV Button */}
          <button 
            className="btn btn-outline" 
            onClick={onExportCSV}
            title="ទាញយករបាយការណ៍ជា Excel / CSV"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', height: '36px' }}
          >
            <Download size={14} />
            <span>Export</span>
          </button>

          {/* Role-based Primary Action Button */}
          {isAdmin ? (
            <button 
              className="btn" 
              onClick={onOpenAddStaff || (() => setActiveTab('admin-portal'))}
              style={{ 
                padding: '0.45rem 1rem', 
                fontSize: '0.84rem', 
                height: '36px', 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)'
              }}
            >
              <PlusCircle size={15} />
              <span>+ Add Staff</span>
            </button>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={onQuickNewReport}
              style={{ padding: '0.45rem 1rem', fontSize: '0.84rem', height: '36px', fontWeight: 700 }}
            >
              <PlusCircle size={15} />
              <span>+ បញ្ចូល Report</span>
            </button>
          )}

          {/* User Profile Capsule -> Directly opens Form Login (Simple & Clean) */}
          {currentUser ? (
            <button 
              type="button"
              className="btn btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '4px 10px 4px 5px',
                borderRadius: '24px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                height: '38px',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
              onClick={onOpenLogin}
              title="ចុចដើម្បីកែប្រែ Profile (ប្តូរឈ្មោះ រូបភាព) ឬ Switch Account"
            >
              <img 
                src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                alt={currentUser.name}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${roleInfo.color}`
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingRight: '2px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {currentUser.name}
                </span>
                <span style={{ fontSize: '0.64rem', fontWeight: 600, color: roleInfo.color }}>
                  {roleInfo.label}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--emerald-main)',
                paddingLeft: '6px',
                borderLeft: '1px solid var(--border-color)'
              }}>
                <User size={13} />
                <span>Profile</span>
              </div>
            </button>
          ) : (
            <button
              className="btn btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', height: '36px' }}
              onClick={onOpenLogin}
            >
              <LogIn size={14} />
              <span>Form Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
