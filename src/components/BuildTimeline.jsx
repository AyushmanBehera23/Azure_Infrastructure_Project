import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const phases = [
  {
    title: "Foundation & Identity",
    desc: "Setting up the digital office and creating user accounts.",
    steps: [
      { num: 1,  title: 'Create Resource Group', why: 'The main container.',         desc: 'RG-SupportPortal in East Asia.' },
      { num: 2,  title: 'Create Users',          why: 'Employee accounts.',           desc: 'Created 6 users with auto-passwords.' },
      { num: 3,  title: 'Create Groups',         why: 'Grouping users.',             desc: 'Billing-Sub, Escalations-Sub, Ticketing-Sub.' },
      { num: 4,  title: 'Assign Users',          why: 'Departments.',                desc: '2 users per group.' },
      { num: 5,  title: 'Assign Roles',          why: 'Security clearances.',        desc: 'Billing/Ticketing (Reader), Escalations (VM Contributor).' },
    ]
  },
  {
    title: "Network Topology",
    desc: "Building the secure floor plan and assigning security guards.",
    steps: [
      { num: 6,  title: 'Virtual Network',  why: 'The secure perimeter.',  desc: 'support-vnet (10.10.0.0/16).' },
      { num: 7,  title: 'Create Subnets',   why: 'Dividing the office.',   desc: 'Billing, Escalations, Ticketing subnets.' },
      { num: 8,  title: 'Create NSGs',      why: 'Security guards.',       desc: 'nsg-1, nsg-2, nsg-3.' },
      { num: 9,  title: 'RDP Rules',        why: 'Allow admin access.',    desc: 'Allow Port 3389 from My IP.' },
      { num: 10, title: 'Associate NSGs',   why: 'Guards at doors.',       desc: 'Linked NSGs to subnets.' },
    ]
  },
  {
    title: "Compute & Connections",
    desc: "Setting up the workstations and connecting them.",
    steps: [
      { num: 11, title: 'Public IP',    why: 'Outside access.',        desc: 'support-public-ip created.' },
      { num: 12, title: 'Create NICs',  why: 'Network cables.',        desc: 'Public IP attached ONLY to nic-1.' },
      { num: 13, title: 'Create VMs',   why: 'Deploying workstations.', desc: 'vm-1, vm-2, vm-3, vm-4.' },
      { num: 14, title: 'VM Access',    why: 'Log into workstations.', desc: 'Assigned VM Login roles.' },
    ]
  },
  {
    title: "Storage & Governance",
    desc: "Setting up file cabinets and disaster recovery.",
    steps: [
      { num: 15, title: 'Create Storage',   why: 'Secure file cabinets.', desc: '3 storage accounts created.' },
      { num: 16, title: 'Create Container', why: 'Drawer for logs.',      desc: 'chat-logs container.' },
      { num: 17, title: 'Generate SAS',     why: 'Guest pass.',           desc: 'Read-Only SAS URL (1 hr).' },
      { num: 18, title: 'Custom Policy',    why: 'Strict company rule.',  desc: 'Deny-Subnet-Delegation.' },
      { num: 19, title: 'Assign Policy',    why: 'Enforcing the rule.',   desc: 'Applied to RG-SupportPortal.' },
      { num: 20, title: 'Backup Vault',     why: 'Disaster recovery.',    desc: 'support-backup-vault.' },
      { num: 21, title: 'Backup Policy',    why: 'Save data.',            desc: 'Daily, 7-day retention.' },
      { num: 22, title: 'Backup VMs',       why: 'Protect critical data.', desc: 'Enabled for vm-3 & vm-4.' },
    ]
  }
];

const navBtn = { width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--n-6)', background: 'var(--n-8)', color: 'var(--n-1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', transition: 'border-color 0.2s' };

const BuildTimeline = () => {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        <div>
          <h2 className="text-h2" style={{ marginBottom: '0.5rem' }}>Implementation<br />Roadmap</h2>
          <p style={{ color: 'var(--n-3)' }}>Follow these steps to replicate the architecture.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ ...navBtn, opacity: activePhase === 0 ? 0.4 : 1 }} onClick={() => setActivePhase(Math.max(0, activePhase - 1))} disabled={activePhase === 0}><FaChevronLeft /></button>
          <button style={{ ...navBtn, opacity: activePhase === phases.length - 1 ? 0.4 : 1 }} onClick={() => setActivePhase(Math.min(phases.length - 1, activePhase + 1))} disabled={activePhase === phases.length - 1}><FaChevronRight /></button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activePhase} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
          <div style={{ borderBottom: '1px solid var(--n-6)', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '0.4rem' }}>Phase {activePhase + 1}: {phases[activePhase].title}</h3>
            <p style={{ color: 'var(--color-1)', margin: 0 }}>{phases[activePhase].desc}</p>
          </div>

          <div className="roadmap-track">
            {phases[activePhase].steps.map((step, idx) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="roadmap-step">
                <div className="card" style={{ padding: '2.5rem 2rem', height: '100%' }}>
                  <div className="mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--n-5)', marginBottom: '1.5rem' }}>
                    [{step.num.toString().padStart(2, '0')}]
                  </div>
                  <h4 style={{ marginBottom: '0.75rem' }}>{step.title}</h4>
                  <p className="mono text-sm" style={{ color: 'var(--color-2)', marginBottom: '0.5rem' }}>WHY: {step.why}</p>
                  <p style={{ color: 'var(--n-3)', fontSize: '0.875rem', margin: 0 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BuildTimeline;
