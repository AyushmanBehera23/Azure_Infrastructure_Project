import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaExpand, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

const PDF_URL = '/CA2_INT327_SCREENSHOTS.pdf';

const ScreenshotsPDF = () => {
  const [preview, setPreview] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,90,90,0.1)', border: '1px solid rgba(255,90,90,0.25)', borderRadius: '99px', padding: '0.35rem 1rem', marginBottom: '1rem' }}>
          <FaFilePdf style={{ color: '#ff5a5a', fontSize: '0.75rem' }} />
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: '#ff5a5a', letterSpacing: '0.1em' }}>PDF EVIDENCE</span>
        </div>
        <h2 style={{ fontFamily: 'Sora', color: 'var(--n-1)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600, marginBottom: '0.75rem' }}>
          Screenshot Documentation
        </h2>
        <p style={{ color: 'var(--n-4)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto' }}>
          Full Azure Portal screenshot evidence for every provisioned resource — submitted as CA2 documentation.
        </p>
      </div>

      <div className="card" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,90,90,0.06) 0%, transparent 70%)',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }} className="pdf-grid">

          {/* Left — info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '1rem', flexShrink: 0,
                background: 'linear-gradient(135deg, #ff5a5a, #ff8c42)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(255,90,90,0.3)',
              }}>
                <FaFilePdf style={{ color: '#fff', fontSize: '1.5rem' }} />
              </div>
              <div>
                <div style={{ color: 'var(--n-1)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>CA2_INT327_SCREENSHOTS.pdf</div>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--n-4)' }}>Azure Portal Evidence · CA2 Submission</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
              {[
                'Resource Group & Region proof',
                'Entra ID Users & Security Groups',
                'NSG Inbound Rule configurations',
                'VM deployment & NIC assignments',
                'Storage Accounts & SAS Token',
                'Backup Vault & Policy setup',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--n-3)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5a5a', flexShrink: 0, display: 'inline-block' }} />
                  {item}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPreview(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.65rem 1.25rem', borderRadius: '0.65rem', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #ff5a5a, #ff8c42)',
                  border: 'none', color: '#fff', fontFamily: 'var(--font-sora)', fontWeight: 600, fontSize: '0.85rem',
                  boxShadow: '0 4px 16px rgba(255,90,90,0.3)',
                }}
              >
                <FaExpand style={{ fontSize: '0.8rem' }} /> View PDF
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href={PDF_URL}
                download
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.65rem 1.25rem', borderRadius: '0.65rem', cursor: 'pointer',
                  background: 'transparent', border: '1px solid var(--n-6)',
                  color: 'var(--n-2)', fontFamily: 'var(--font-sora)', fontWeight: 600, fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                <FaDownload style={{ fontSize: '0.8rem' }} /> Download
              </motion.a>
            </div>
          </div>

          {/* Right — embedded preview */}
          <div
            style={{
              borderRadius: '0.75rem', overflow: 'hidden',
              border: '1px solid var(--n-6)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              cursor: 'pointer', position: 'relative',
              height: '280px',
            }}
            onClick={() => setPreview(true)}
          >
            <iframe
              src={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
              title="PDF Preview"
            />
            {/* Click overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(14,12,21,0.7) 0%, transparent 60%)',
              display: 'flex', alignItems: 'flex-end', padding: '1rem',
            }}>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--n-3)' }}>
                <FaExternalLinkAlt style={{ marginRight: '0.4rem', fontSize: '0.65rem' }} />
                Click to open full view
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen modal */}
      {preview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(8,7,14,0.95)', backdropFilter: 'blur(12px)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Modal top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.5rem', borderBottom: '1px solid var(--n-6)', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FaFilePdf style={{ color: '#ff5a5a', fontSize: '1.1rem' }} />
              <span style={{ color: 'var(--n-1)', fontWeight: 600 }}>CA2_INT327_SCREENSHOTS.pdf</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <a href={PDF_URL} download
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '0.5rem', background: 'var(--n-7)', border: '1px solid var(--n-6)', color: 'var(--n-2)', textDecoration: 'none', fontSize: '0.82rem' }}>
                <FaDownload style={{ fontSize: '0.75rem' }} /> Download
              </a>
              <button
                onClick={() => setPreview(false)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--n-7)', border: '1px solid var(--n-6)', color: 'var(--n-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* PDF iframe fullscreen */}
          <iframe
            src={PDF_URL}
            style={{ flex: 1, border: 'none', width: '100%' }}
            title="CA2 Screenshots PDF"
          />
        </motion.div>
      )}

      <style>{`
        @media (max-width: 700px) { .pdf-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </motion.div>
  );
};

export default ScreenshotsPDF;
