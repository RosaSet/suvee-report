import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DailyReportView from './components/DailyReportView';
import AdminPortal from './components/AdminPortal';
import LoginModal from './components/LoginModal';
import ProfileModal from './components/ProfileModal';
import CreateStaffModal from './components/CreateStaffModal';
import ErrorBoundary from './components/ErrorBoundary';

import { 
  INITIAL_DAILY_REPORTS, 
  INITIAL_VIDEO_REPORTS,
  INITIAL_EDITOR_REPORTS,
  INITIAL_USERS,
  INITIAL_WEEKLY_CONTENTS
} from './data/initialData';
import { dataService } from './services/dataService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateStaffModal, setShowCreateStaffModal] = useState(false);
  const reportFormRef = useRef(null);

  // Theme State: 'dark' (default) or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('suvee_theme') || 'dark';
  });

  // Apply theme attribute to html and body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('suvee_theme', theme);
  }, [theme]);

  // =========================================================
  // USER AUTHENTICATION & STAFF ROLES
  // =========================================================
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('suvee_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error loading users:", e);
      }
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('suvee_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading current user:", e);
      }
    }
    return INITIAL_USERS[0];
  });

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('suvee_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('suvee_current_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleAddUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    dataService.insertUser(newUser);
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    dataService.deleteUser(userId);
    if (currentUser?.id === userId) {
      setCurrentUser(users.find(u => u.role === 'Admin') || INITIAL_USERS[0]);
    }
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    dataService.updateUser(updatedUser);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowLoginModal(false);
  };

  const handleSwitchUser = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setShowLoginModal(true);
  };

  // Route protection by role
  useEffect(() => {
    if (currentUser?.role === 'Admin' && activeTab === 'daily-report') {
      setActiveTab('dashboard');
    } else if (currentUser?.role !== 'Admin' && activeTab === 'admin-portal') {
      setActiveTab('dashboard');
    }
  }, [currentUser?.role, activeTab]);

  // =========================================================
  // REPORTS & WEEKLY CONTENTS
  // =========================================================
  const [dailyReports, setDailyReports] = useState(() => {
    const saved = localStorage.getItem('suvee_daily_reports');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error loading daily reports:", e);
      }
    }
    return INITIAL_DAILY_REPORTS;
  });

  const [editorReports, setEditorReports] = useState(() => {
    const saved = localStorage.getItem('suvee_editor_reports');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error loading editor reports:", e);
      }
    }
    return INITIAL_EDITOR_REPORTS;
  });

  const sanitizeWeeklyContent = (item) => {
    if (!item || typeof item !== 'object') return null;
    return {
      id: item.id || `cnt-${Date.now()}-${Math.random()}`,
      week: item.week || 'Week 1',
      weekLabel: item.weekLabel || item.week || 'Week 1',
      date: item.date || '2026-10-01',
      title: typeof item.title === 'string' ? item.title : (item.title?.name || 'Untitled Content'),
      contentType: item.contentType || 'Short-form Video (9:16)',
      platform: item.platform || 'TikTok & Reels',
      driveLink: typeof item.driveLink === 'string' ? item.driveLink : '',
      boostLink: typeof item.boostLink === 'string' ? item.boostLink : '',
      status: item.status || 'Ready to Launch',
      notes: typeof item.notes === 'string' ? item.notes : '',
      scriptFileName: typeof item.scriptFileName === 'string' ? item.scriptFileName : (item.scriptFileName?.name || ''),
      scriptFileSize: typeof item.scriptFileSize === 'string' ? item.scriptFileSize : '',
      scriptFileUrl: typeof item.scriptFileUrl === 'string' ? item.scriptFileUrl : '',
      scriptText: typeof item.scriptText === 'string' ? item.scriptText : '',
      authorId: item.authorId || 'usr-marketing',
      authorName: item.authorName || 'Staff Member',
      authorRole: item.authorRole || 'Digital Marketing',
      authorAvatar: item.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    };
  };

  // Weekly Contents State (Upload Content តាម Week)
  const [weeklyContents, setWeeklyContents] = useState(() => {
    const saved = localStorage.getItem('suvee_weekly_contents');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeWeeklyContent).filter(Boolean);
        }
      } catch (e) {
        console.error("Error loading weekly contents:", e);
      }
    }
    return INITIAL_WEEKLY_CONTENTS.map(sanitizeWeeklyContent).filter(Boolean);
  });

  // Clear all data to fresh empty state
  const handleClearAllData = async () => {
    if (window.confirm("តើអ្នកពិតជាចង់សម្អាតទិន្នន័យរបាយការណ៍ទាំងអស់ឱ្យទៅជាទទេ (Empty Data) ដើម្បីចាប់ផ្តើមបញ្ចូលទិន្នន័យថ្មីមែនទេ?")) {
      setDailyReports([]);
      setEditorReports([]);
      setWeeklyContents([]);
      localStorage.setItem('suvee_daily_reports', JSON.stringify([]));
      localStorage.setItem('suvee_editor_reports', JSON.stringify([]));
      localStorage.setItem('suvee_weekly_contents', JSON.stringify([]));

      if (dataService.isConfigured) {
        await dataService.clearAllReports();
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('suvee_daily_reports', JSON.stringify(dailyReports));
  }, [dailyReports]);

  useEffect(() => {
    localStorage.setItem('suvee_editor_reports', JSON.stringify(editorReports));
  }, [editorReports]);

  useEffect(() => {
    try {
      localStorage.setItem('suvee_weekly_contents', JSON.stringify(weeklyContents));
    } catch (e) {
      console.warn("Storage quota exceeded, storing lightweight copy without huge dataUrls", e);
      try {
        const lightweight = (weeklyContents || []).map(c => ({
          ...c,
          scriptFileUrl: c.scriptFileUrl?.length > 100000 ? '' : c.scriptFileUrl
        }));
        localStorage.setItem('suvee_weekly_contents', JSON.stringify(lightweight));
      } catch (err2) {
        console.error("Storage error:", err2);
      }
    }
  }, [weeklyContents]);

  // Overall Aggregated Stats
  const totalSpend = (dailyReports || []).reduce((sum, r) => sum + Number(r.spend || 0), 0);
  const totalLeads = (dailyReports || []).reduce((sum, r) => sum + Number(r.leads || 0), 0);
  const totalRevenue = (dailyReports || []).reduce((sum, r) => sum + Number(r.revenue || 0), 0);
  const totalSalesClosed = (dailyReports || []).reduce((sum, r) => sum + Number(r.salesClosed || 0), 0);
  const avgCPA = totalLeads > 0 ? totalSpend / totalLeads : 0;
  const overallROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  const stats = {
    totalSpend,
    totalLeads,
    totalRevenue,
    totalSalesClosed,
    avgCPA,
    overallROAS
  };

  // Supabase Real-time / Initial Fetch
  useEffect(() => {
    if (dataService.isConfigured) {
      dataService.fetchAll().then(res => {
        if (res) {
          if (res.users && res.users.length > 0) setUsers(res.users);
          if (res.dailyReports !== undefined) setDailyReports(res.dailyReports || []);
          if (res.editorReports !== undefined) setEditorReports(res.editorReports || []);
          if (res.weeklyContents !== undefined) {
            setWeeklyContents((res.weeklyContents || []).map(sanitizeWeeklyContent).filter(Boolean));
          }
        }
      });
    }
  }, []);

  const handleAddReport = (newReport) => {
    setDailyReports(prev => [newReport, ...prev]);
    dataService.insertDailyReport(newReport);
  };

  const handleDeleteReport = (id) => {
    if (window.confirm("តើអ្នកពិតជាចង់លុបរបាយការណ៍នេះមែនទេ?")) {
      setDailyReports(prev => prev.filter(r => r.id !== id));
      dataService.deleteDailyReport(id);
    }
  };

  const handleAddEditorReport = (newEditorReport) => {
    setEditorReports(prev => [newEditorReport, ...prev]);
    dataService.insertEditorReport(newEditorReport);
  };

  const handleDeleteEditorReport = (id) => {
    if (window.confirm("តើអ្នកពិតជាចង់លុបរបាយការណ៍កាត់តវីដេអូនេះមែនទេ?")) {
      setEditorReports(prev => prev.filter(r => r.id !== id));
      dataService.deleteEditorReport(id);
    }
  };

  const handleUpdateDailyReport = (updatedReport) => {
    setDailyReports(prev => prev.map(r => r.id === updatedReport.id ? updatedReport : r));
    dataService.updateDailyReport(updatedReport);
  };

  const handleUpdateEditorReport = (updatedReport) => {
    setEditorReports(prev => prev.map(r => r.id === updatedReport.id ? updatedReport : r));
    dataService.updateEditorReport(updatedReport);
  };

  const handleUpdateWeeklyContent = (updatedContent) => {
    const cleanContent = sanitizeWeeklyContent(updatedContent) || updatedContent;
    setWeeklyContents(prev => prev.map(c => c.id === cleanContent.id ? cleanContent : c));
    dataService.updateWeeklyContent(cleanContent);
  };

  const handleAddWeeklyContent = (newContent) => {
    const cleanContent = sanitizeWeeklyContent(newContent) || newContent;
    setWeeklyContents(prev => [cleanContent, ...prev]);
    dataService.insertWeeklyContent(cleanContent);
  };

  const handleDeleteWeeklyContent = (id) => {
    if (window.confirm("តើអ្នកពិតជាចង់លុប Content នេះមែនទេ?")) {
      setWeeklyContents(prev => prev.filter(c => c.id !== id));
      dataService.deleteWeeklyContent(id);
    }
  };

  const handleQuickNewReport = () => {
    setActiveTab('daily-report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportCSV = () => {
    if (!dailyReports || dailyReports.length === 0) {
      alert("មិនមានទិន្នន័យដើម្បី Export ទេ");
      return;
    }

    const headers = [
      "ID",
      "Author",
      "Date",
      "Platform",
      "Campaign Name",
      "Objective",
      "Spend ($)",
      "Leads/Messages",
      "Sales Closed",
      "Revenue ($)",
      "ROAS",
      "Status",
      "Notes"
    ];

    const rows = dailyReports.map(r => {
      const roas = r.spend > 0 ? (r.revenue / r.spend).toFixed(2) : '0';
      return [
        `"${r.id}"`,
        `"${r.authorName || 'Vannak'}"`,
        `"${r.date}"`,
        `"${r.platform}"`,
        `"${(r.campaignName || '').replace(/"/g, '""')}"`,
        `"${r.objective}"`,
        r.spend,
        r.leads || 0,
        r.salesClosed || 0,
        r.revenue || 0,
        roas,
        `"${r.status}"`,
        `"${(r.notes || '').replace(/"/g, '""')}"`
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SUVEE_Report_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickNewReport={handleQuickNewReport}
        onOpenAddStaff={() => setShowCreateStaffModal(true)}
        onExportCSV={handleExportCSV}
        theme={theme}
        setTheme={setTheme}
        currentUser={currentUser}
        onOpenLogin={() => setShowLoginModal(true)}
        onOpenProfile={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        isCloudConnected={dataService.isConfigured}
      />

      {/* Main Content Rendered based on Active Tab */}
      <main className="main-content">
        <ErrorBoundary onReset={() => setActiveTab('dashboard')}>
          {activeTab === 'dashboard' && (
            <Dashboard 
              dailyReports={dailyReports}
              onUpdateDailyReport={handleUpdateDailyReport}
              editorReports={editorReports}
              onUpdateEditorReport={handleUpdateEditorReport}
              weeklyContents={weeklyContents}
              onUpdateWeeklyContent={handleUpdateWeeklyContent}
              users={users}
              currentUser={currentUser}
              stats={stats}
              onNavigateToReport={handleQuickNewReport}
              onOpenAddStaff={() => setShowCreateStaffModal(true)}
              onClearAllData={handleClearAllData}
            />
          )}

          {activeTab === 'daily-report' && (
            <DailyReportView 
              dailyReports={dailyReports}
              onAddReport={handleAddReport}
              onDeleteReport={handleDeleteReport}
              editorReports={editorReports}
              onAddEditorReport={handleAddEditorReport}
              onDeleteEditorReport={handleDeleteEditorReport}
              weeklyContents={weeklyContents}
              onAddWeeklyContent={handleAddWeeklyContent}
              onDeleteWeeklyContent={handleDeleteWeeklyContent}
              currentUser={currentUser}
              onClearAllData={handleClearAllData}
            />
          )}

          {activeTab === 'admin-portal' && (
            <AdminPortal 
              currentUser={currentUser}
              users={users}
              onAddUser={handleAddUser}
              onDeleteUser={handleDeleteUser}
              onSwitchUser={handleSwitchUser}
              dailyReports={dailyReports}
              editorReports={editorReports}
              weeklyContents={weeklyContents}
              onUpdateDailyReport={handleUpdateDailyReport}
              onUpdateEditorReport={handleUpdateEditorReport}
              onUpdateWeeklyContent={handleUpdateWeeklyContent}
            />
          )}
        </ErrorBoundary>
      </main>

      {/* Modals */}
      <CreateStaffModal
        isOpen={showCreateStaffModal}
        onClose={() => setShowCreateStaffModal(false)}
        onAddUser={handleAddUser}
        users={users}
      />

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        users={users}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onUpdateProfile={handleUpdateProfile}
      />

      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        currentUser={currentUser}
        onUpdateProfile={handleUpdateProfile}
        dailyReports={dailyReports}
        editorReports={editorReports}
      />

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-color)', 
        padding: '1.25rem 2rem', 
        textAlign: 'center', 
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        background: 'var(--site-header-bg)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>SUVÉE Report</strong> • Digital Marketing & Video Editor Operations Portal
          </div>
          <div>
            Facebook Page Boost & TikTok Ads Executive Management Platform
          </div>
        </div>
      </footer>
    </div>
  );
}
