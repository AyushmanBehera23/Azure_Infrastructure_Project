import React, { useState, useRef, useEffect } from 'react';
import { FaMicrosoft, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const primary = [
  { id: 'overview',     label: 'Overview' },
  { id: 'architecture', label: 'Graph' },
  { id: 'compute',      label: 'Compute' },
  { id: 'build-guide',  label: 'Guide' },
];

const more = [
  { id: 'timeline',   label: 'Deploy Timeline' },
  { id: 'inventory',  label: 'Resources' },
  { id: 'identity',   label: 'Identity & IAM' },
  { id: 'nsg',        label: 'NSG Rules' },
  { id: 'network',    label: 'Network' },
  { id: 'subnet-map', label: 'Subnet Map' },
  { id: 'storage',    label: 'Storage' },
  { id: 'cost',       label: 'Cost Estimator' },
  { id: 'threats',    label: 'Threat Model' },
];

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLink = (id, label, extra = {}) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => { setOpen(false); setDropdown(false); }}
      style={{ color: 'var(--n-3)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500, padding: '0.35rem 0.5rem', borderRadius: '6px', transition: 'color 0.2s', whiteSpace: 'nowrap', ...extra }}
      onMouseEnter={e => e.target.style.color = 'var(--n-1)'}
      onMouseLeave={e => e.target.style.color = 'var(--n-3)'}
    >
      {label}
    </a>
  );

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: '60px',
      background: 'rgba(14,12,21,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', height: '100%', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

        {/* Logo */}
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
          <FaMicrosoft style={{ color: 'var(--color-1)', fontSize: '1.3rem' }} />
          <span style={{ fontFamily: 'Sora', fontWeight: 700, fontSize: '1rem', color: 'var(--n-1)', whiteSpace: 'nowrap' }}>
            Brainwave<span style={{ fontWeight: 300, color: 'var(--n-3)' }}>Azure</span>
          </span>
        </a>

        {/* Primary links — desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }} className="nav-primary">
          {primary.map(l => navLink(l.id, l.label))}

          {/* More dropdown */}
          <div ref={dropRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdown(d => !d)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: dropdown ? 'var(--color-1)' : 'var(--n-3)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', padding: '0.35rem 0.5rem', borderRadius: '6px', fontFamily: 'inherit' }}
            >
              More <FaChevronDown style={{ fontSize: '0.65rem', transition: 'transform 0.2s', transform: dropdown ? 'rotate(180deg)' : 'none' }} />
            </button>

            {dropdown && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                background: 'rgba(21,19,29,0.97)', border: '1px solid var(--n-6)',
                borderRadius: '12px', padding: '0.5rem',
                minWidth: '200px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(16px)',
              }}>
                {more.map(l => (
                  <a key={l.id} href={`#${l.id}`} onClick={() => { setDropdown(false); setOpen(false); }}
                    style={{ display: 'block', padding: '0.55rem 0.85rem', color: 'var(--n-3)', fontSize: '0.83rem', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.15s, color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--n-6)'; e.currentTarget.style.color = 'var(--n-1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--n-3)'; }}
                  >{l.label}</a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Badge */}
        <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.7rem', color: 'var(--n-4)', border: '1px solid var(--n-6)', padding: '0.25rem 0.65rem', borderRadius: '99px', whiteSpace: 'nowrap', flexShrink: 0 }} className="nav-badge">
          Central India
        </span>

        {/* Hamburger */}
        <button
          className="nav-toggle"
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: '1px solid var(--n-6)', color: 'var(--n-1)', padding: '0.4rem 0.55rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', display: 'none', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0,
          background: 'rgba(14,12,21,0.98)', backdropFilter: 'blur(20px)',
          padding: '1.5rem', overflowY: 'auto', zIndex: 999,
          display: 'flex', flexDirection: 'column', gap: '0.35rem',
        }}>
          {[...primary, ...more].map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '0.85rem 1rem', color: 'var(--n-2)', fontSize: '1rem', textDecoration: 'none', borderRadius: '10px', borderBottom: '1px solid var(--n-6)' }}
            >{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-primary { display: none !important; }
          .nav-badge { display: none !important; }
          .nav-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default TopNav;
