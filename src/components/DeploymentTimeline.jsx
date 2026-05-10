import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

const steps = [
  { date: '2026-05-07', time: '09:00', title: 'Resource Group Created', desc: 'RG-SupportPortal provisioned in Central India region.', status: 'done' },
  { date: '2026-05-07', time: '09:15', title: 'Entra ID Users Created', desc: '6 users created with auto-generated passwords and forced reset.', status: 'done' },
  { date: '2026-05-07', time: '09:30', title: 'Security Groups Configured', desc: 'Billing-Sub, Escalations-Sub, Ticketing-Sub groups created and users assigned.', status: 'done' },
  { date: '2026-05-07', time: '09:45', title: 'RBAC Roles Assigned', desc: 'Reader role → Billing & Ticketing. VM Contributor → Escalations.', status: 'done' },
  { date: '2026-05-07', time: '10:00', title: 'Virtual Network & Subnets', desc: 'support-vnet (10.10.0.0/16) with 3 subnets provisioned.', status: 'done' },
  { date: '2026-05-07', time: '10:15', title: 'NSGs Created & Associated', desc: 'nsg-1/2/3 created with RDP-only inbound rules and linked to subnets.', status: 'done' },
  { date: '2026-05-07', time: '10:30', title: 'Public IP & NICs Deployed', desc: 'Static Public IP attached to nic-1 only. nic-2/3 are private.', status: 'done' },
  { date: '2026-05-07', time: '10:45', title: 'Virtual Machines Deployed', desc: 'vm-1 (Billing), vm-2 (Escalations), vm-3 (Ticketing) — Windows Server 2022.', status: 'done' },
  { date: '2026-05-07', time: '11:00', title: 'Storage Accounts Created', desc: '3 LRS StorageV2 accounts. st03 has chat-logs Blob + SAS token.', status: 'done' },
  { date: '2026-05-07', time: '11:15', title: 'Azure Policy Applied', desc: 'Custom Deny-Subnet-Delegation policy assigned to RG-SupportPortal.', status: 'done' },
  { date: '2026-05-07', time: '11:30', title: 'Backup Vault Configured', desc: 'support-backup-vault created. Daily backup policy with 7-day retention.', status: 'done' },
  { date: '2026-05-07', time: '11:45', title: 'VM Backup Enabled', desc: 'vm-3 (Ticketing) enrolled in backup policy. First backup triggered.', status: 'done' },
];

const DeploymentTimeline = () => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
    <h2 style={{ textAlign: 'center', marginBottom: '0.75rem', fontFamily: 'Sora', color: 'var(--n-1)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600 }}>Deployment Timeline</h2>
    <p style={{ textAlign: 'center', color: 'var(--n-4)', fontFamily: 'var(--font-code)', fontSize: '0.8rem', marginBottom: '2.5rem', letterSpacing: '0.08em' }}>
      2026-05-07 · RG-SupportPortal · Central India
    </p>

    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
      {/* vertical line */}
      <div style={{ position: 'absolute', left: '0.55rem', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--color-1), var(--color-4))', opacity: 0.3 }} />

      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}
        >
          {/* dot */}
          <div style={{ position: 'absolute', left: '0.1rem', width: '1rem', height: '1rem', borderRadius: '50%', background: 'var(--color-4)', border: '2px solid var(--n-7)', marginTop: '0.2rem', flexShrink: 0 }} />

          <div className="card" style={{ marginLeft: '1.5rem', padding: '1rem 1.5rem', width: '100%', display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <FaCheckCircle style={{ color: 'var(--color-4)', flexShrink: 0 }} />
                <strong style={{ color: 'var(--n-1)', fontSize: '0.95rem' }}>{s.title}</strong>
              </div>
              <p style={{ color: 'var(--n-3)', fontSize: '0.875rem', margin: 0 }}>{s.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default DeploymentTimeline;
