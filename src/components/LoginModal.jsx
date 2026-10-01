import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  User, 
  KeyRound, 
  ShieldCheck, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Crown, 
  Sparkles, 
  Scissors, 
  TrendingUp,
  Camera,
  Upload,
  Phone,
  Save,
  LogIn
} from 'lucide-react';

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
];

export default function LoginModal({ 
  isOpen, 
  onClose, 
  users = [], 
  currentUser,
  onLoginSuccess,
  onUpdateProfile
}) {
  // Tabs: 'profile' (Edit Profile) or 'login' (Switch / Login)
  const [activeTab, setActiveTab] = useState('profile');
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Profile Edit form state
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrorMsg, setProfileErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Sync profile form with currentUser when opened
  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name || '');
      setEditPhone(currentUser.phone || '');
      setEditAvatar(currentUser.avatar || AVATAR_PRESETS[0]);
      setEditPassword(currentUser.password || '');
      setActiveTab('profile');
    } else {
      setActiveTab('login');
    }
    setLoginError('');
    setProfileSuccessMsg('');
    setProfileErrorMsg('');
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  // Handle Photo upload from PC
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setProfileErrorMsg('សូមជ្រើសរើសប្រភេទ File រូបភាព (JPG, PNG, WebP)!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setEditAvatar(event.target.result);
      setProfileSuccessMsg('បានបញ្ចូលរូបភាពជោគជ័យ! សូមចុចរក្សាទុក (Save)');
    };
    reader.readAsDataURL(file);
  };

  // Handle Profile Update Submission
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileErrorMsg('');
    setProfileSuccessMsg('');

    if (!editName.trim()) {
      setProfileErrorMsg('សូមបញ្ចូលឈ្មោះបុគ្គលិក!');
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: editName.trim(),
      phone: editPhone.trim(),
      avatar: editAvatar,
      password: editPassword.trim() ? editPassword.trim() : currentUser.password
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedUser);
    }

    setProfileSuccessMsg('ព័ត៌មាន Profile និងឈ្មោះត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ! 🎉');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!username.trim() || !password.trim()) {
      setLoginError('សូមបញ្ចូលឈ្មោះគណនី និងលេខសម្ងាត់');
      return;
    }

    const matchedUser = users.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );

    if (matchedUser) {
      onLoginSuccess(matchedUser);
      onClose();
    } else {
      setLoginError('ឈ្មោះគណនី ឬលេខសម្ងាត់មិនត្រឹមត្រូវទេ! (គណនីត្រូវតែបង្កើតដោយ Boss/Admin ជាមុនសិន)');
    }
  };

  // Quick switch credentials for demo/testing
  const handleQuickLogin = (uname, pwd) => {
    setUsername(uname);
    setPassword(pwd);
    setLoginError('');
    const matchedUser = users.find(
      u => u.username.toLowerCase() === uname.toLowerCase() && u.password === pwd
    );
    if (matchedUser) {
      onLoginSuccess(matchedUser);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '500px', width: '92%' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--emerald-main), var(--accent-gold))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}>
              {activeTab === 'profile' ? <User size={22} color="#0F172A" /> : <Lock size={22} color="#0F172A" />}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeTab === 'profile' ? 'Profile របស់ខ្ញុំ (កែប្រែឈ្មោះ & រូប)' : 'ចូលប្រើប្រព័ន្ធ (Staff & Boss Login)'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                SUVÉE Report Management Portal
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection Header */}
        <div style={{
          display: 'flex',
          background: 'var(--dark-inset)',
          padding: '4px',
          borderRadius: '10px',
          margin: '1rem 0 0.5rem 0',
          gap: '4px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'profile' ? 'var(--emerald-main)' : 'transparent',
              color: activeTab === 'profile' ? '#0F172A' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={15} />
            <span>Profile របស់ខ្ញុំ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'login' ? 'var(--emerald-main)' : 'transparent',
              color: activeTab === 'login' ? '#0F172A' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <LogIn size={15} />
            <span>ចូលប្រព័ន្ធ / Switch User</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: PROFILE EDIT (Photo & Name) */}
        {/* ============================================================== */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            
            {profileErrorMsg && (
              <div style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#F87171',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={17} />
                <span>{profileErrorMsg}</span>
              </div>
            )}

            {profileSuccessMsg && (
              <div style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: 'var(--emerald-main)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600
              }}>
                <CheckCircle2 size={17} />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            {/* Avatar Section */}
            <div style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={editAvatar} 
                  alt="Profile Avatar"
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--emerald-main)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = AVATAR_PRESETS[0];
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="ប្តូររូបភាព Profile (Choose from PC)"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--emerald-main)',
                    color: '#0F172A',
                    border: '2px solid var(--site-header-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                  }}
                >
                  <Camera size={15} />
                </button>
              </div>

              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', height: '30px' }}
                >
                  <Upload size={13} />
                  <span>ជ្រើសរើសរូបពី PC</span>
                </button>
              </div>

              {/* Preset Avatars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.2rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ឬជ្រើសរូបគំរូ:</span>
                {AVATAR_PRESETS.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preset ${idx + 1}`}
                    onClick={() => setEditAvatar(url)}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: editAvatar === url ? '2px solid var(--emerald-main)' : '1px solid var(--border-color)',
                      transform: editAvatar === url ? 'scale(1.15)' : 'scale(1)',
                      transition: 'all 0.15s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Name Input Field */}
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={15} color="var(--emerald-main)" />
                <span>ឈ្មោះបុគ្គលិក / Boss (Staff Name) *</span>
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="ឧ. Vannak Meas, Sokha..."
                value={editName}
                onChange={e => setEditName(e.target.value)}
                required
              />
            </div>

            {/* Phone & Username Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} color="var(--emerald-main)" />
                  <span>លេខទូរស័ព្ទ (Phone)</span>
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="012 345 678"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <KeyRound size={14} color="var(--emerald-main)" />
                  <span>លេខសម្ងាត់ថ្មី (Password)</span>
                </label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="ទុកដដែល ឬប្តូរថ្មី..."
                  value={editPassword}
                  onChange={e => setEditPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Readonly Info: Role and Username */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              background: 'var(--dark-inset)',
              border: '1px solid var(--border-color)',
              fontSize: '0.8rem'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>
                គណនី: <strong style={{ color: 'var(--text-primary)' }}>@{currentUser?.username || 'user'}</strong>
              </span>
              <span style={{
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700,
                background: currentUser?.role === 'Admin' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                color: currentUser?.role === 'Admin' ? '#FACC15' : 'var(--emerald-main)'
              }}>
                {currentUser?.role === 'Admin' ? '👑 Boss Admin' : currentUser?.role}
              </span>
            </div>

            {/* Submit / Save Button */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                className="btn btn-outline" 
                style={{ flex: 1 }}
                onClick={onClose}
              >
                បោះបង់ (Cancel)
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1.5 }}
              >
                <Save size={16} />
                <span>រក្សាទុក (Save Profile)</span>
              </button>
            </div>
          </form>
        )}

        {/* ============================================================== */}
        {/* TAB 2: LOGIN FORM (Username & Password) */}
        {/* ============================================================== */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            
            {loginError && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#F87171',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <AlertCircle size={18} />
                <span>{loginError}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={15} color="var(--emerald-main)" />
                <span>ឈ្មោះគណនី (Username)</span>
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="ឧទាហរណ៍: admin, marketing, editor"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <KeyRound size={15} color="var(--emerald-main)" />
                <span>លេខសម្ងាត់ (Password)</span>
              </label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="បញ្ចូលលេខសម្ងាត់..."
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* Role creation disclaimer */}
            <div style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.75rem 0.9rem',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.2rem' }}>
                <ShieldCheck size={15} />
                <span>សេចក្តីបញ្ជាក់អំពីគណនី Staff</span>
              </div>
              គណនី Staff ទាំងអស់ត្រូវបាន<strong>បង្កើត និងផ្តល់ជូនដោយ Boss ឬ Admin តែប៉ុណ្ណោះ</strong> ដើម្បីធានាសុវត្ថិភាពទិន្នន័យ។
            </div>

            {/* Quick Demo Switcher */}
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ចូលសាកល្បងរហ័ស (Quick Demo Accounts):
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.2rem', justifyContent: 'center', borderColor: 'rgba(234, 179, 8, 0.4)' }}
                  onClick={() => handleQuickLogin('admin', '123')}
                >
                  <Crown size={13} color="#EAB308" />
                  <span>Boss Admin</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.2rem', justifyContent: 'center', borderColor: 'rgba(59, 130, 246, 0.4)' }}
                  onClick={() => handleQuickLogin('marketing', '123')}
                >
                  <TrendingUp size={13} color="#3B82F6" />
                  <span>Marketing</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.2rem', justifyContent: 'center', borderColor: 'rgba(168, 85, 247, 0.4)' }}
                  onClick={() => handleQuickLogin('editor', '123')}
                >
                  <Scissors size={13} color="#A855F7" />
                  <span>Editor</span>
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                className="btn btn-outline" 
                style={{ flex: 1 }}
                onClick={onClose}
              >
                បោះបង់ (Cancel)
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1.5 }}
              >
                <Lock size={16} />
                <span>ចូលប្រព័ន្ធ (Login)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
