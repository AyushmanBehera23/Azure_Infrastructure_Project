import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaNetworkWired, FaShieldAlt, FaDatabase, FaPlug, FaKey } from 'react-icons/fa';

const resources = [
  {
    category: 'Compute', icon: <FaServer />, color: 'var(--color-2)',
    items: [
      { name: 'vm-1', type: 'Virtual Machine', detail: 'Standard_B2s · Windows Server 2022 · Billing Subnet' },
      { name: 'vm-2', type: 'Virtual Machine', detail: 'Standard_B2s · Windows Server 2022 · Escalations Subnet' },
      { name: 'vm-3', type: 'Virtual Machine', detail: 'Standard_B2s · Windows Server 2022 · Ticketing Subnet · nic-3 + nic-4' },
    ]
  },
  {
    category: 'Networking', icon: <FaNetworkWired />, color: 'var(--color-4)',
    items: [
      { name: 'support-vnet', type: 'Virtual Network', detail: '10.10.0.0/16 · Central India' },
      { name: 'billing-subnet', type: 'Subnet', detail: '10.10.1.0/24 · Associated with nsg-1' },
      { name: 'escalations-subnet', type: 'Subnet', detail: '10.10.2.0/24 · Associated with nsg-2' },
      { name: 'ticketing-subnet', type: 'Subnet', detail: '10.10.3.0/24 · Associated with nsg-3' },
      { name: 'support-public-ip', type: 'Public IP', detail: 'Static IPv4 · Standard SKU · Attached to nic-1' },
    ]
  },
  {
    category: 'Security (NSGs)', icon: <FaShieldAlt />, color: 'var(--color-3)',
    items: [
      { name: 'nsg-1', type: 'Network Security Group', detail: 'Allow RDP TCP 3389 from Admin IP · Billing Subnet' },
      { name: 'nsg-2', type: 'Network Security Group', detail: 'Allow RDP TCP 3389 from Admin IP · Escalations Subnet' },
      { name: 'nsg-3', type: 'Network Security Group', detail: 'Allow RDP TCP 3389 from Admin IP · Ticketing Subnet' },
    ]
  },
  {
    category: 'Network Interfaces', icon: <FaPlug />, color: 'var(--color-5)',
    items: [
      { name: 'nic-1', type: 'NIC', detail: 'Public IP attached · Billing Subnet · vm-1' },
      { name: 'nic-2', type: 'NIC', detail: 'Private only · Escalations Subnet · vm-2' },
      { name: 'nic-3', type: 'NIC', detail: 'Private only · Ticketing Subnet · vm-3' },
      { name: 'nic-4', type: 'NIC', detail: 'Private only · Ticketing Subnet · vm-3 (secondary NIC)' },
    ]
  },
  {
    category: 'Storage', icon: <FaDatabase />, color: 'var(--color-1)',
    items: [
      { name: 'stsupporteastasia01', type: 'Storage Account', detail: 'LRS · StorageV2 · vm-1 data' },
      { name: 'stsupporteastasia02', type: 'Storage Account', detail: 'LRS · StorageV2 · vm-2 data' },
      { name: 'stsupporteastasia03', type: 'Storage Account', detail: 'LRS · StorageV2 · chat-logs Blob + SAS token' },
    ]
  },
  {
    category: 'Identity & RBAC', icon: <FaKey />, color: 'var(--color-6)',
    items: [
      { name: 'Billing-Sub', type: 'Entra Security Group', detail: 'Reader role → user1, user2' },
      { name: 'Escalations-Sub', type: 'Entra Security Group', detail: 'VM Contributor role → user3, user4' },
      { name: 'Ticketing-Sub', type: 'Entra Security Group', detail: 'Reader role → user5, user6' },
    ]
  },
];

const ResourceInventory = () => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'Sora', color: 'var(--n-1)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600 }}>Resource Inventory</h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }} className="inventory-grid">
      {resources.map((cat, ci) => (
        <motion.div key={ci} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }} className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--n-6)' }}>
            <span style={{ fontSize: '1.2rem', color: cat.color }}>{cat.icon}</span>
            <h4 style={{ margin: 0, color: cat.color, fontFamily: 'var(--font-code)', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{cat.category}</h4>
            <span style={{ marginLeft: 'auto', background: 'var(--n-6)', color: 'var(--n-3)', borderRadius: '99px', padding: '0.1rem 0.6rem', fontSize: '0.72rem', fontFamily: 'var(--font-code)' }}>{cat.items.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cat.items.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <span style={{ color: 'var(--n-1)', fontFamily: 'var(--font-code)', fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</span>
                <span style={{ color: 'var(--n-4)', fontSize: '0.75rem', fontFamily: 'var(--font-code)' }}>{item.type}</span>
                <span style={{ color: 'var(--n-3)', fontSize: '0.8rem' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
    <style>{`@media(max-width:700px){.inventory-grid{grid-template-columns:1fr !important}}`}</style>
  </motion.div>
);

export default ResourceInventory;
