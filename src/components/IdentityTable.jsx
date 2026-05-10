import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck } from 'react-icons/fa';

const users = [
  { id: 'support_user1', pass: 'SupUser@2026#1', group: 'Billing-Sub',     role: 'Reader',             roleColor: 'var(--color-2)' },
  { id: 'support_user2', pass: 'SupUser@2026#2', group: 'Billing-Sub',     role: 'Reader',             roleColor: 'var(--color-2)' },
  { id: 'support_user3', pass: 'SupUser@2026#3', group: 'Escalations-Sub', role: 'VM Contributor',     roleColor: 'var(--color-3)' },
  { id: 'support_user4', pass: 'SupUser@2026#4', group: 'Escalations-Sub', role: 'VM Contributor',     roleColor: 'var(--color-3)' },
  { id: 'support_user5', pass: 'SupUser@2026#5', group: 'Ticketing-Sub',   role: 'Reader',             roleColor: 'var(--color-2)' },
  { id: 'support_user6', pass: 'SupUser@2026#6', group: 'Ticketing-Sub',   role: 'Reader',             roleColor: 'var(--color-2)' },
];

const IdentityTable = () => {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, i) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-h2" style={{ textAlign: 'center', marginBottom: '2rem' }}>Identity &amp; Access</h2>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%', borderCollapse: 'collapse',
          backgroundColor: 'transparent', color: 'var(--n-2)',
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--n-6)' }}>
              {['USER', 'PASSWORD', 'GROUP', 'RBAC ROLE'].map(h => (
                <th key={h} style={{
                  padding: '1.25rem 1.5rem', textAlign: 'left',
                  fontFamily: 'var(--font-code)', fontSize: '0.72rem',
                  fontWeight: 600, letterSpacing: '0.12em',
                  color: 'var(--n-4)', backgroundColor: 'transparent',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} style={{ borderBottom: i < users.length - 1 ? '1px solid var(--n-6)' : 'none', backgroundColor: 'transparent' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontFamily: 'var(--font-code)', color: 'var(--color-4)', fontSize: '0.9rem' }}>{u.id}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="mono" style={{ color: 'var(--n-2)', fontSize: '0.85rem' }}>{u.pass}</span>
                    <button
                      onClick={() => handleCopy(u.pass, i)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === i ? 'var(--color-4)' : 'var(--n-4)', padding: 0, fontSize: '1rem' }}
                    >
                      {copied === i ? <FaCheck /> : <FaCopy />}
                    </button>
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: 'var(--n-1)' }}>{u.group}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{
                    display: 'inline-block', padding: '0.3rem 0.9rem', borderRadius: '99px',
                    border: `1px solid ${u.roleColor}`, color: u.roleColor,
                    fontFamily: 'var(--font-code)', fontSize: '0.72rem', fontWeight: 600,
                  }}>{u.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default IdentityTable;
