import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWindows, FaCog, FaMicrochip } from 'react-icons/fa';

const vms = [
  { id: 'vm-1', team: 'Billing Team',     desc: 'Dedicated digital workstation for invoice and payment processing.', nic: 'nic-1 (Billing Subnet)',     ip: 'Public (support-public-ip)', access: 'support_user1, support_user2' },
  { id: 'vm-2', team: 'Escalations Team', desc: 'Isolated environment for handling sensitive escalated issues.',      nic: 'nic-2 (Escalations Subnet)', ip: 'Private Only',               access: 'support_user3, support_user4' },
  { id: 'vm-3', team: 'Ticketing Team',   desc: 'Central hub for managing and resolving all support tickets.',        nic: 'nic-3 + nic-4 (Ticketing Subnet)',   ip: 'Private Only',               access: 'support_user5, support_user6' },
];

const row = (label, value, mono = false) => (
  <div style={{ marginBottom: '0.85rem' }}>
    <strong style={{ color: 'var(--n-1)', display: 'block', marginBottom: '0.2rem' }}>{label}</strong>
    <span style={{ color: mono ? 'var(--color-4)' : 'var(--n-3)', fontFamily: mono ? 'var(--font-code)' : 'var(--font-sora)', fontSize: '0.875rem' }}>{value}</span>
  </div>
);

const Compute = () => {
  const [flipped, setFlipped] = useState([false, false, false]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-h2" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Compute &amp; NICs</h2>

      <div className="grid grid-3" style={{ gap: '1.5rem' }}>
        {vms.map((vm, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className={`flip-card${flipped[i] ? ' flipped' : ''}`}
              onClick={() => {
                const n = [...flipped];
                n[i] = !n[i];
                setFlipped(n);
              }}
            >
              <div className="flip-card-inner">
                {/* FRONT */}
                <div className="flip-card-front" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <FaMicrochip style={{ fontSize: '2.5rem', color: 'var(--color-1)', marginBottom: '1.5rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>{vm.team}</h4>
                  <span className="mono" style={{ color: 'var(--color-2)', fontSize: '0.85rem', display: 'block', marginBottom: '1rem' }}>{vm.id}</span>
                  <p style={{ color: 'var(--n-3)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '320px' }}>{vm.desc}</p>
                  <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-1)', fontSize: '0.75rem', fontFamily: 'var(--font-code)', fontWeight: 700, letterSpacing: '0.1em' }}>
                    <FaCog /> TECH SPECS
                  </div>
                </div>

                {/* BACK */}
                <div className="flip-card-back" style={{ justifyContent: 'flex-start' }}>
                  <FaWindows style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '1.5rem', color: 'var(--n-5)' }} />
                  <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-1)', marginBottom: '2rem' }}>
                    <FaCog /> {vm.id}
                  </h5>
                  {row('OS', 'Windows Server 2022 DataCenter')}
                  {row('Size', 'Standard_B2s')}
                  {row('NIC', vm.nic, true)}
                  {row('IP', vm.ip)}
                  <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--n-6)' }}>
                    <strong style={{ color: 'var(--color-2)', display: 'block', marginBottom: '0.35rem', fontSize: '0.8rem', fontFamily: 'var(--font-code)' }}>ACCESS GRANTED</strong>
                    <span style={{ color: 'var(--n-3)', fontSize: '0.875rem' }}>{vm.access}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Compute;
