import React, { useState } from 'react';
import { 
  UserPlus, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  KeyRound, 
  Calendar, 
  Phone 
} from 'lucide-react';

export default function CreateStaffModal({ 
  isOpen, 
  onClose, 
  onAddUser, 
  users = [] 
}) {
  const [form, setForm] = useState({
    name: '',
    role: 'Digital Marketing',
    username: '',
    password: '',
    startDate: new Date().toISOString().split('T')[0],
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
  });

  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
      setErrorMsg('សូមបំពេញឈ្មោះ, Username និងលេខសម្ងាត់ឱ្យបានពេញលេញ!');
      return;
    }

    const exists = users.some(u => u.username.toLowerCase() === form.username.trim().toLowerCase());
    if (exists) {
      setErrorMsg(`Username "${form.username}" ត្រូវបានប្រើប្រាស់រួចហើយ!`);
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      username: form.username.trim().toLowerCase(),
      password: form.password.trim(),
      name: form.name.trim(),
      role: form.role,
      roleLabel: form.role === 'Digital Marketing' ? 'Digital Marketing Specialist' : 'Creative Video Editor',
      startDate: form.startDate,
      phone: form.phone || '012 xxx xxx',
      avatar: form.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      bio: form.role === 'Digital Marketing' 
        ? 'Facebook Page Boost & TikTok Ads Optimization'
        : 'Short-form Video Creatives & Hook Production'
    };

    onAddUser(newUser);
    onClose();

    // Reset
    setForm({
      name: '',
      role: 'Digital Marketing',
      username: '',
      password: '',
      startDate: new Date().toISOString().split('T')[0],
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '520px' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--emerald-main), var(--accent-gold))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
            }}>
              <UserPlus size={18} color="#0F172A" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                បង្កើតគណនី Staff ថ្មី
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Boss / Admin ជាអ្នកបង្កើត និងផ្ដល់សិទ្ធិជូនបុគ្គលិក
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

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {errorMsg && (
            <div style={{
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#F87171',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="form-label">ឈ្មោះពេញបុគ្គលិក (Staff Full Name) *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="ឧ. Vannak Meas ឬ Sokha Heng"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="form-label">តួនាទី / ផ្នែក (Assigned Role) *</label>
            <select 
              className="form-select"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="Digital Marketing">🔵 Digital Marketing (Boost Page & TikTok)</option>
              <option value="Video Editor">✂️ Video Editor (Reels & Short-form)</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="form-label">Username *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="ឈ្មោះ Login"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Password *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="លេខសម្ងាត់"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="form-label">ថ្ងៃខែចូលធ្វើការ *</label>
              <input 
                type="date" 
                className="form-input" 
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">លេខទូរស័ព្ទ</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="012 xxx xxx"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="form-label">រូបតំណាងដំបូង (Initial Avatar)</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              ].map((url, i) => (
                <img 
                  key={i}
                  src={url}
                  alt="avatar preset"
                  onClick={() => setForm({ ...form, avatar: url })}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: form.avatar === url ? '2px solid var(--emerald-main)' : '2px solid transparent',
                    transform: form.avatar === url ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '0.4rem' }}>
                (Staff អាច Upload រូបខ្លួនឯងពេល Login បាន)
              </span>
            </div>
          </div>

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
              <UserPlus size={16} />
              <span>+ បង្កើតគណនី</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
