import React from 'react';
import { BookOpen, PenLine } from 'lucide-react';

export default function TimelineView({ entries, onSelectEntry, onStartWriting }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div style={styles.container} className="fade-in">
      <div style={styles.header}>
        <h2 style={styles.heading}>Your Journey</h2>
        <p style={styles.subheading}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'} written
        </p>
      </div>

      {entries.length === 0 ? (
        <div style={styles.emptyState}>
          <BookOpen size={48} color="rgba(255, 255, 255, 0.2)" />
          <p style={styles.emptyText}>No entries yet</p>
          <p style={styles.emptySubtext}>Start writing to begin your journey</p>
          <button onClick={onStartWriting} style={styles.startButton}>
            <PenLine size={16} />
            Start Writing
          </button>
        </div>
      ) : (
        <div style={styles.entriesList}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => onSelectEntry(entry)}
              style={styles.entryCard}
            >
              <div style={styles.entryDate}>
                <span>{formatDate(entry.date)}</span>
                <span style={styles.entryTime}>{formatTime(entry.date)}</span>
              </div>
              <p style={styles.entryPreview}>{entry.text}</p>
            </div>
          ))}
        </div>
      )}
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
    marginBottom: '3rem',
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
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  emptyText: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: '1rem',
  },
  emptySubtext: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  startButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: '#7c3aed',
    color: 'white',
    borderRadius: '8px',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  entriesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  entryCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  entryDate: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: '1rem',
  },
  entryTime: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  entryPreview: {
    lineHeight: '1.7',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    margin: 0,
  },
};