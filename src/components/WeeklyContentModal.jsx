import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  FileText, 
  Video, 
  Link as LinkIcon, 
  X, 
  PlusCircle, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Image as ImageIcon,
  Share2,
  UploadCloud,
  FileCheck,
  Trash2,
  FolderOpen
} from 'lucide-react';

export default function WeeklyContentModal({ 
  isOpen, 
  onClose, 
  onAddContent, 
  currentUser 
}) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    week: 'Week 1',
    date: todayStr,
    title: '',
    contentType: 'Short-form Video (9:16)',
    platform: 'TikTok & Reels',
    driveLink: '',
    boostLink: '',
    status: 'Ready to Launch',
    notes: ''
  });

  // PC Script File Upload State
  const [scriptFile, setScriptFile] = useState(null); // { name, size, dataUrl, textContent }
  const [scriptText, setScriptText] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleScriptFileChange = (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    const fileSizeKB = (file.size / 1024).toFixed(1);
    const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : `${fileSizeKB} KB`;

    // If text/markdown file, also read text content
    const isTextFile = file.type?.includes('text') || 
      file.name.endsWith('.txt') || 
      file.name.endsWith('.md') || 
      file.name.endsWith('.json') ||
      file.name.endsWith('.csv');

    if (isTextFile) {
      const textReader = new FileReader();
      textReader.onload = (tEvent) => {
        const text = tEvent.target.result;
        setScriptFile({
          name: file.name,
          size: sizeStr,
          type: file.type || 'text/plain',
          dataUrl: text.length < 500000 ? `data:text/plain;charset=utf-8,${encodeURIComponent(text)}` : '',
          textContent: text
        });
        if (!scriptText.trim()) {
          setScriptText(text);
        }
      };
      textReader.readAsText(file);
    } else {
      // For images or documents under 2MB, store dataUrl safely
      if (file.size <= 2 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setScriptFile({
            name: file.name,
            size: sizeStr,
            type: file.type || 'application/octet-stream',
            dataUrl: event.target.result,
            textContent: ''
          });
        };
        reader.onerror = () => {
          console.warn("Could not read full dataUrl, saving file metadata only");
          setScriptFile({
            name: file.name,
            size: sizeStr,
            type: file.type || 'application/octet-stream',
            dataUrl: '',
            textContent: ''
          });
        };
        reader.readAsDataURL(file);
      } else {
        // Larger file (e.g., video or huge doc): store metadata safely without blowing browser storage
        setScriptFile({
          name: file.name,
          size: sizeStr,
          type: file.type || 'application/octet-stream',
          dataUrl: '',
          textContent: `[File ភ្ជាប់ពី PC]: ${file.name} (${sizeStr})`
        });
      }
    }

    if (e.target && 'value' in e.target) {
      e.target.value = ''; // Reset input to allow re-selection
    }
  };

  const handleRemoveScriptFile = () => {
    setScriptFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = String(form.title || '').trim();
    if (!cleanTitle) {
      alert("សូមបញ្ចូលប្រធានបទ Content (Title / Hook)!");
      return;
    }

    const cleanLink = (val) => {
      const trimmed = String(val || '').trim();
      if (!trimmed) return '';
      if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        return `https://${trimmed}`;
      }
      return trimmed;
    };

    const weekLabels = {
      'Week 1': 'Week 1 (ថ្ងៃទី 01 - 07)',
      'Week 2': 'Week 2 (ថ្ងៃទី 08 - 14)',
      'Week 3': 'Week 3 (ថ្ងៃទី 15 - 21)',
      'Week 4': 'Week 4 (ថ្ងៃទី 22 - 31)'
    };

    const newContent = {
      id: `cnt-${Date.now()}`,
      week: form.week || 'Week 1',
      weekLabel: weekLabels[form.week] || form.week || 'Week 1',
      date: form.date || todayStr,
      title: cleanTitle,
      contentType: form.contentType || 'Short-form Video (9:16)',
      platform: form.platform || 'TikTok & Reels',
      driveLink: cleanLink(form.driveLink),
      boostLink: cleanLink(form.boostLink),
      status: form.status || 'Ready to Launch',
      notes: String(form.notes || '').trim(),
      // Script File from PC
      scriptFileName: typeof scriptFile?.name === 'string' ? scriptFile.name : '',
      scriptFileSize: typeof scriptFile?.size === 'string' ? scriptFile.size : '',
      scriptFileUrl: typeof scriptFile?.dataUrl === 'string' ? scriptFile.dataUrl : '',
      scriptText: String(scriptText || scriptFile?.textContent || '').trim(),
      authorId: currentUser?.id || 'usr-marketing',
      authorName: currentUser?.name || 'Staff Member',
      authorRole: currentUser?.role || 'Digital Marketing',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    };

    if (onAddContent) {
      onAddContent(newContent);
    }
    onClose();

    // Reset form
    setForm({
      week: 'Week 1',
      date: todayStr,
      title: '',
      contentType: 'Short-form Video (9:16)',
      platform: 'TikTok & Reels',
      driveLink: '',
      boostLink: '',
      status: 'Ready to Launch',
      notes: ''
    });
    setScriptFile(null);
    setScriptText('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '600px' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--emerald-main), #0284C7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
            }}>
              <Calendar size={20} color="#0F172A" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Upload Content តាម Week នីមួយៗ
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                កត់ត្រាការផលិត និងបង្ហោះ Content តាមសប្តាហ៍នីមួយៗក្នុងខែ
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Week Selection & Upload Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.85rem' }}>
            <div>
              <label className="form-label" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                📅 ជ្រើសរើសសប្តាហ៍ (Select Week) *
              </label>
              <select 
                className="form-select"
                value={form.week}
                onChange={e => setForm({ ...form, week: e.target.value })}
                style={{ borderColor: 'rgba(234, 179, 8, 0.4)', fontWeight: 600 }}
              >
                <option value="Week 1">Week 1 (ថ្ងៃទី 01 - 07 តុលា)</option>
                <option value="Week 2">Week 2 (ថ្ងៃទី 08 - 14 តុលា)</option>
                <option value="Week 3">Week 3 (ថ្ងៃទី 15 - 21 តុលា)</option>
                <option value="Week 4">Week 4 (ថ្ងៃទី 22 - 31 តុលា)</option>
              </select>
            </div>

            <div>
              <label className="form-label">កាលបរិច្ឆេទ Upload (Date) *</label>
              <input 
                type="date" 
                className="form-input" 
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Content Title */}
          <div>
            <label className="form-label">ប្រធានបទ Content (Title / Hook Angle) *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="ឧ. Video UGC Before/After 7 ថ្ងៃ, ឬ Banner Promotion ទិញ១ថែម១..."
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Content Type & Platform */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label className="form-label">ប្រភេទ Content (Type) *</label>
              <select 
                className="form-select"
                value={form.contentType}
                onChange={e => setForm({ ...form, contentType: e.target.value })}
              >
                <option value="Short-form Video (9:16)">🎬 Short-form Video (9:16 1080p)</option>
                <option value="Graphic Banner (1:1 / 4:5)">🖼️ Graphic Banner (1:1 / 4:5)</option>
                <option value="Carousel Album (Multi-slides)">📚 Carousel Album (Album រូបភាព)</option>
                <option value="Customer Review UGC">⭐ Customer Review / UGC</option>
                <option value="Product ASMR & Texture">✨ Product ASMR & Texture</option>
              </select>
            </div>

            <div>
              <label className="form-label">Platform បង្ហោះ (Target Platform) *</label>
              <select 
                className="form-select"
                value={form.platform}
                onChange={e => setForm({ ...form, platform: e.target.value })}
              >
                <option value="TikTok & Reels">🎵 TikTok & Reels (9:16)</option>
                <option value="Facebook Page">🔵 Facebook Page Post</option>
                <option value="TikTok Spark Ads">⚡ TikTok Spark Ads</option>
                <option value="Instagram">📸 Instagram Feed & Story</option>
                <option value="Telegram Channel">✈️ Telegram Channel</option>
              </select>
            </div>
          </div>

          {/* Drive Upload Link & Boost Link */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <LinkIcon size={13} color="var(--emerald-main)" />
                <span>Link Google Drive (ឯកសារដើម)</span>
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="https://drive.google.com/..."
                value={form.driveLink}
                onChange={e => setForm({ ...form, driveLink: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Share2 size={13} color="#38BDF8" />
                <span>Link Post / Boost (TikTok/FB)</span>
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="https://facebook.com/... ឬ TikTok"
                value={form.boostLink}
                onChange={e => setForm({ ...form, boostLink: e.target.value })}
              />
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="form-label">ស្ថានភាព Content (Status)</label>
            <select 
              className="form-select"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="Draft & Review">⏳ Draft & រង់ចាំ Review</option>
              <option value="Ready to Launch">✅ Ready to Launch (រួចរាល់សម្រាប់ Post)</option>
              <option value="Uploaded & Boosted">🚀 Uploaded & កំពុង Boost Ads</option>
            </select>
          </div>

          {/* UPLOAD SCRIPT FROM FILE IN PC */}
          <div style={{
            background: 'var(--dark-inset)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <label className="form-label" style={{ margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                <FileText size={16} color="var(--emerald-main)" />
                <span>Upload Script / ឯកសារពីកុំព្យូទ័រ (File from PC)</span>
              </label>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                .docx, .pdf, .txt, .mp4, .png...
              </span>
            </div>

            {/* Accessible hidden native file input */}
            <input 
              id="pc-script-file-input"
              type="file" 
              ref={fileInputRef}
              style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}
              onChange={handleScriptFileChange}
            />

            {!scriptFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.25rem 1rem',
                  border: '2px dashed rgba(16, 185, 129, 0.45)',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  userSelect: 'none'
                }}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleScriptFileChange({ target: { files: e.dataTransfer.files } });
                  }
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.5rem',
                  color: 'var(--emerald-main)'
                }}>
                  <UploadCloud size={22} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  ចុចទីនេះដើម្បីជ្រើសរើស File ពីកុំព្យូទ័រ ឬទូរស័ព្ទ (Browse PC File)
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                  ទម្លាក់ File ឬ Click ភ្ជាប់ឯកសារ Script (Word .docx, PDF, Text .txt, Images...)
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  style={{
                    fontSize: '0.78rem',
                    padding: '0.45rem 1rem',
                    background: 'var(--emerald-main)',
                    color: '#0F172A',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <FolderOpen size={15} />
                  <span>📂 ជ្រើសរើស File ពី PC</span>
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'var(--emerald-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0F172A'
                  }}>
                    <FileCheck size={18} />
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                      {scriptFile.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>ទំហំ: {scriptFile.size}</span>
                      <span>•</span>
                      <span style={{ color: 'var(--emerald-main)', fontWeight: 600 }}>✓ ភ្ជាប់រួចរាល់</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handleRemoveScriptFile}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#EF4444',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                  title="ដក File នេះចេញ"
                >
                  <Trash2 size={13} />
                  <span>ដកចេញ</span>
                </button>
              </div>
            )}

            {/* Script Textarea Preview / Edit */}
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  ខ្លឹមសារ Script / Hooks & Dialogue (កែសម្រួល ឬ Preview បាន):
                </span>
                {scriptText && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--emerald-main)', fontWeight: 600 }}>
                    {scriptText.length} តួអក្សរ
                  </span>
                )}
              </div>
              <textarea 
                className="form-textarea"
                placeholder="Hook 0-3s: ...&#10;Problem (បញ្ហា): ...&#10;Solution (ដំណោះស្រាយ): ...&#10;Offer & CTA: ..."
                value={scriptText}
                onChange={e => setScriptText(e.target.value)}
                style={{ minHeight: '80px', fontSize: '0.85rem', lineHeight: '1.4' }}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="form-label">សម្គាល់លម្អិត / Caption & Hook Strategy (Notes)</label>
            <textarea 
              className="form-textarea" 
              placeholder="ព័ត៌មានបន្ថែមអំពី Hook, Offer ឬ Sound Effects..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              style={{ minHeight: '65px' }}
            />
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
              <PlusCircle size={16} />
              <span>+ រក្សាទុក Content សប្តាហ៍នេះ</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
