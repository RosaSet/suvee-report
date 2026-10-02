import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Send, 
  User, 
  Calendar,
  XCircle,
  ThumbsUp
} from 'lucide-react';

const QUICK_FEEDBACK_TAGS = [
  "🎬 សុំកែសម្រួល Hook ៣ វិនាទីដំបូងឱ្យទាក់ទាញជាងនេះ",
  "📝 បន្ថែម Subtitle អក្សរខ្មែរឱ្យធំ និងច្បាស់ជាងនេះ",
  "⚡ កាត់តចង្វាក់វីដេអូឱ្យលឿន និងរស់រវើកជាងនេះ",
  "🎨 កែសម្រួលពន្លឺ និង Color Grading លើសាច់ផលិតផល",
  "📣 កែសម្រួល Call-to-Action (CTA) ចុងវីដេអូ",
  "🔍 ពិនិត្យមើល Link Drive ឬ Link Post ឡើងវិញ"
];

export default function ReviewFeedbackModal({
  isOpen,
  onClose,
  report, // { id, type: 'editor' | 'boost' | 'content', title, authorName, date, status, notes, adminFeedback }
  onSubmitFeedback,
  onApproveReport
}) {
  const [feedbackText, setFeedbackText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !report) return null;

  const handleAddTag = (tag) => {
    if (feedbackText.trim()) {
      setFeedbackText(prev => `${prev}\n• ${tag}`);
    } else {
      setFeedbackText(`• ${tag}`);
    }
  };

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      setErrorMsg('សូមបញ្ចូលចំណុចដែលត្រូវកែសម្រួល ដើម្បីឱ្យបុគ្គលិកដឹងពីរបៀបកែ!');
      return;
    }

    onSubmitFeedback({
      reportId: report.id,
      reportType: report.type,
      status: 'Needs Revision',
      adminFeedback: feedbackText.trim()
    });
    setFeedbackText('');
    setErrorMsg('');
    onClose();
  };

  const handleDirectApprove = () => {
    if (onApproveReport) {
      onApproveReport(report.id, report.type);
    }
    setFeedbackText('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 10000 }}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '540px', width: '92%' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={{ paddingBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EF4444'
            }}>
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                សុំឱ្យបុគ្គលិកកែសម្រួល (Request Revisions)
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Boss / Manager Feedback & Rejection Note
              </p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Report Summary Card */}
        <div style={{
          background: 'var(--dark-inset)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          margin: '1rem 0',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              background: report.type === 'editor' ? 'rgba(192, 132, 252, 0.15)' : 'rgba(56, 189, 248, 0.15)',
              color: report.type === 'editor' ? '#C084FC' : '#38BDF8'
            }}>
              {report.type === 'editor' ? '✂️ Video Editor Report' : report.type === 'content' ? '📅 Weekly Content' : '🔵 Digital Marketing'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {report.date}
            </span>
          </div>

          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            {report.title}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
            <User size={13} />
            <span>អ្នក Upload: <strong style={{ color: 'var(--text-primary)' }}>{report.authorName}</strong></span>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div style={{
            padding: '0.65rem 0.85rem',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#F87171',
            fontSize: '0.85rem',
            marginBottom: '0.75rem'
          }}>
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRejectSubmit}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
              <MessageSquare size={15} color="#EF4444" />
              <span>ចំណុចដែលត្រូវកែសម្រួល (Revisions Needed) *</span>
            </label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="សូមសរសេរចំណុចដែលត្រូវកែសម្រួលលម្អិត... (ឧទាហរណ៍៖ សុំកែ Hook ៣ វិនាទីដំបូង, បន្ថែម Subtitle, ឬកាត់តលឿនជាងនេះ)"
              value={feedbackText}
              onChange={e => {
                setFeedbackText(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              autoFocus
              required
              style={{ width: '100%', fontSize: '0.88rem' }}
            />
          </div>

          {/* Quick Tag Suggestions */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
              ជ្រើសរើសមូលហេតុរហ័ស (Click to add preset note):
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {QUICK_FEEDBACK_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  style={{
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '3px 10px',
                    fontSize: '0.74rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#EF4444'; e.currentTarget.style.color = '#F87171'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              បោះបង់
            </button>

            <button
              type="button"
              className="btn"
              onClick={handleDirectApprove}
              style={{
                flex: 1.2,
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--emerald-main)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              <ThumbsUp size={15} />
              <span>អនុម័តវិញ (Approve)</span>
            </button>

            <button
              type="submit"
              className="btn"
              style={{
                flex: 1.5,
                background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                color: '#FFFFFF',
                fontWeight: 700,
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}
            >
              <Send size={15} />
              <span>បញ្ជូនការសុំកែសម្រួល</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
