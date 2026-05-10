import React from 'react';
import { FaMicrosoft, FaGithub, FaShieldAlt, FaHeart } from 'react-icons/fa';

const links = [
  { label: 'Overview',   href: '#overview' },
  { label: 'Timeline',   href: '#timeline' },
  { label: 'Resources',  href: '#inventory' },
  { label: 'Identity',   href: '#identity' },
  { label: 'NSG Rules',  href: '#nsg' },
  { label: 'Network',    href: '#network' },
  { label: 'Graph',      href: '#architecture' },
  { label: 'Compute',    href: '#compute' },
  { label: 'Storage',    href: '#storage' },
  { label: 'Security',   href: '#security' },
  { label: 'Guide',      href: '#build-guide' },
];

const badges = [
  'Azure RBAC', 'NSG Enforced', 'SAS Token', 'Daily Backup',
  'Subnet Policy', 'Entra ID', 'Private VMs', 'LRS Storage',
];

const Footer = () => (
  <footer style={{
    borderTop: '1px solid var(--n-6)',
    backgroundColor: 'var(--n-8)',
    marginTop: '4rem',
  }}>
    {/* Badge strip */}
    <div style={{
      borderBottom: '1px solid var(--n-6)',
      padding: '1rem 0',
      overflow: 'hidden',
      display: 'flex',
      gap: '1.5rem',
      flexWrap: 'nowrap',
    }}>
      <div style={{ display: 'flex', gap: '1rem', animation: 'scroll 20s linear infinite', whiteSpace: 'nowrap', flexShrink: 0 }}>
        {[...badges, ...badges].map((b, i) => (
          <span key={i} style={{
            padding: '0.3rem 0.9rem', borderRadius: '99px',
            border: '1px solid var(--n-6)', color: 'var(--n-4)',
            fontFamily: 'var(--font-code)', fontSize: '0.72rem',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <FaShieldAlt style={{ color: 'var(--color-1)', fontSize: '0.6rem' }} />
            {b}
          </span>
        ))}
      </div>
    </div>

    <div className="container" style={{ padding: '3rem 2rem 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <FaMicrosoft style={{ color: 'var(--color-1)', fontSize: '1.4rem' }} />
            <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1.1rem', color: 'var(--n-1)' }}>
              Brainwave<span style={{ fontWeight: 300 }}>Azure</span>
            </span>
          </div>
          <p style={{ color: 'var(--n-4)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '340px', margin: '0 0 1.25rem' }}>
            A fully documented, security-first Azure cloud infrastructure for a Support Portal — featuring RBAC, NSG enforcement, subnet isolation, SAS-based storage, and automated backup pipelines.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { label: 'RG-SupportPortal', color: 'var(--color-1)' },
              { label: 'Central India',     color: 'var(--color-4)' },
              { label: 'CA2 Project',       color: 'var(--color-2)' },
            ].map(({ label, color }) => (
              <span key={label} style={{ padding: '0.25rem 0.7rem', borderRadius: '99px', border: `1px solid ${color}`, color, fontFamily: 'var(--font-code)', fontSize: '0.7rem' }}>{label}</span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h6 style={{ color: 'var(--n-4)', fontFamily: 'var(--font-code)', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase' }}>Navigation</h6>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {links.slice(0, 6).map(l => (
              <li key={l.label}><a href={l.href} style={{ color: 'var(--n-3)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-1)'}
                onMouseLeave={e => e.target.style.color = 'var(--n-3)'}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h6 style={{ color: 'var(--n-4)', fontFamily: 'var(--font-code)', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase' }}>Sections</h6>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {links.slice(6).map(l => (
              <li key={l.label}><a href={l.href} style={{ color: 'var(--n-3)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-1)'}
                onMouseLeave={e => e.target.style.color = 'var(--n-3)'}>{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--n-6)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ color: 'var(--n-4)', fontFamily: 'var(--font-code)', fontSize: '0.75rem' }}>
          © 2026 BrainwaveAzure · CA2 Cloud Architecture Project · All resources deployed on Microsoft Azure
        </span>
        <span style={{ color: 'var(--n-4)', fontFamily: 'var(--font-code)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          Built with <FaHeart style={{ color: 'var(--color-3)' }} /> using React + Vite
        </span>
      </div>
    </div>

    <style>{`
      @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </footer>
);

export default Footer;
