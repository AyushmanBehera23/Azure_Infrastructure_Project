import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const checks = [
  { cat: 'Identity',  label: 'Entra ID MFA',              status: 'warning', note: 'MFA not enforced — admin should enable Conditional Access.' },
  { cat: 'Identity',  label: 'Least Privilege RBAC',       status: 'pass',    note: 'Billing & Ticketing have Reader only. Escalations have VM Contributor.' },
  { cat: 'Identity',  label: 'No Global Admin accounts',   status: 'pass',    note: 'All 6 users are scoped to RG-SupportPortal only.' },
  { cat: 'Network',   label: 'Private VMs (vm-2, vm-3)',   status: 'pass',    note: 'Only vm-1 has a public IP. All others are private-only.' },
  { cat: 'Network',   label: 'NSG RDP Restriction',        status: 'pass',    note: 'RDP (3389) locked to admin IP on all 3 NSGs.' },
  { cat: 'Network',   label: 'Subnet Delegation Blocked',  status: 'pass',    note: 'Azure Policy Deny-Subnet-Delegation applied to VNet.' },
  { cat: 'Storage',   label: 'SAS Token Expiry',           status: 'pass',    note: 'SAS token limited to 1-hour read-only access.' },
  { cat: 'Storage',   label: 'Blob Public Access',         status: 'pass',    note: 'Container access is private — no anonymous read.' },
  { cat: 'Backup',    label: 'VM Backup Enabled',          status: 'pass',    note: 'vm-3 (Ticketing) backed up daily with 7-day retention.' },
  { cat: 'Backup',    label: 'All VMs Backed Up',          status: 'warning', note: 'vm-1 and vm-2 are not enrolled in the backup policy.' },
  { cat: 'Governance','label': 'Azure Policy Active',      status: 'pass',    note: 'Deny-Subnet-Delegation policy is enforced at RG level.' },
  { cat: 'Governance','label': 'Audit Logging',            status: 'warning', note: 'Azure Monitor / Diagnostic Settings not configured yet.' },
];

const score = checks.filter(c => c.status === 'pass').length;
const total = checks.length;
const pct = Math.round((score / total) * 100);

const SecurityPosture = () => (
  <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
    <h2 style={{ textAlign:'center', marginBottom:'2rem', fontFamily:'Sora', color:'var(--n-1)', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:600 }}>Security Posture Summary</h2>

    {/* Score card */}
    <div className="card" style={{ padding:'2rem', textAlign:'center', marginBottom:'2rem', background:'linear-gradient(135deg,rgba(172,106,255,0.08),rgba(123,219,120,0.08))' }}>
      <div style={{ fontSize:'4rem', fontWeight:800, color: pct>=80?'var(--color-4)':'var(--color-2)', fontFamily:'Sora', lineHeight:1 }}>{pct}%</div>
      <div style={{ color:'var(--n-3)', marginTop:'0.5rem', fontSize:'1rem' }}>Security Score &mdash; {score} of {total} checks passed</div>
      <div style={{ marginTop:'1rem', background:'var(--n-6)', borderRadius:'99px', height:'8px', overflow:'hidden', maxWidth:'400px', margin:'1rem auto 0' }}>
        <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(to right,var(--color-1),var(--color-4))', borderRadius:'99px', transition:'width 1s ease' }}/>
      </div>
    </div>

    <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
      {['Identity','Network','Storage','Backup','Governance'].map(cat => (
        <div key={cat}>
          <div style={{ fontFamily:'var(--font-code)', fontSize:'0.72rem', color:'var(--n-4)', fontWeight:700, letterSpacing:'0.12em', marginBottom:'0.5rem', marginTop:'0.5rem' }}>{cat.toUpperCase()}</div>
          {checks.filter(c=>c.cat===cat).map((c,i) => (
            <div key={i} className="card" style={{ padding:'0.85rem 1.25rem', display:'flex', alignItems:'flex-start', gap:'0.75rem', marginBottom:'0.5rem' }}>
              {c.status==='pass'
                ? <FaCheckCircle style={{color:'var(--color-4)',flexShrink:0,marginTop:'0.15rem'}}/>
                : <FaExclamationTriangle style={{color:'var(--color-2)',flexShrink:0,marginTop:'0.15rem'}}/>}
              <div>
                <div style={{ color:'var(--n-1)', fontWeight:600, fontSize:'0.88rem', marginBottom:'0.2rem' }}>{c.label}</div>
                <div style={{ color:'var(--n-3)', fontSize:'0.8rem' }}>{c.note}</div>
              </div>
              <span style={{ marginLeft:'auto', padding:'0.2rem 0.65rem', borderRadius:'99px', border:`1px solid ${c.status==='pass'?'var(--color-4)':'var(--color-2)'}`, color:c.status==='pass'?'var(--color-4)':'var(--color-2)', fontFamily:'var(--font-code)', fontSize:'0.68rem', fontWeight:600, flexShrink:0 }}>
                {c.status==='pass'?'PASS':'REVIEW'}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </motion.div>
);

export default SecurityPosture;
