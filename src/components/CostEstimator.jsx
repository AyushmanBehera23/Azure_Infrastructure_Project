import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaDatabase, FaShieldAlt, FaNetworkWired } from 'react-icons/fa';

const resources = [
  {
    category: 'Virtual Machines (×3)',
    icon: <FaServer />, color: 'var(--color-2)',
    items: [
      { name: 'vm-1 · Standard_B2s', monthly: 35.04, note: 'Billing Team · 730 hrs/mo' },
      { name: 'vm-2 · Standard_B2s', monthly: 35.04, note: 'Escalations Team · 730 hrs/mo' },
      { name: 'vm-3 · Standard_B2s', monthly: 35.04, note: 'Ticketing Team · 730 hrs/mo' },
    ]
  },
  {
    category: 'Storage Accounts (×3)',
    icon: <FaDatabase />, color: 'var(--color-1)',
    items: [
      { name: 'stsupporteastasia01 · LRS', monthly: 2.30, note: '100 GB estimated · Blob + Files' },
      { name: 'stsupporteastasia02 · LRS', monthly: 2.30, note: '100 GB estimated · Blob + Files' },
      { name: 'stsupporteastasia03 · LRS', monthly: 2.30, note: '100 GB · chat-logs Blob' },
    ]
  },
  {
    category: 'Networking',
    icon: <FaNetworkWired />, color: 'var(--color-4)',
    items: [
      { name: 'Public IP (Standard Static)', monthly: 3.65, note: 'support-public-ip · 730 hrs/mo' },
      { name: 'Virtual Network · Egress', monthly: 1.50, note: 'Estimated ~50 GB outbound/mo' },
    ]
  },
  {
    category: 'Backup & Governance',
    icon: <FaShieldAlt />, color: 'var(--color-4)',
    items: [
      { name: 'Recovery Services Vault', monthly: 4.20, note: 'vm-3 daily backup · 7-day retention' },
      { name: 'Azure Policy', monthly: 0.00, note: 'Custom policy — included free' },
    ]
  },
];

const total = resources.flatMap(r => r.items).reduce((s, i) => s + i.monthly, 0);

const CostEstimator = () => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
    <h2 style={{ textAlign: 'center', marginBottom: '0.75rem', fontFamily: 'Sora', color: 'var(--n-1)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600 }}>Cost Estimator</h2>
    <p style={{ textAlign: 'center', color: 'var(--n-4)', fontSize: '0.875rem', marginBottom: '2rem' }}>Estimated monthly Azure spend · Central India region · Pay-as-you-go pricing</p>

    {/* Total card */}
    <div className="card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem', background: 'linear-gradient(135deg,rgba(172,106,255,0.08),rgba(255,200,118,0.06))' }}>
      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-code)', color: 'var(--n-4)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>ESTIMATED TOTAL / MONTH</div>
      <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-4)', fontFamily: 'Sora', lineHeight: 1 }}>${total.toFixed(2)}</div>
      <div style={{ color: 'var(--n-3)', fontSize: '0.875rem', marginTop: '0.5rem' }}>USD · Approximate · Excludes OS licensing</div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.25rem' }} className="cost-grid">
      {resources.map((cat, ci) => {
        const catTotal = cat.items.reduce((s, i) => s + i.monthly, 0);
        return (
          <motion.div key={ci} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--n-6)' }}>
              <span style={{ color: cat.color, fontSize: '1.1rem' }}>{cat.icon}</span>
              <span style={{ color: cat.color, fontFamily: 'var(--font-code)', fontSize: '0.8rem', fontWeight: 700 }}>{cat.category}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--color-4)', fontFamily: 'var(--font-code)', fontWeight: 700 }}>${catTotal.toFixed(2)}/mo</span>
            </div>
            {cat.items.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: ii < cat.items.length - 1 ? '0.75rem' : 0, paddingBottom: ii < cat.items.length - 1 ? '0.75rem' : 0, borderBottom: ii < cat.items.length - 1 ? '1px solid var(--n-6)' : 'none' }}>
                <div>
                  <div style={{ color: 'var(--n-1)', fontFamily: 'var(--font-code)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>{item.name}</div>
                  <div style={{ color: 'var(--n-4)', fontSize: '0.75rem' }}>{item.note}</div>
                </div>
                <span style={{ color: item.monthly === 0 ? 'var(--color-4)' : 'var(--n-1)', fontFamily: 'var(--font-code)', fontWeight: 600, fontSize: '0.9rem', flexShrink: 0, marginLeft: '1rem' }}>
                  {item.monthly === 0 ? 'Free' : `$${item.monthly.toFixed(2)}`}
                </span>
              </div>
            ))}
          </motion.div>
        );
      })}
    </div>
    <p style={{ textAlign: 'center', color: 'var(--n-5)', fontSize: '0.72rem', marginTop: '1rem', fontFamily: 'var(--font-code)' }}>
      * Estimates based on Azure Pricing Calculator · Central India region · May 2026
    </p>
    <style>{`@media(max-width:700px){.cost-grid{grid-template-columns:1fr !important}}`}</style>
  </motion.div>
);

export default CostEstimator;
