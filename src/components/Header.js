import React from 'react';
import { Heart, Calendar, PenLine } from 'lucide-react';

export default function Header({ view, setView, entryCount }) {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Heart size={24} color="#c084fc" />
          <h1 style={styles.title}>GhostWriter</h1>
        </div>
        
        <nav style={styles.nav}>
          <button
            onClick={() => setView('write')}
            style={{
              ...styles.navButton,
              ...(view === 'write' ? styles.navButtonActive : {})
            }}
          >
            <PenLine size={16} />
            Write
          </button>
          
          <button
            onClick={() => setView('timeline')}
            style={{
              ...styles.navButton,
              ...(view === 'timeline' ? styles.navButtonActive : {})
            }}
          >
            <Calendar size={16} />
            Timeline
            {entryCount > 0 && (
              <span style={styles.badge}>{entryCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '300',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    color: 'white',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
  },
  navButtonActive: {
    background: '#7c3aed',
  },
  badge: {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
};