import React from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaFolderOpen, FaKey, FaShieldAlt } from 'react-icons/fa';

const policyJson = `{
  "if": {
    "allOf": [
      { "field": "type",
        "equals": "Microsoft.Network/virtualNetworks/subnets" },
      { "field": "...delegations[*]",
        "exists": "true" }
    ]
  },
  "then": { "effect": "deny" }
}`;

const infoBox = {
  backgroundColor: 'var(--n-8)',
  border: '1px solid var(--n-6)',
  borderRadius: '1rem',
  padding: '1.25rem',
};

const StoragePolicy = () => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{ height: '100%' }}
  >
    <div className="card" style={{ height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>Storage &amp; Policies</h3>

      {/* Storage Accounts */}
      <div>
        <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-2)', marginBottom: '1rem' }}>
          <FaDatabase /> Storage Accounts
        </h5>
        <div style={infoBox}>
          {['stsupporteastasia01', 'stsupporteastasia02', 'stsupporteastasia03'].map((name, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.6rem 0',
              borderBottom: i < 2 ? '1px solid var(--n-6)' : 'none',
              color: 'var(--n-3)',
            }}>
              <FaFolderOpen style={{ color: i === 2 ? 'var(--color-4)' : 'var(--n-4)', flexShrink: 0 }} />
              <span className="mono" style={{ color: 'var(--n-1)' }}>{name}</span>
              {i === 2 && <span style={{ opacity: 0.5, fontSize: '0.75rem' }}>(chat-logs)</span>}
            </div>
          ))}
        </div>
      </div>

      {/* SAS Token */}
      <div>
        <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-3)', marginBottom: '0.75rem' }}>
          <FaKey /> SAS Token (Chat Logs)
        </h5>
        <p style={{ color: 'var(--n-3)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Grants temporary 1-hour Read-Only access to the{' '}
          <span className="mono" style={{ color: 'var(--n-1)' }}>chat-logs</span> container.
        </p>
        <button className="btn" style={{ width: '100%' }}>Copy SAS URL</button>
      </div>

      {/* Policy */}
      <div style={{ marginTop: 'auto' }}>
        <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-1)', marginBottom: '0.75rem' }}>
          <FaShieldAlt /> Custom Azure Policy
        </h5>
        <p style={{ color: 'var(--n-3)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Prevents subnet delegation across the resource group.
        </p>
        <div style={{ ...infoBox, overflow: 'hidden' }}>
          <pre className="mono" style={{ fontSize: '0.78rem', color: 'var(--color-4)', margin: 0, whiteSpace: 'pre-wrap' }}>
            {policyJson}
          </pre>
        </div>
      </div>
    </div>
  </motion.div>
);

export default StoragePolicy;
