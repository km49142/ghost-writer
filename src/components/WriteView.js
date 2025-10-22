import React, { useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { getSuggestedPrompts } from '../utils/prompts';

export default function WriteView({ currentEntry, setCurrentEntry, onSave, entryCount }) {
  const prompts = getSuggestedPrompts();
  const showPrompts = currentEntry === '' && entryCount >= 2;

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('ghostwriter_draft');
    if (draft && currentEntry === '') {
      setCurrentEntry(draft);
    }
  }, [setCurrentEntry, currentEntry]);

  return (
    <div style={styles.container} className="fade-in">
      <div style={styles.header}>
        <h2 style={styles.heading}>What's on your heart?</h2>
        <p style={styles.subheading}>Write freely. No judgment, no rules.</p>
      </div>

      {showPrompts && (
        <div style={styles.promptsCard}>
          <div style={styles.promptsHeader}>
            <Sparkles size={20} color="#c084fc" />
            <h3 style={styles.promptsTitle}>Prompts to explore</h3>
          </div>
          <div style={styles.promptsList}>
            {prompts.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => setCurrentEntry(prompt + '\n\n')}
                style={styles.promptButton}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={styles.editorCard}>
        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="Start writing... This space is yours."
          style={styles.textarea}
          autoFocus
        />
      </div>

      <div style={styles.footer}>
        <p style={styles.privacyNote}>
          {currentEntry.trim() ? '✓ Autosaved locally' : '🔒 Your words stay private on your device'}
        </p>
        <button
          onClick={onSave}
          disabled={!currentEntry.trim()}
          style={{
            ...styles.saveButton,
            ...(currentEntry.trim() ? {} : styles.saveButtonDisabled)
          }}
        >
          <Send size={16} />
          Save & Reflect
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '300',
    marginBottom: '0.5rem',
  },
  subheading: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '1rem',
  },
  promptsCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '1.5rem',
  },
  promptsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  promptsTitle: {
    fontSize: '1rem',
    fontWeight: '500',
    margin: 0,
  },
  promptsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  promptButton: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    borderRadius: '8px',
    fontSize: '0.9rem',
    transition: 'background 0.2s',
  },
  editorCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginBottom: '1.5rem',
  },
  textarea: {
    width: '100%',
    minHeight: '400px',
    padding: '1.5rem',
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    resize: 'vertical',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  privacyNote: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: '#7c3aed',
    color: 'white',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  saveButtonDisabled: {
    background: 'rgba(255, 255, 255, 0.1)',
    cursor: 'not-allowed',
  },
};