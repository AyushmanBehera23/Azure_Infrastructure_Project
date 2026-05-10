import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';

const subnets = [
  { name: 'Billing Subnet',     ip: '10.10.1.0/24', nsg: 'nsg-1' },
  { name: 'Escalations Subnet', ip: '10.10.2.0/24', nsg: 'nsg-2' },
  { name: 'Ticketing Subnet',   ip: '10.10.3.0/24', nsg: 'nsg-3' },
];

const pill = (label, value, color) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
    padding: '0.4rem 0.9rem', borderRadius: '99px',
    border: `1px solid var(--n-5)`, color: 'var(--n-2)',
    fontFamily: 'var(--font-code)', fontSize: '0.75rem',
  }}>
    {label}: <span style={{ color }}>{value}</span>
  </span>
);

const NetworkTopology = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-h2" style={{ textAlign: 'center', marginBottom: '2rem' }}>Network Topology</h2>
    <div className="card" style={{ padding: '2.5rem 2rem' }}>

      <h3 style={{ marginBottom: '0.5rem' }}>Virtual Network</h3>
      <p style={{ color: 'var(--n-3)', marginBottom: '2.5rem' }}>
        Name: <strong className="mono" style={{ color: 'var(--color-1)' }}>support-vnet</strong>&nbsp;·&nbsp;
        Address: <strong className="mono" style={{ color: 'var(--n-1)' }}>10.10.0.0/16</strong>
      </p>

      <div className="grid grid-3" style={{ marginBottom: '2.5rem' }}>
        {subnets.map((sub, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            style={{
              backgroundColor: 'var(--n-8)', border: '1px solid var(--n-6)',
              borderRadius: '1rem', padding: '1.5rem',
            }}
          >
            <h5 style={{ color: 'var(--n-1)', marginBottom: '0.4rem' }}>{sub.name}</h5>
            <div className="mono text-sm" style={{ color: 'var(--color-3)', marginBottom: '1rem' }}>{sub.ip}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--n-3)', fontSize: '0.875rem' }}>
              <FaShieldAlt style={{ color: 'var(--color-2)' }} /> {sub.nsg} <span style={{ opacity: 0.5 }}>(NSG)</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ backgroundColor: 'var(--n-8)', border: '1px solid var(--color-1)', borderRadius: '1rem', padding: '1.5rem' }}>
        <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <FaShieldAlt style={{ color: 'var(--color-1)' }} /> Global Security Rule
        </h5>
        <p style={{ color: 'var(--n-3)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Applied to all NSGs (<span className="mono">nsg-1</span>, <span className="mono">nsg-2</span>, <span className="mono">nsg-3</span>):
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {pill('Name', 'Allow-RDP-MyIP', 'var(--color-4)')}
          {pill('Port', '3389', 'var(--color-2)')}
          {pill('Protocol', 'TCP', 'var(--color-6)')}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.4rem 0.9rem', borderRadius: '99px',
            border: '1px solid var(--color-1)', color: 'var(--color-1)',
            fontFamily: 'var(--font-code)', fontSize: '0.75rem',
          }}>Action: Allow (Source: My IP)</span>
        </div>
      </div>

    </div>
  </motion.div>
);

export default NetworkTopology;
