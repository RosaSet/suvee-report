import React, { useState, useRef } from 'react';
import { 
  User, 
  Camera, 
  Calendar, 
  Phone, 
  Briefcase, 
  Save, 
  X, 
  CheckCircle, 
  Clock, 
  Award, 
  ShieldCheck, 
  FileText, 
  Video, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';

export default function ProfileModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onUpdateProfile,
  dailyReports = [],
  editorReports = []
}) {
  const fileInputRef = useRef(null);

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [startDate, setStartDate] = useState(currentUser?.startDate || '2025-01-01');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync with currentUser when prop changes
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setPhone(currentUser.phone || '');
      setStartDate(currentUser.startDate || '2025-01-01');
      setBio(currentUser.bio || '');
      setAvatar(currentUser.avatar || '');
    }
  }, [currentUser]);

  if (!isOpen || !currentUser) return null;

  // Handle Photo Upload from User's Device
  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("ទំហំរូបភាពធំពេក (សូមជ្រើសរើសរូបភាពក្រោម 5MB)!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate Tenure / រយៈពេលបម្រើការងារ
  const calculateTenure = (dateString) => {
    if (!dateString) return 'ទើបចូលបម្រើការងារ';
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
      return `${years} ឆ្នាំ ${remMonths} ខែ (${diffDays} ថ្ងៃ)`;
    } else if (months > 0) {
      return `${months} ខែ ${days} ថ្ងៃ`;
    }
    return `${diffDays} ថ្ងៃ`;
  };

  // Calculate User's Submitted Reports
  const userBoostReports = dailyReports.filter(r => 
    r.authorId === currentUser.id || r.authorName === currentUser.name
  );
  const userEditorReports = editorReports.filter(r => 
    r.authorId === currentUser.id || r.authorName === currentUser.name || r.editorName?.includes(currentUser.name?.split(' ')[0])
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      name,
      phone,
      startDate,
      bio,
      avatar
    };

    onUpdateProfile(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const getRoleBadgeStyle = (role) => {
    if (role === 'Admin') {
      return { background: 'rgba(234, 179, 8, 0.15)', color: '#FACC15', border: '1px solid rgba(234, 179, 8, 0.3)' };
    }
    if (role === 'Digital Marketing') {
      return { background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.3)' };
    }
    return { background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', border: '1px solid rgba(168, 85, 247, 0.3)' };
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '580px' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ព័ត៌មានគណនីបុគ្គលិក (Staff Profile)
            </h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              កែប្រែរូបថត Profile និងព័ត៌មានការងារផ្ទាល់ខ្លួន
            </p>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {saveSuccess && (
          <div style={{
            margin: '1rem 0',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34D399',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <CheckCircle size={18} />
            <span>រក្សាទុកព័ត៌មាន Profile ជោគជ័យ!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Avatar Upload Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            padding: '1.25rem',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px'
          }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                alt={name} 
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--emerald-main)',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--emerald-main)',
                  color: '#0F172A',
                  border: '2px solid var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}
                title="ចុចដើម្បីប្តូររូបថត Profile"
              >
                <Camera size={15} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handlePhotoSelect}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {name || currentUser.username}
                </span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontWeight: 600,
                  ...getRoleBadgeStyle(currentUser.role)
                }}>
                  {currentUser.role}
                </span>
              </div>
              <p style={{ margin: '0 0 0.6rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                @{currentUser.username} • {currentUser.roleLabel || currentUser.role}
              </p>
              <button 
                type="button" 
                className="btn btn-outline" 
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', height: 'auto' }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={13} />
                <span>Upload Profile Picture</span>
              </button>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            
            {/* Full Name */}
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} color="var(--emerald-main)" />
                <span>ឈ្មោះពេញ (Full Name)</span>
              </label>
              <input 
                type="text" 
                className="form-input" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} color="var(--emerald-main)" />
                <span>លេខទូរស័ព្ទ (Contact Phone)</span>
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="012 xxx xxx"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>

            {/* Start Working Date (ថ្ងៃខែចូលធ្វើការ) - REQUESTED FEATURE */}
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} color="var(--accent-gold)" />
                <span style={{ color: 'var(--accent-gold)' }}>ថ្ងៃខែចូលធ្វើការ (Start Date)</span>
              </label>
              <input 
                type="date" 
                className="form-input" 
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                style={{ borderColor: 'rgba(234, 179, 8, 0.4)' }}
                required
              />
            </div>

            {/* Calculated Tenure display */}
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} color="var(--text-muted)" />
                <span>រយៈពេលបម្រើការងារ (Tenure)</span>
              </label>
              <div style={{
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 0.85rem',
                borderRadius: '8px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--emerald-main)'
              }}>
                {calculateTenure(startDate)}
              </div>
            </div>
          </div>

          {/* Role (Read only from Admin) */}
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>តួនាទីក្នុងក្រុមហ៊ុន (Assigned Role)</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                {currentUser.role} ({currentUser.roleLabel || 'Staff Member'})
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="var(--emerald-main)" />
              <span>កំណត់ដោយ Boss / Admin</span>
            </div>
          </div>

          {/* Work Summary Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            textAlign: 'center'
          }}>
            <div style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              padding: '0.75rem',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>របាយការណ៍ Boost</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38BDF8' }}>
                {userBoostReports.length}
              </div>
            </div>
            <div style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              padding: '0.75rem',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>របាយការណ៍ Editor</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#C084FC' }}>
                {userEditorReports.length}
              </div>
            </div>
            <div style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              padding: '0.75rem',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Status</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--emerald-main)', marginTop: '4px' }}>
                Active Staff
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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
              <span>រក្សាទុក Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
