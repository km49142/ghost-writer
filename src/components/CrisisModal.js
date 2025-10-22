import React from 'react';
import { X, Phone, MessageSquare, Globe } from 'lucide-react';

export default function CrisisModal({ onClose }) {
  const resources = [
    {
      name: 'Crisis Text Line',
      icon: <MessageSquare size={20} />,
      contact: 'Text HOME to 741741',
      description: '24/7 support via text',
    },
    {
      name: 'National Suicide Prevention Lifeline',
      icon: <Phone size={20} />,
      contact: 'Call or text 988',
      description: '24/7 crisis counseling',
    },
    {
      name: 'International Helplines',
      icon: <Globe size={20} />,
      contact: 'findahelpline.com',
      description: 'Resources worldwide',
    },
  ];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeButton}>
          <X size={20} />
        </button>

        <div style={styles.content}>
          <h2 style={styles.heading}>You're Not Alone</h2>
          <p style={styles.message}>
            I'm noticing some really heavy thoughts in your writing. While I'm here to listen, 
            you deserve support from someone trained to help in crisis moments.
          </p>

          <div style={styles.resourcesList}>
            {resources.map((resource, i) => (
              <div key={i} style={styles.resourceCard}>
                <div style={styles.resourceIcon}>{resource.icon}</div>
                <div style={styles.resourceInfo}>
                  <h3 style={styles.resourceName}>{resource.name}</h3>
                  <p style={styles.resourceContact}>{resource.contact}</p>
                  <p style={styles.resourceDescription}>{resource.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={styles.footer}>
            These services are free, confidential, and available 24/7. You're taking a brave step by seeking help.
          </p>
        </div>
      </div>
      </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  content: {
    padding: '2rem',
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: '400',
    marginBottom: '1rem',
    color: 'white',
  },
  message: {
    lineHeight: '1.7',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '2rem',
  },
  resourcesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  resourceCard: {
    display: 'flex',
    gap: '1rem',
    padding: '1.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  resourceIcon: {
    color: '#c084fc',
    flexShrink: 0,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: '1.1rem',
    fontWeight: '500',
    marginBottom: '0.25rem',
    color: 'white',
  },
  resourceContact: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#c084fc',
    marginBottom: '0.5rem',
  },
  resourceDescription: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  },
  footer: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
    margin: 0,
  },
};