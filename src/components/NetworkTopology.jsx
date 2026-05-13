import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaNetworkWired } from 'react-icons/fa';

const subnets = [
  { name: 'Billing Subnet',     ip: '10.10.1.0/24', nsg: 'nsg-1', vm: 'vm-1', nic: 'nic-1',         access: 'Public IP',    color: 'var(--color-1)' },
  { name: 'Escalations Subnet', ip: '10.10.2.0/24', nsg: 'nsg-2', vm: 'vm-2', nic: 'nic-2',         access: 'Private Only', color: 'var(--color-5)' },
  { name: 'Ticketing Subnet',   ip: '10.10.3.0/24', nsg: 'nsg-3', vm: 'vm-3', nic: 'nic-3 + nic-4', access: 'Private Only', color: 'var(--color-4)' },
];

const NetworkTopology = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-h2" style={{ textAlign: 'center', marginBottom: '2rem' }}>Network Topology</h2>
    <div className="card" style={{ padding: '2.5rem 2rem' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <FaNetworkWired style={{ color: 'var(--color-1)', fontSize: '1.3rem' }} />
        <h3 style={{ margin: 0 }}>Virtual Network</h3>
      </div>
      <p style={{ color: 'var(--n-3)', marginBottom: '2.5rem' }}>
        Name: <strong className="mono" style={{ color: 'var(--color-1)' }}>support-vnet</strong>&nbsp;·&nbsp;
        Address Space: <strong className="mono" style={{ color: 'var(--n-1)' }}>10.10.0.0/16</strong>&nbsp;·&nbsp;
        Region: <strong className="mono" style={{ color: 'var(--n-1)' }}>Central India</strong>
      </p>

      <div className="grid grid-3">
        {subnets.map((sub, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            style={{
              backgroundColor: 'var(--n-8)',
              border: `1px solid ${sub.color}40`,
              borderRadius: '1rem', padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: sub.color, display: 'inline-block', flexShrink: 0 }} />
              <h5 style={{ color: sub.color, margin: 0, fontSize: '0.9rem' }}>{sub.name}</h5>
            </div>
            <div className="mono text-sm" style={{ color: 'var(--n-2)', marginBottom: '1rem' }}>{sub.ip}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--n-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaShieldAlt style={{ color: 'var(--color-2)', flexShrink: 0 }} />
                <span>NSG: <span style={{ color: 'var(--color-2)' }}>{sub.nsg}</span></span>
              </div>
              <div>VM: <span style={{ color: 'var(--n-1)', fontFamily: 'var(--font-code)' }}>{sub.vm}</span></div>
              <div>NIC: <span style={{ color: 'var(--n-1)', fontFamily: 'var(--font-code)' }}>{sub.nic}</span></div>
              <div>Access: <span style={{ color: sub.access === 'Public IP' ? 'var(--color-4)' : 'var(--n-4)', fontFamily: 'var(--font-code)' }}>{sub.access}</span></div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </motion.div>
);

export default NetworkTopology;
