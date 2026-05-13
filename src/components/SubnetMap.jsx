import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaTimes } from 'react-icons/fa';

const subnets = [
  {
    id: 'billing',
    label: 'billing-subnet',
    cidr: '10.10.1.0/24',
    color: '#AC6AFF',
    nsg: 'nsg-1',
    vm: 'vm-1',
    nic: 'nic-1',
    access: 'Public IP (support-public-ip)',
    rules: [
      { name: 'Allow-RDP-MyIP', port: '3389', action: 'Allow', desc: 'Admin RDP access from trusted IP' },
      { name: 'DenyAllInBound', port: 'Any', action: 'Deny', desc: 'All other inbound traffic blocked' },
    ],
  },
  {
    id: 'escalations',
    label: 'escalations-subnet',
    cidr: '10.10.2.0/24',
    color: '#858DFF',
    nsg: 'nsg-2',
    vm: 'vm-2',
    nic: 'nic-2',
    access: 'Private Only',
    rules: [
      { name: 'Allow-VM1-To-VM2', port: '*', action: 'Allow', desc: 'Allow traffic from vm-1 (10.10.1.4)' },
      { name: 'DenyAllInBound', port: 'Any', action: 'Deny', desc: 'All other inbound traffic blocked' },
    ],
  },
  {
    id: 'ticketing',
    label: 'ticketing-subnet',
    cidr: '10.10.3.0/24',
    color: '#7ADB78',
    nsg: 'nsg-3',
    vm: 'vm-3',
    nic: 'nic-3 + nic-4',
    access: 'Private Only',
    rules: [
      { name: 'Allow-VM2-To-VM3', port: '*', action: 'Allow', desc: 'Allow traffic from vm-2 (10.10.2.4)' },
      { name: 'DenyAllInBound', port: 'Any', action: 'Deny', desc: 'All other inbound traffic blocked' },
    ],
  },
];

const SubnetMap = () => {
  const [selected, setSelected] = useState(null);

  const subnet = subnets.find(s => s.id === selected);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.75rem', fontFamily: 'Sora', color: 'var(--n-1)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600 }}>Interactive Subnet Map</h2>
      <p style={{ textAlign: 'center', color: 'var(--n-4)', fontSize: '0.875rem', marginBottom: '2rem' }}>Click any subnet to view its NSG rules and attached resources.</p>

      <div className="card" style={{ padding: '2rem' }}>
        {/* VNet container */}
        <div style={{ border: '1.5px dashed rgba(172,106,255,0.3)', borderRadius: '1.5rem', padding: '2rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '1.5rem', background: 'var(--n-7)', padding: '0.25rem 0.75rem', borderRadius: '99px', border: '1px solid rgba(172,106,255,0.3)', fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: 'var(--color-1)' }}>
            support-vnet · 10.10.0.0/16
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {subnets.map(s => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{
                  flex: 1, minWidth: '200px', padding: '1.5rem',
                  borderRadius: '1rem', cursor: 'pointer',
                  border: `2px solid ${selected === s.id ? s.color : 'rgba(255,255,255,0.07)'}`,
                  background: selected === s.id ? `${s.color}15` : 'var(--n-8)',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, color: s.color, fontSize: '0.82rem' }}>{s.label}</span>
                </div>
                <div style={{ color: 'var(--n-3)', fontSize: '0.78rem', marginBottom: '0.35rem' }}>CIDR: <span style={{ color: 'var(--n-1)', fontFamily: 'var(--font-code)' }}>{s.cidr}</span></div>
                <div style={{ color: 'var(--n-3)', fontSize: '0.78rem', marginBottom: '0.35rem' }}>NSG: <span style={{ color: 'var(--color-3)' }}>{s.nsg}</span></div>
                <div style={{ color: 'var(--n-3)', fontSize: '0.78rem', marginBottom: '0.35rem' }}>VM: <span style={{ color: 'var(--color-2)' }}>{s.vm}</span></div>
                <div style={{ color: 'var(--n-3)', fontSize: '0.78rem' }}>Access: <span style={{ color: 'var(--n-1)' }}>{s.access}</span></div>
                <div style={{ marginTop: '1rem', fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: selected === s.id ? s.color : 'var(--n-5)', textAlign: 'center' }}>
                  {selected === s.id ? '▲ Click to close' : '▼ Click to expand rules'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expanded NSG panel */}
        <AnimatePresence>
          {subnet && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ marginTop: '1.5rem', padding: '1.5rem', border: `1px solid ${subnet.color}40`, borderRadius: '1rem', background: `${subnet.color}08` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <FaShieldAlt style={{ color: subnet.color }} />
                  <h4 style={{ margin: 0, color: subnet.color }}>{subnet.nsg} — Security Rules for {subnet.label}</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {subnet.rules.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--n-7)', borderRadius: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ padding: '0.2rem 0.65rem', borderRadius: '99px', border: `1px solid ${r.action === 'Allow' ? 'var(--color-4)' : 'var(--color-3)'}`, color: r.action === 'Allow' ? 'var(--color-4)' : 'var(--color-3)', fontFamily: 'var(--font-code)', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>{r.action}</span>
                      <span style={{ fontFamily: 'var(--font-code)', color: 'var(--n-1)', fontSize: '0.82rem', fontWeight: 600 }}>{r.name}</span>
                      <span style={{ fontFamily: 'var(--font-code)', color: 'var(--color-2)', fontSize: '0.78rem' }}>Port {r.port}</span>
                      <span style={{ color: 'var(--n-3)', fontSize: '0.8rem', marginLeft: 'auto' }}>{r.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SubnetMap;
