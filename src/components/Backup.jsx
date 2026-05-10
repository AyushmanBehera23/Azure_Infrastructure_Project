import React from 'react';
import { motion } from 'framer-motion';
import { FaArchive, FaClock, FaServer } from 'react-icons/fa';

const infoBox = { backgroundColor: 'var(--n-8)', border: '1px solid var(--n-6)', borderRadius: '1rem', padding: '1.25rem' };

const Backup = () => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{ height: '100%' }}
  >
    <div className="card" style={{ height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3>Backup &amp; Recovery</h3>

      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-1), var(--color-5))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          <FaArchive style={{ fontSize: '2rem', color: 'var(--n-1)' }} />
        </div>
        <h4>support-backup-vault</h4>
        <p className="mono text-sm text-n4">Recovery Services Vault</p>
      </div>

      <div style={infoBox}>
        <p className="mono text-xs text-n4" style={{ marginBottom: '0.75rem', letterSpacing: '0.1em' }}>BACKUP POLICY</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--n-3)' }}>
          <FaClock style={{ color: 'var(--color-4)' }} />
          <span>Frequency: <strong style={{ color: 'var(--n-1)' }}>Daily</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--n-3)' }}>
          <FaArchive style={{ color: 'var(--color-2)' }} />
          <span>Retention: <strong style={{ color: 'var(--n-1)' }}>7 Days</strong></span>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <p className="mono text-xs text-n4" style={{ marginBottom: '0.75rem', letterSpacing: '0.1em' }}>PROTECTED ITEMS</p>
        <div style={{ ...infoBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FaServer style={{ color: 'var(--color-1)', fontSize: '1.2rem' }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--n-1)', marginBottom: '0.2rem' }}>vm-3 (Ticketing · nic-3 + nic-4)</div>
              <div className="mono text-sm" style={{ color: 'var(--n-3)' }}>Status: Protected</div>
            </div>
          </div>
          <span style={{ display: 'inline-block', padding: '0.3rem 0.9rem', borderRadius: '99px', border: '1px solid var(--color-4)', color: 'var(--color-4)', fontFamily: 'var(--font-code)', fontSize: '0.72rem' }}>Healthy</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Backup;
