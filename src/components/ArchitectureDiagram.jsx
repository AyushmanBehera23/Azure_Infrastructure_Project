import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaTimes } from 'react-icons/fa';

const C = {
  purple:'#AC6AFF', yellow:'#FFC876', red:'#FF776F',
  green:'#7ADB78', blue:'#858DFF', pink:'#FF98E2',
  n1:'#FFFFFF', n3:'#ADA8C3', n4:'#757185', n7:'#15131D',
};

const INFO = {
  'Internet / Admin':      { use: 'Entry point for admin RDP access to the infrastructure.', conn: 'Routes through Public IP → NIC-1 → vm-1 (Billing Team).' },
  'support-public-ip':     { use: 'Static IPv4 address assigned to nic-1 only.', conn: 'Exposes vm-1 to internet for admin RDP. All other VMs are private.' },
  'user1 & user2':         { use: 'Billing team employee accounts in Entra ID.', conn: 'Assigned to Billing-Sub group → Reader role on RG-SupportPortal.' },
  'user3 & user4':         { use: 'Escalation team employee accounts in Entra ID.', conn: 'Assigned to Escalations-Sub → VM Contributor role to manage VMs.' },
  'user5 & user6':         { use: 'Ticketing team employee accounts in Entra ID.', conn: 'Assigned to Ticketing-Sub group → Reader role on RG-SupportPortal.' },
  'Billing-Sub':           { use: 'Entra ID Security group for billing staff.', conn: 'Granted Reader RBAC role — read-only access to the resource group.' },
  'Escalations-Sub':       { use: 'Entra ID Security group for escalations staff.', conn: 'Granted VM Contributor role — can start/stop/restart VMs.' },
  'Ticketing-Sub':         { use: 'Entra ID Security group for ticketing staff.', conn: 'Granted Reader RBAC role — read-only access to the resource group.' },
  'Reader Role':           { use: 'Azure RBAC role giving read-only access to resources.', conn: 'Applied to Billing-Sub and Ticketing-Sub on RG-SupportPortal.' },
  'VM Contributor':        { use: 'Azure RBAC role to manage (not delete) VMs.', conn: 'Applied to Escalations-Sub — lets them restart VMs during incidents.' },
  'billing-subnet':        { use: 'Isolated network segment (10.10.1.0/24) for billing VMs.', conn: 'Hosts nic-1. Protected by nsg-1 — allows RDP from admin IP only.' },
  'escalations-sub':       { use: 'Isolated network segment (10.10.2.0/24) for escalations.', conn: 'Hosts nic-2. Protected by nsg-2 — fully private, no public IP.' },
  'ticketing-subnet':      { use: 'Isolated network segment (10.10.3.0/24) for ticketing.', conn: 'Hosts nic-3. Protected by nsg-3 — fully private, no public IP.' },
  'Deny-Delegation':       { use: 'Custom Azure Policy blocking subnet delegation.', conn: 'Applied to the VNet — prevents subnets from being handed to external services.' },
  'nsg-1':                 { use: 'Network Security Group guarding the billing subnet.', conn: 'Allows RDP (TCP 3389) from admin IP only. All other inbound blocked.' },
  'nsg-2':                 { use: 'Network Security Group guarding the escalations subnet.', conn: 'Allows RDP from admin IP only. All other inbound denied.' },
  'nsg-3':                 { use: 'Network Security Group guarding the ticketing subnet.', conn: 'Allows RDP from admin IP only. All other inbound denied.' },
  'nic-1':                 { use: 'Network interface card attached to vm-1.', conn: 'Has the Public IP — the only NIC with internet-facing access.' },
  'nic-2':                 { use: 'Network interface card attached to vm-2.', conn: 'Private only — routes through escalations-subnet inside the VNet.' },
  'nic-3':                 { use: 'Network interface card attached to vm-3.', conn: 'Private only — routes through ticketing-subnet inside the VNet.' },
  'nic-4':                 { use: 'Second network interface card on vm-3.', conn: 'Also on ticketing-subnet — gives vm-3 dual NIC redundancy, protected by nsg-3.' },
  'vm-1':                  { use: 'Windows Server 2022 VM for the Billing Team.', conn: 'Accessible via Public IP/nic-1. Sends data to stsupport01.' },
  'vm-2':                  { use: 'Windows Server 2022 VM for the Escalations Team.', conn: 'Private VM via nic-2. Sends data to stsupport02.' },
  'vm-3':                  { use: 'Windows Server 2022 VM for the Ticketing Team (dual NIC).', conn: 'Private VM via nic-3 and nic-4. Backed up daily to support-backup-vault.' },
  'stsupport01':          { use: 'Azure Storage Account for Billing Team (vm-1).', conn: 'vm-1 writes billing data here. LRS redundancy, StorageV2.' },
  'stsupport02':          { use: 'Azure Storage Account for Escalations Team (vm-2).', conn: 'vm-2 writes escalation data here. LRS redundancy, StorageV2.' },
  'stsupport03':          { use: 'Azure Storage Account for Ticketing Team (vm-3).', conn: 'vm-3 writes ticketing data here. Contains the chat-logs Blob container.' },
  'chat-logs':             { use: 'Blob container inside stsupport03 for storing chat logs.', conn: 'SAS token grants Read-only access with 1-hour expiry. No public access.' },
  'support-backup-vault':  { use: 'Azure Recovery Services Vault for disaster recovery.', conn: 'Backs up vm-3 daily with 7-day retention policy.' },
};

