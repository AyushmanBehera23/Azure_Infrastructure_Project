import React from 'react';
import { motion } from 'framer-motion';
import {
  FaServer, FaUsers, FaNetworkWired, FaShieldAlt,
  FaDatabase, FaLayerGroup, FaPlug, FaKey, FaCloud, FaLock
} from 'react-icons/fa';

const stats = [
  // Row 1 — Identity & Scale
  { label: 'Resource Group',    value: 'RG-SupportPortal', mono: true,  icon: <FaCloud />,        color: 'var(--color-1)' },
  { label: 'Region',            value: 'Central India',    mono: true,  icon: <FaLayerGroup />,   color: 'var(--color-5)' },
  { label: 'Total Users',       value: '6',                mono: false, icon: <FaUsers />,        color: 'var(--color-2)' },
  { label: 'Total VMs',         value: '3',                mono: false, icon: <FaServer />,       color: 'var(--color-4)' },
  // Row 2 — Network Resources
  { label: 'Virtual Networks',  value: '1',                mono: false, icon: <FaNetworkWired />, color: 'var(--color-4)' },
  { label: 'Subnets',           value: '3',                mono: false, icon: <FaLayerGroup />,   color: 'var(--color-1)' },
  { label: 'NSGs',              value: '3',                mono: false, icon: <FaShieldAlt />,    color: 'var(--color-3)' },
  { label: 'NICs',              value: '4',                mono: false, icon: <FaPlug />,         color: 'var(--color-5)' },
  // Row 3 — Security & Storage
  { label: 'RBAC Roles',        value: '2',                mono: false, icon: <FaKey />,          color: 'var(--color-2)' },
  { label: 'Storage Accounts',  value: '3',                mono: false, icon: <FaDatabase />,     color: 'var(--color-1)' },
  { label: 'Security Groups',   value: '3',                mono: false, icon: <FaLock />,         color: 'var(--color-6)' },
  { label: 'Backup Vaults',     value: '1',                mono: false, icon: <FaServer />,       color: 'var(--color-4)' },
];

const Overview = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'Sora', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600, color: 'var(--n-1)' }}>
      Infrastructure Overview
    </h2>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
    }}
      className="overview-grid"
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="card"
          style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ fontSize: '1.5rem', color: s.color, marginBottom: '0.25rem' }}>{s.icon}</span>
          <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--n-4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
          <span style={{
            fontSize: '1.6rem', fontWeight: 700,
            color: s.mono ? s.color : 'var(--n-1)',
            fontFamily: s.mono ? 'var(--font-code)' : 'var(--font-sora)',
          }}>{s.value}</span>
        </motion.div>
      ))}
    </div>

    <style>{`
      @media (max-width: 900px) { .overview-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      @media (max-width: 500px) { .overview-grid { grid-template-columns: repeat(2, 1fr) !important; } }
    `}</style>
  </motion.div>
);

export default Overview;
