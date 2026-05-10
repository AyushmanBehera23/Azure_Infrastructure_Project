import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSkull, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const threats = [
  {
    id: 'rdp-brute',
    threat: 'RDP Brute-Force Attack',
    severity: 'Critical',
    sevColor: 'var(--color-3)',
    target: 'vm-1 (public-facing)',
    vector: 'Internet → Port 3389',
    mitigation: 'nsg-1 restricts RDP (TCP 3389) to a single trusted admin IP only. All other sources are denied by DenyAllInBound at priority 65500.',
    rules: ['Allow-RDP-MyIP (priority 100)', 'DenyAllInBound (priority 65500)'],
  },
  {
    id: 'lateral',
    threat: 'Lateral Movement Between Subnets',
    severity: 'High',
    sevColor: 'var(--color-2)',
    target: 'All VMs',
    vector: 'Compromised VM → Other Subnets',
    mitigation: 'Each team has its own isolated subnet (billing, escalations, ticketing). NSGs block cross-subnet inbound traffic. A compromised vm-1 cannot reach vm-2 or vm-3 directly.',
    rules: ['Subnet isolation via VNet routing', 'NSG DenyAllInBound per subnet'],
  },
  {
    id: 'storage-leak',
    threat: 'Unauthorized Storage Access',
    severity: 'High',
    sevColor: 'var(--color-2)',
    target: 'stsupporteastasia03 (chat-logs)',
    vector: 'Exposed SAS token or public blob',
    mitigation: 'SAS token is scoped to Read-Only on the chat-logs container with a 1-hour expiry. Blob container is private — anonymous access disabled.',
    rules: ['SAS token: 1-hour expiry, Read-Only', 'Container: Private access only'],
  },
  {
    id: 'priv-esc',
    threat: 'Privilege Escalation',
    severity: 'Medium',
    sevColor: 'var(--color-4)',
    target: 'All users',
    vector: 'User gains higher RBAC permissions',
    mitigation: 'Billing and Ticketing groups are assigned Reader only (no write). Escalations get VM Contributor but cannot delete resources. No user has Owner or Contributor on the subscription.',
    rules: ['Billing-Sub → Reader', 'Ticketing-Sub → Reader', 'Escalations-Sub → VM Contributor'],
  },
  {
    id: 'subnet-delegation',
    threat: 'Subnet Delegation Abuse',
    severity: 'Medium',
    sevColor: 'var(--color-4)',
    target: 'VNet subnets',
    vector: 'Delegating subnet to external Azure service',
    mitigation: 'Custom Azure Policy "Deny-Subnet-Delegation" is assigned at RG scope. Any attempt to delegate a subnet to an external service is automatically denied at the ARM layer.',
    rules: ['Azure Policy: Deny-Subnet-Delegation', 'Scope: RG-SupportPortal'],
  },
  {
    id: 'data-loss',
    threat: 'Data Loss / VM Failure',
    severity: 'Low',
    sevColor: 'var(--color-1)',
    target: 'vm-3 (Ticketing)',
    vector: 'Hardware failure or accidental deletion',
    mitigation: 'Azure Backup is enabled on vm-3 with a daily backup policy. Recovery points are retained for 7 days in support-backup-vault.',
    rules: ['Daily backup policy', '7-day retention', 'GRS Backup Vault'],
  },
];

const sevOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };

const ThreatModel = () => {
  const [open, setOpen] = useState(null);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.75rem', fontFamily: 'Sora', color: 'var(--n-1)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600 }}>Threat Model</h2>
      <p style={{ textAlign: 'center', color: 'var(--n-4)', fontSize: '0.875rem', marginBottom: '2rem' }}>Known attack vectors and how each NSG rule, policy, or RBAC assignment mitigates them.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {threats.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
            <div
              className="card"
              onClick={() => setOpen(open === t.id ? null : t.id)}
              style={{ padding: '1.1rem 1.5rem', cursor: 'pointer', border: open === t.id ? `1px solid ${t.sevColor}60` : '1px solid var(--n-6)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <FaSkull style={{ color: t.sevColor, flexShrink: 0 }} />
                <span style={{ color: 'var(--n-1)', fontWeight: 600, flex: 1, fontSize: '0.95rem' }}>{t.threat}</span>
                <span style={{ padding: '0.2rem 0.75rem', borderRadius: '99px', border: `1px solid ${t.sevColor}`, color: t.sevColor, fontFamily: 'var(--font-code)', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{t.severity}</span>
                <span style={{ color: 'var(--n-4)', fontFamily: 'var(--font-code)', fontSize: '0.75rem', flexShrink: 0 }}>Target: {t.target}</span>
                <span style={{ color: 'var(--n-5)', fontSize: '0.8rem' }}>{open === t.id ? '▲' : '▼'}</span>
              </div>

              {open === t.id && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--n-6)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="threat-inner">
                    <div>
                      <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--n-4)', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>ATTACK VECTOR</div>
                      <div style={{ color: 'var(--color-3)', fontFamily: 'var(--font-code)', fontSize: '0.82rem' }}>{t.vector}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--n-4)', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>MITIGATION</div>
                      <div style={{ color: 'var(--n-2)', fontSize: '0.83rem', lineHeight: 1.55 }}>{t.mitigation}</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', color: 'var(--n-4)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>ENFORCING CONTROLS</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {t.rules.map((r, ri) => (
                        <span key={ri} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.75rem', borderRadius: '99px', background: 'rgba(123,219,120,0.08)', border: '1px solid rgba(123,219,120,0.3)', color: 'var(--color-4)', fontFamily: 'var(--font-code)', fontSize: '0.72rem' }}>
                          <FaCheckCircle style={{ fontSize: '0.6rem' }} /> {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`@media(max-width:600px){.threat-inner{grid-template-columns:1fr !important}}`}</style>
    </motion.div>
  );
};

export default ThreatModel;
