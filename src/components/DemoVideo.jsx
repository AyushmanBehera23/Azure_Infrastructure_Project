import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaVideo } from 'react-icons/fa';

const LOOM_EMBED = 'https://www.loom.com/embed/8d66fc22d81d4f2da21972add3569b86';
const LOOM_THUMB = 'https://cdn.loom.com/sessions/thumbnails/8d66fc22d81d4f2da21972add3569b86-with-play.gif';

const DemoVideo = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(172,106,255,0.1)', border: '1px solid rgba(172,106,255,0.25)', borderRadius: '99px', padding: '0.35rem 1rem', marginBottom: '1rem' }}>
          <FaVideo style={{ color: 'var(--color-1)', fontSize: '0.75rem' }} />
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--color-1)', letterSpacing: '0.1em' }}>LIVE DEMO</span>
        </div>
        <h2 style={{ fontFamily: 'Sora', color: 'var(--n-1)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600, marginBottom: '0.75rem' }}>
          Infrastructure Walkthrough
        </h2>
        <p style={{ color: 'var(--n-4)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto' }}>
          Watch the full deployment walkthrough — from resource provisioning to NSG configuration and VM access.
        </p>
      </div>

      <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '1rem', pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(172,106,255,0.08) 0%, transparent 70%)',
        }} />

        <div style={{
          position: 'relative',
          paddingBottom: '56.25%', /* 16:9 */
          height: 0,
          borderRadius: '0.75rem',
          overflow: 'hidden',
          background: 'var(--n-7)',
          border: '1px solid var(--n-6)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}>
          {!playing ? (
            /* Thumbnail / play overlay */
            <div
              onClick={() => setPlaying(true)}
              style={{
                position: 'absolute', inset: 0, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1rem',
                background: 'linear-gradient(135deg, rgba(14,12,21,0.85), rgba(22,18,36,0.7))',
              }}
            >
              {/* Animated thumbnail background */}
              <img
                src={LOOM_THUMB}
                alt="Video thumbnail"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
                onError={e => { e.target.style.display = 'none'; }}
              />

              {/* Play button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-1), var(--color-5))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(172,106,255,0.5)',
                  zIndex: 2,
                }}
              >
                <FaPlay style={{ color: '#fff', fontSize: '1.3rem', marginLeft: '3px' }} />
              </motion.div>

              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div style={{ color: 'var(--n-1)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>
                  Azure Infrastructure Demo
                </div>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--n-4)' }}>
                  Click to play · Loom recording
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={`${LOOM_EMBED}?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              allow="autoplay; fullscreen"
              title="Azure Infrastructure Demo"
            />
          )}
        </div>

        {/* Tags below */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem', justifyContent: 'center' }}>
          {['RG-SupportPortal', 'Central India', 'NSG Configuration', 'VM Deployment', 'RBAC Setup', 'Backup Vault'].map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-code)', fontSize: '0.7rem',
              padding: '0.25rem 0.75rem', borderRadius: '99px',
              border: '1px solid var(--n-6)', color: 'var(--n-4)',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DemoVideo;
