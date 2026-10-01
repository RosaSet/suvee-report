import React, { useState } from 'react';
import { FileText, Download, X, Copy, Check, FileCheck } from 'lucide-react';

export default function ScriptModal({ isOpen, onClose, content }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !content) return null;

  const handleCopy = () => {
    if (content.scriptText) {
      navigator.clipboard.writeText(content.scriptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '640px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10B981, #0284C7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F172A'
            }}>
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ឯកសារ Script (PC Uploaded)
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {content.week} • {content.title}
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

        {/* Modal Body */}
        <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* File Attachment Card if file exists */}
          {content.scriptFileName ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              background: 'var(--dark-inset)',
              border: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--emerald-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileCheck size={20} />
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {content.scriptFileName}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ទំហំ: {content.scriptFileSize || 'ឯកសារកុំព្យូទ័រ'} • រៀបចំដោយ: <strong>{content.authorName || 'Staff'}</strong>
                  </div>
                </div>
              </div>

              {content.scriptFileUrl && (
                <a 
                  href={content.scriptFileUrl}
                  download={content.scriptFileName}
                  className="btn btn-primary"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', textDecoration: 'none' }}
                >
                  <Download size={14} />
                  <span>Download File</span>
                </a>
              )}
            </div>
          ) : (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              មិនមានឯកសារ Script ភ្ជាប់ពីកុំព្យូទ័រឡើយ (No binary file attached)
            </div>
          )}

          {/* Script Content Reader Box */}
          {content.scriptText ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  ខ្លឹមសារ Script & Hooks:
                </span>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCopy}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                >
                  {copied ? <Check size={13} color="var(--emerald-main)" /> : <Copy size={13} />}
                  <span>{copied ? 'បានចម្លង!' : 'ចម្លងអត្ថបទ (Copy)'}</span>
                </button>
              </div>

              <div style={{
                background: 'var(--dark-inset)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '1rem',
                maxHeight: '280px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                fontSize: '0.88rem',
                lineHeight: '1.6',
                color: 'var(--text-primary)'
              }}>
                {content.scriptText}
              </div>
            </div>
          ) : (
            <div style={{
              background: 'var(--dark-inset)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              textAlign: 'center'
            }}>
              ពុំមានខ្លឹមសារ Script Text ត្រូវបានបញ្ចូលទេ
            </div>
          )}

          {/* Close button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              style={{ minWidth: '100px' }}
            >
              បិទ (Close)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
