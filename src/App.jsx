import React from 'react';
import TopNav from './components/TopNav';
import Overview from './components/Overview';
import DeploymentTimeline from './components/DeploymentTimeline';
import ResourceInventory from './components/ResourceInventory';
import IdentityTable from './components/IdentityTable';
import NSGRules from './components/NSGRules';
import NetworkTopology from './components/NetworkTopology';
import SubnetMap from './components/SubnetMap';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import Compute from './components/Compute';
import StoragePolicy from './components/StoragePolicy';
import Backup from './components/Backup';
import CostEstimator from './components/CostEstimator';
import ThreatModel from './components/ThreatModel';
import BuildTimeline from './components/BuildTimeline';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import DemoVideo from './components/DemoVideo';
import ScreenshotsPDF from './components/ScreenshotsPDF';
import { motion } from 'framer-motion';

function App() {
  return (
    <div style={{ backgroundColor: 'var(--n-8)', color: 'var(--n-2)', minHeight: '100vh' }} id="top">
      <TopNav />

      {/* Hero */}
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '70px' }}>
        <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mono text-gradient" style={{ fontSize: '0.85rem', letterSpacing: '0.25em', marginBottom: '1.25rem' }}>
              AZURE SUPPORT CLOUD · CENTRAL INDIA
            </div>
            <h1 className="text-h1" style={{ marginBottom: '1.5rem' }}>
              Secure Customer<br />
              <span className="text-gradient">Support Infrastructure</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--n-3)' }}>
              A highly available, strictly governed cloud environment designed to process sensitive support tickets and handle billing operations securely.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#overview" className="btn" style={{ background: 'linear-gradient(135deg,var(--color-1),var(--color-5))', border: 'none', color: '#fff', padding: '0.75rem 2rem' }}>View Infrastructure</a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '6rem' }}>
        <section id="overview"      className="section" style={{ paddingTop: '2rem' }}><Overview /></section>
        <section id="demo"          className="section"><DemoVideo /></section>
        <section id="screenshots"   className="section"><ScreenshotsPDF /></section>
        <section id="timeline"      className="section"><DeploymentTimeline /></section>
        <section id="inventory"     className="section"><ResourceInventory /></section>
        <section id="identity"      className="section"><IdentityTable /></section>
        <section id="nsg"           className="section"><NSGRules /></section>
        <section id="network"       className="section"><NetworkTopology /></section>
        <section id="subnet-map"    className="section"><SubnetMap /></section>
        <section id="architecture"  className="section"><ArchitectureDiagram /></section>
        <section id="compute"       className="section"><Compute /></section>
        <section id="storage"       className="section">
          <div className="grid grid-2">
            <StoragePolicy />
            <div id="backup"><Backup /></div>
          </div>
        </section>
        <section id="cost"          className="section"><CostEstimator /></section>
        <section id="threats"       className="section"><ThreatModel /></section>
        <section id="build-guide"   className="section"><BuildTimeline /></section>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
