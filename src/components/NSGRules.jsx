import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const nsgs = [
  { name: 'nsg-1', subnet: 'billing-subnet (10.10.1.0/24)', vm: 'vm-1' },
  { name: 'nsg-2', subnet: 'escalations-subnet (10.10.2.0/24)', vm: 'vm-2' },
  { name: 'nsg-3', subnet: 'ticketing-subnet (10.10.3.0/24)', vm: 'vm-3' },
];

const inbound = [
  { priority: 100,   name: 'Allow-RDP-MyIP',               port: '3389', proto: 'TCP', src: 'Admin IP',         dst: 'Any',            action: 'Allow' },
  { priority: 65000, name: 'AllowVnetInBound',              port: 'Any',  proto: 'Any', src: 'VirtualNetwork',   dst: 'VirtualNetwork', action: 'Allow' },
  { priority: 65001, name: 'AllowAzureLoadBalancerInBound', port: 'Any',  proto: 'Any', src: 'AzureLoadBalancer',dst: 'Any',            action: 'Allow' },
  { priority: 65500, name: 'DenyAllInBound',                port: 'Any',  proto: 'Any', src: 'Any',              dst: 'Any',            action: 'Deny'  },
];

const outbound = [
  { priority: 65000, name: 'AllowVnetOutBound',     port: 'Any', proto: 'Any', src: 'VirtualNetwork', dst: 'VirtualNetwork', action: 'Allow' },
  { priority: 65001, name: 'AllowInternetOutBound', port: 'Any', proto: 'Any', src: 'Any',            dst: 'Internet',       action: 'Allow' },
  { priority: 65500, name: 'DenyAllOutBound',       port: 'Any', proto: 'Any', src: 'Any',            dst: 'Any',            action: 'Deny'  },
];

const cols = ['Priority','Name','Port','Protocol','Source','Destination','Action'];
const RuleTable = ({ rules, dir }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.75rem' }}>
      {dir==='Inbound'
        ? <FaArrowRight style={{color:'var(--color-3)'}}/>
        : <FaArrowLeft style={{color:'var(--color-4)'}}/>}
      <span style={{ fontFamily:'var(--font-code)', fontSize:'0.72rem', color:'var(--n-4)', fontWeight:700, letterSpacing:'0.1em' }}>{dir.toUpperCase()} RULES</span>
    </div>
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ borderBottom:'1px solid var(--n-6)' }}>
            {cols.map(h => <th key={h} style={{ padding:'0.5rem 0.75rem', textAlign:'left', fontFamily:'var(--font-code)', fontSize:'0.68rem', color:'var(--n-4)', letterSpacing:'0.1em', backgroundColor:'transparent' }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rules.map((r,i) => (
            <tr key={i} style={{ borderBottom: i<rules.length-1 ? '1px solid var(--n-6)' : 'none', backgroundColor:'transparent' }}>
              <td style={{ padding:'0.55rem 0.75rem', fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--color-2)' }}>{r.priority}</td>
              <td style={{ padding:'0.55rem 0.75rem', fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--n-1)', fontWeight:600 }}>{r.name}</td>
              <td style={{ padding:'0.55rem 0.75rem', fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--n-3)' }}>{r.port}</td>
              <td style={{ padding:'0.55rem 0.75rem', fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--n-3)' }}>{r.proto}</td>
              <td style={{ padding:'0.55rem 0.75rem', fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--n-3)' }}>{r.src}</td>
              <td style={{ padding:'0.55rem 0.75rem', fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--n-3)' }}>{r.dst}</td>
              <td style={{ padding:'0.55rem 0.75rem' }}>
                <span style={{ padding:'0.2rem 0.65rem', borderRadius:'99px', border:`1px solid ${r.action==='Allow'?'var(--color-4)':'var(--color-3)'}`, color: r.action==='Allow'?'var(--color-4)':'var(--color-3)', fontFamily:'var(--font-code)', fontSize:'0.72rem', fontWeight:600 }}>{r.action}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const NSGRules = () => (
  <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
    <h2 style={{ textAlign:'center', marginBottom:'0.75rem', fontFamily:'Sora', color:'var(--n-1)', fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:600 }}>NSG Security Rules</h2>
    <p style={{ textAlign:'center', color:'var(--n-4)', fontSize:'0.875rem', marginBottom:'2rem' }}>All 3 NSGs share identical rule sets. Only RDP (TCP 3389) from admin IP is permitted inbound.</p>

    <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2rem', justifyContent:'center' }}>
      {nsgs.map((n,i) => (
        <div key={i} className="card" style={{ padding:'1rem 1.5rem', display:'flex', alignItems:'center', gap:'0.75rem', flex:'1', minWidth:'220px' }}>
          <FaShieldAlt style={{ color:'var(--color-3)', fontSize:'1.2rem', flexShrink:0 }}/>
          <div>
            <div style={{ color:'var(--color-3)', fontFamily:'var(--font-code)', fontWeight:700 }}>{n.name}</div>
            <div style={{ color:'var(--n-4)', fontSize:'0.75rem' }}>{n.subnet}</div>
            <div style={{ color:'var(--n-3)', fontSize:'0.75rem' }}>Attached to: <span style={{color:'var(--color-2)'}}>{n.vm}</span></div>
          </div>
        </div>
      ))}
    </div>

    <div className="card" style={{ padding:'1.5rem 2rem' }}>
      <RuleTable rules={inbound}  dir="Inbound"  />
      <RuleTable rules={outbound} dir="Outbound" />
    </div>
  </motion.div>
);

export default NSGRules;