const ARROWS = {
  '#AC6AFF': 'arr-purple', '#FFC876': 'arr-yellow', '#FF776F': 'arr-red',
  '#7ADB78': 'arr-green',  '#858DFF': 'arr-blue',   '#FF98E2': 'arr-pink',
};

const Edge = ({ x1, y1, x2, y2, color = C.purple, delay = 0, dur = 5 }) => {
  const d = `M${x1} ${y1} L${x2} ${y2}`;
  const arrow = ARROWS[color];
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="1.5" strokeOpacity="0.35"
        markerEnd={arrow ? `url(#${arrow})` : undefined}
      />
      <circle r="6" fill={color} filter="url(#glow)">
        <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
      </circle>
    </g>
  );
};

const Node = ({ x, y, w = 130, h = 52, label, sub, color = C.purple, onHover }) => (
  <g
    onMouseEnter={e => onHover && onHover(label, e)}
    onMouseLeave={() => onHover && onHover(null)}
    style={{ cursor: 'pointer' }}
  >
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="12" fill={C.n7} stroke={color} strokeWidth="1.8" />
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="12" fill={color} fillOpacity="0.07" />
    <text x={x} y={sub ? y - 7 : y + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill={C.n1} fontFamily="Sora,sans-serif">{label}</text>
    {sub && <text x={x} y={y + 13} textAnchor="middle" fontSize="10" fill={C.n4} fontFamily="Source Code Pro,monospace">{sub}</text>}
  </g>
);

const Group = ({ x, y, w, h, label, color }) => (
  <g>
    <rect x={x + 8} y={y - 20} width={label.length * 7.5 + 16} height={20} rx="5"
      fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
    <text x={x + 16} y={y - 5} fontSize="10.5" fill={color} fontFamily="Source Code Pro,monospace" fontWeight="700">{label}</text>
    <rect x={x} y={y} width={w} height={h} rx="16"
      fill={color} fillOpacity="0.03"
      stroke={color} strokeOpacity="0.18" strokeWidth="1.2" strokeDasharray="6 4" />
  </g>
);

const Tooltip = ({ data }) => {
  if (!data) return null;
  const key = data.label.replace('🌐 ', '');
  const info = INFO[key];
  if (!info) return null;
  return (
    <div style={{
      position: 'absolute', left: data.x, top: data.y,
      background: 'rgba(14,12,21,0.97)', border: '1px solid var(--color-1)',
      borderRadius: '12px', padding: '1rem 1.25rem', maxWidth: '280px',
      zIndex: 50, pointerEvents: 'none',
      boxShadow: '0 8px 32px rgba(172,106,255,0.3)',
    }}>
      <p style={{ color: C.n4, fontFamily: 'var(--font-code)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', margin: '0 0 0.35rem' }}>PURPOSE</p>
      <p style={{ color: C.n1, fontSize: '0.84rem', margin: '0 0 0.75rem', lineHeight: 1.55 }}>{info.use}</p>
      <p style={{ color: C.n4, fontFamily: 'var(--font-code)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', margin: '0 0 0.35rem' }}>CONNECTION</p>
      <p style={{ color: C.yellow, fontSize: '0.82rem', margin: 0, lineHeight: 1.55 }}>{info.conn}</p>
    </div>
  );
};

const DiagramSVG = ({ onHover }) => {
  const X = { u: 110, g: 290, r: 470, s: 660, n: 845, ni: 1020, vm: 1195, stor: 1440 };
  // rows 130px apart; top nodes 85px; groups start at 145px
  const Y = { top: 85, r1: 200, r2: 330, r3: 460, r4: 590, r5: 700 };
  const GY = 145;  // group box top
  const GH3 = 365; // 3-row
  const GH4 = 495; // 4-row
  const GH5 = 610; // 5-row

  const h = (label, e) => onHover && onHover(label, e);

  return (
    <svg viewBox="0 0 1660 840" width="100%" style={{ display: 'block' }}>
      <defs>
        <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {[
          ['arr-purple', C.purple], ['arr-yellow', C.yellow], ['arr-red', C.red],
          ['arr-green',  C.green],  ['arr-blue',   C.blue],   ['arr-pink', C.pink],
        ].map(([id, fill]) => (
          <marker key={id} id={id} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={fill} opacity="0.8" />
          </marker>
        ))}
      </defs>

      {/* ── Plane banners removed ── */}

      {/* ── Group boxes — sized to their content ── */}
      <Group x={42}   y={GY} w={148} h={GH3} label="Entra ID Users"        color={C.purple} />
      <Group x={218}  y={GY} w={148} h={GH3} label="Groups"                color={C.blue} />
      <Group x={392}  y={GY} w={148} h={GH3} label="Resource Group / RBAC" color={C.yellow} />
      <g>
        <rect x={575} y={GY+10} width={148} height={GH3-10} rx="14"
          fill={C.green} fillOpacity="0.02" stroke={C.green} strokeOpacity="0.10" strokeWidth="1" strokeDasharray="4 6" />
        <rect x={581} y={GY} width={138} height={20} rx="4" fill={C.green} fillOpacity="0.12" stroke={C.green} strokeOpacity="0.3" strokeWidth="1" />
        <text x={587} y={GY+14} fontSize="9" fill={C.green} fontFamily="Source Code Pro,monospace" fontWeight="700">support-vnet · 10.10.0.0/16</text>
      </g>
      <Group x={577}  y={GY} w={148} h={GH3} label="Subnets"               color={C.green} />
      <Group x={758}  y={GY} w={143} h={GH3} label="NSGs"                  color={C.red} />
      <Group x={934}  y={GY} w={143} h={GH4} label="NICs"                  color={C.blue} />
      <Group x={1109} y={GY} w={143} h={GH3} label="VMs"                   color={C.yellow} />
      <Group x={1345} y={GY} w={183} h={GH5} label="Storage &amp; Backup"  color={C.purple} />

      {/* ── Edges ── */}
      {/* Vertical drops from top nodes into columns */}
      <Edge x1={X.r}    y1={Y.top+26} x2={X.r}    y2={Y.r1-26} color={C.green}  delay={0}   dur={3.5} />
      <Edge x1={X.ni}   y1={Y.top+26} x2={X.ni}   y2={Y.r1-26} color={C.yellow} delay={0.5} dur={4} />
      {/* Users → Groups */}
      <Edge x1={X.u+60} y1={Y.r1} x2={X.g-60} y2={Y.r1} color={C.purple} delay={0}   dur={3} />
      <Edge x1={X.u+60} y1={Y.r2} x2={X.g-60} y2={Y.r2} color={C.blue}   delay={0.6} dur={3} />
      <Edge x1={X.u+60} y1={Y.r3} x2={X.g-60} y2={Y.r3} color={C.green}  delay={1.2} dur={3} />
      {/* Groups → RBAC */}
      <Edge x1={X.g+60} y1={Y.r1} x2={X.r-60} y2={Y.r1} color={C.yellow} delay={0.4} dur={3} />
      <Edge x1={X.g+60} y1={Y.r2} x2={X.r-60} y2={Y.r2} color={C.red}    delay={1.0} dur={3} />
      <Edge x1={X.g+60} y1={Y.r3} x2={X.r-60} y2={Y.r3} color={C.yellow} delay={1.6} dur={3} />
      {/* RBAC → Subnets */}
      <Edge x1={X.r+60} y1={Y.r1} x2={X.s-60} y2={Y.r1} color={C.green}  delay={0.6} dur={3.5} />
      <Edge x1={X.r+60} y1={Y.r2} x2={X.s-60} y2={Y.r2} color={C.green}  delay={1.2} dur={3.5} />
      <Edge x1={X.r+60} y1={Y.r3} x2={X.s-60} y2={Y.r3} color={C.green}  delay={1.8} dur={3.5} />
      {/* Subnets → NSGs */}
      <Edge x1={X.s+60} y1={Y.r1} x2={X.n-55} y2={Y.r1} color={C.red}    delay={0.8} dur={3} />
      <Edge x1={X.s+60} y1={Y.r2} x2={X.n-55} y2={Y.r2} color={C.red}    delay={1.4} dur={3} />
      <Edge x1={X.s+60} y1={Y.r3} x2={X.n-55} y2={Y.r3} color={C.red}    delay={2.0} dur={3} />
      {/* NSGs → NICs (nsg-3 feeds both nic-3 and nic-4) */}
      <Edge x1={X.n+55} y1={Y.r1} x2={X.ni-55} y2={Y.r1} color={C.blue}  delay={1.0} dur={3} />
      <Edge x1={X.n+55} y1={Y.r2} x2={X.ni-55} y2={Y.r2} color={C.blue}  delay={1.6} dur={3} />
      <Edge x1={X.n+55} y1={Y.r3} x2={X.ni-55} y2={Y.r3} color={C.blue}  delay={2.2} dur={3} />
      <Edge x1={X.n+55} y1={Y.r3} x2={X.ni-55} y2={Y.r4} color={C.blue}  delay={2.6} dur={3} />
      {/* NICs → VMs */}
      <Edge x1={X.ni+55} y1={Y.r1} x2={X.vm-55} y2={Y.r1} color={C.yellow} delay={1.2} dur={3} />
      <Edge x1={X.ni+55} y1={Y.r2} x2={X.vm-55} y2={Y.r2} color={C.yellow} delay={1.8} dur={3} />
      <Edge x1={X.ni+55} y1={Y.r3} x2={X.vm-55} y2={Y.r3} color={C.yellow} delay={2.4} dur={3} />
      <Edge x1={X.ni+55} y1={Y.r4} x2={X.vm-55} y2={Y.r3} color={C.yellow} delay={2.8} dur={3} />
      {/* VMs → Storage (straight horizontal per row) */}
      <Edge x1={X.vm+55} y1={Y.r1} x2={X.stor-92} y2={Y.r1} color={C.purple} delay={1.6} dur={4} />
      <Edge x1={X.vm+55} y1={Y.r2} x2={X.stor-92} y2={Y.r2} color={C.purple} delay={2.0} dur={4} />
      <Edge x1={X.vm+55} y1={Y.r3} x2={X.stor-92} y2={Y.r3} color={C.purple} delay={2.4} dur={4} />
      {/* st03 → chat-logs vertical */}
      <Edge x1={X.stor} y1={Y.r3+26} x2={X.stor} y2={Y.r4-26} color={C.pink} delay={2.2} dur={3.5} />
      {/* vm-3 → backup-vault */}
      <Edge x1={X.vm+55} y1={Y.r3} x2={X.stor-92} y2={Y.r5} color={C.pink} delay={2.8} dur={5} />
      {/* Policy vertical */}
      <Edge x1={X.s} y1={Y.r5-26} x2={X.s} y2={Y.r3+26} color={C.blue} delay={2.0} dur={4} />

      {/* ── Internal VM Flows (Allowed & Blocked) ── */}
      
      {/* VM-1 -> VM-2 (Allowed) */}
      <path d="M 1195 223 L 1195 307" fill="none" stroke={C.green} strokeWidth="1.5" strokeOpacity="0.8" markerEnd="url(#arr-green)" />
      <circle r="4" fill={C.green} filter="url(#glow)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 1195 223 L 1195 307" />
      </circle>
      <text x={1185} y={258} textAnchor="end" fontSize="8" fill={C.green} fontFamily="Source Code Pro,monospace" fontWeight="700">Allowed</text>
      <text x={1185} y={269} textAnchor="end" fontSize="7" fill={C.green} opacity="0.8" fontFamily="Source Code Pro,monospace">Internal Secure</text>
      <text x={1185} y={278} textAnchor="end" fontSize="7" fill={C.green} opacity="0.8" fontFamily="Source Code Pro,monospace">Traffic</text>

      {/* VM-2 -> VM-3 (Allowed) */}
      <path d="M 1195 353 L 1195 437" fill="none" stroke={C.green} strokeWidth="1.5" strokeOpacity="0.8" markerEnd="url(#arr-green)" />
      <circle r="4" fill={C.green} filter="url(#glow)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 1195 353 L 1195 437" />
      </circle>
      <text x={1185} y={388} textAnchor="end" fontSize="8" fill={C.green} fontFamily="Source Code Pro,monospace" fontWeight="700">Allowed</text>
      <text x={1185} y={399} textAnchor="end" fontSize="7" fill={C.green} opacity="0.8" fontFamily="Source Code Pro,monospace">Internal Secure</text>
      <text x={1185} y={408} textAnchor="end" fontSize="7" fill={C.green} opacity="0.8" fontFamily="Source Code Pro,monospace">Traffic</text>

      {/* VM-1 -> VM-3 (Blocked Flow) */}
      <path d="M 1248 210 L 1270 210 Q 1280 210 1280 220 L 1280 440 Q 1280 450 1270 450 L 1248 450" fill="none" stroke={C.red} strokeWidth="1.5" strokeDasharray="5 5" strokeOpacity="0.7" markerEnd="url(#arr-red)" />
      <g transform="translate(1280, 395)">
        <circle r="8" fill={C.n7} stroke={C.red} strokeWidth="1.5" />
        <path d="M -3 -3 L 3 3 M 3 -3 L -3 3" stroke={C.red} strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text x={1292} y={390} textAnchor="start" fontSize="8" fill={C.red} fontFamily="Source Code Pro,monospace" fontWeight="700">Blocked Flow</text>
      <text x={1292} y={401} textAnchor="start" fontSize="7" fill={C.red} opacity="0.8" fontFamily="Source Code Pro,monospace">NSG Deny Rule</text>
      <text x={1292} y={410} textAnchor="start" fontSize="7" fill={C.red} opacity="0.8" fontFamily="Source Code Pro,monospace">Backend Isolation</text>

      {/* ── Nodes ── */}
      {/* Top row — outside groups */}
      <Node x={X.r}    y={Y.top} w={155} h={46} label="🌐 Internet / Admin"  color={C.purple} onHover={h} />
      <Node x={X.ni}   y={Y.top} w={162} h={46} label="support-public-ip"    sub="Static IPv4" color={C.yellow} onHover={h} />

      <Node x={X.u}  y={Y.r1} w={125} h={46} label="user1 &amp; user2"  color={C.purple} onHover={h} />
      <Node x={X.u}  y={Y.r2} w={125} h={46} label="user3 &amp; user4"  color={C.blue}   onHover={h} />
      <Node x={X.u}  y={Y.r3} w={125} h={46} label="user5 &amp; user6"  color={C.green}  onHover={h} />
      <Node x={X.g}  y={Y.r1} w={115} h={46} label="Billing-Sub"        color={C.purple} onHover={h} />
      <Node x={X.g}  y={Y.r2} w={115} h={46} label="Escalations-Sub"    color={C.blue}   onHover={h} />
      <Node x={X.g}  y={Y.r3} w={115} h={46} label="Ticketing-Sub"      color={C.green}  onHover={h} />
      <Node x={X.r}  y={Y.r1} w={115} h={46} label="Reader Role"        color={C.yellow} onHover={h} />
      <Node x={X.r}  y={Y.r2} w={115} h={46} label="VM Contributor"     color={C.red}    onHover={h} />
      <Node x={X.r}  y={Y.r3} w={115} h={46} label="Reader Role"        color={C.yellow} onHover={h} />
      <Node x={X.s}  y={Y.r1} w={125} h={46} label="billing-subnet"    sub="10.10.1.0/24" color={C.green} onHover={h} />
      <Node x={X.s}  y={Y.r2} w={125} h={46} label="escalations-sub"   sub="10.10.2.0/24" color={C.green} onHover={h} />
      <Node x={X.s}  y={Y.r3} w={125} h={46} label="ticketing-subnet"  sub="10.10.3.0/24" color={C.green} onHover={h} />
      <Node x={X.s}  y={Y.r5} w={138} h={46} label="Deny-Delegation"   sub="Azure Policy"  color={C.blue}  onHover={h} />
      <Node x={X.n}  y={Y.r1} w={108} h={46} label="nsg-1" sub="TCP 3389" color={C.red}    onHover={h} />
      <Node x={X.n}  y={Y.r2} w={108} h={46} label="nsg-2" sub="TCP 3389" color={C.red}    onHover={h} />
      <Node x={X.n}  y={Y.r3} w={108} h={46} label="nsg-3" sub="TCP 3389" color={C.red}    onHover={h} />
      <Node x={X.ni} y={Y.r1} w={105} h={46} label="nic-1" sub="Public IP" color={C.blue}  onHover={h} />
      <Node x={X.ni} y={Y.r2} w={105} h={46} label="nic-2" sub="Private"   color={C.blue}  onHover={h} />
      <Node x={X.ni} y={Y.r3} w={105} h={46} label="nic-3" sub="Private"   color={C.blue}  onHover={h} />
      <Node x={X.ni} y={Y.r4} w={105} h={46} label="nic-4" sub="Private"   color={C.blue}  onHover={h} />
      <Node x={X.vm} y={Y.r1} w={105} h={46} label="vm-1"  sub="Billing"     color={C.yellow} onHover={h} />
      <Node x={X.vm} y={Y.r2} w={105} h={46} label="vm-2"  sub="Escalations" color={C.yellow} onHover={h} />
      <Node x={X.vm} y={Y.r3} w={105} h={46} label="vm-3"  sub="Ticketing"   color={C.yellow} onHover={h} />
      <Node x={X.stor} y={Y.r1} w={150} h={46} label="stsupport01"           sub="Billing · LRS"     color={C.purple} onHover={h} />
      <Node x={X.stor} y={Y.r2} w={150} h={46} label="stsupport02"           sub="Escalations · LRS" color={C.purple} onHover={h} />
      <Node x={X.stor} y={Y.r3} w={150} h={46} label="stsupport03"           sub="Ticketing · LRS"   color={C.purple} onHover={h} />
      <Node x={X.stor} y={Y.r4} w={145} h={46} label="chat-logs"             sub="Read-only SAS"     color={C.pink}   onHover={h} />
      <Node x={X.stor} y={Y.r5} w={162} h={46} label="support-backup-vault"  sub="Daily · 7 Days"    color={C.pink}   onHover={h} />
    </svg>
  );
};
const ArchitectureDiagram = () => {
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const handleHover = (label, e) => {
    if (!label) { setTooltip(null); return; }
    const svgRect = e.currentTarget.closest('svg').getBoundingClientRect();
    const cardRect = e.currentTarget.closest('.arch-card').getBoundingClientRect();
    setTooltip({ label, x: e.clientX - cardRect.left + 12, y: e.clientY - cardRect.top - 10 });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontFamily: 'Sora', color: C.n1, fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600, margin: 0 }}>Architecture Graph</h2>
          <button onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 1.4rem', borderRadius: '99px', border: '1px solid var(--color-1)', background: 'var(--n-7)', color: 'var(--color-1)', fontFamily: 'var(--font-code)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
            <FaExpand /> Expand Full View
          </button>
        </div>

        <div className="card arch-card" onClick={() => setOpen(true)} style={{ padding: '1rem', overflowX: 'auto', cursor: 'zoom-in', position: 'relative' }}>
          <DiagramSVG onHover={handleHover} />
          <Tooltip data={tooltip} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1.25rem' }}>
          {[[C.purple,'Identity/Storage'],[C.green,'Network/Subnet'],[C.red,'NSG Security'],[C.yellow,'Compute (VM)'],[C.blue,'RBAC/NICs/Policy'],[C.pink,'Backup']].map(([color, label]) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: C.n3, fontFamily: 'var(--font-code)' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(14,12,21,0.97)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', borderBottom: '1px solid var(--n-6)', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Sora', color: C.n1, fontSize: '1.2rem', fontWeight: 600 }}>Architecture Graph — Full View</span>
              <button onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.1rem', borderRadius: '99px', border: '1px solid var(--n-6)', background: 'var(--n-7)', color: C.n1, fontFamily: 'var(--font-code)', fontSize: '0.8rem', cursor: 'pointer' }}>
                <FaTimes /> Close
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '2rem', position: 'relative' }} className="arch-card">
              <DiagramSVG onHover={handleHover} />
              <Tooltip data={tooltip} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArchitectureDiagram;
