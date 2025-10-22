import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ReflectView({ conversation, isReflecting, onContinue, onBack }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onContinue(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSend();
    }
  };

  return (
    <div style={styles.container} className="fade-in">
      <button onClick={onBack} style={styles.backButton}>
        <ArrowLeft size={16} />
        Back to writing
      </button>

      <div style={styles.conversationContainer}>
        {conversation.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(msg.role === 'user' ? styles.userMessage : styles.assistantMessage)
            }}
          >
            <p style={styles.messageText}>{msg.content}</p>
          </div>
        ))}

        {isReflecting && (
          <div style={styles.assistantMessage}>
            <div style={styles.thinkingIndicator}>
              <div style={styles.thinkingDot} />
              <span style={styles.thinkingText}>Reflecting...</span>
            </div>
          </div>
        )}
      </div>

      {!isReflecting && conversation.length > 0 && (
        <div style={styles.inputCard}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Continue the conversation..."
            style={styles.textarea}
          />
          <div style={styles.inputFooter}>
            <p style={styles.hint}>Press {navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+Enter to send</p>
            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              style={{
                ...styles.sendButton,
                ...(message.trim() ? {} : styles.sendButtonDisabled)
              }}
            >
              Send
            </button>
          </div>
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
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    color: '#c084fc',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
  },
  conversationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  message: {
    borderRadius: '12px',
    padding: '1.5rem',
  },
  userMessage: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  assistantMessage: {
    background: 'rgba(124, 58, 237, 0.2)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
  },
  messageText: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.7',
    margin: 0,
  },
  thinkingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#c084fc',
  },
  thinkingDot: {
    width: '8px',
    height: '8px',
    background: '#c084fc',
    borderRadius: '50%',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  thinkingText: {
    fontSize: '0.95rem',
  },
  inputCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  textarea: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    minHeight: '100px',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    resize: 'vertical',
  },
  inputFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hint: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.4)',
    margin: 0,
  },
  sendButton: {
    padding: '0.5rem 1.5rem',
    background: '#7c3aed',
    color: 'white',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  sendButtonDisabled: {
    background: 'rgba(255, 255, 255, 0.1)',
  },
};