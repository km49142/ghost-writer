import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WriteView from './components/WriteView';
import ReflectView from './components/ReflectView';
import TimelineView from './components/TimelineView';
import CrisisModal from './components/CrisisModal';
import { useEntries } from './hooks/useEntries';
import './App.css';

function App() {
  const [view, setView] = useState('write');
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const { 
    entries, 
    currentEntry, 
    setCurrentEntry,
    conversation,
    isReflecting,
    saveEntry,
    continueConversation,
    loadEntry
  } = useEntries();

  // Check for crisis keywords in entries
  useEffect(() => {
    if (conversation.length > 0) {
      const lastResponse = conversation[conversation.length - 1];
      if (lastResponse.role === 'assistant' && lastResponse.crisis) {
        setShowCrisisModal(true);
      }
    }
  }, [conversation]);

  return (
    <div className="app">
      <Header view={view} setView={setView} entryCount={entries.length} />
      
      <main className="main-content">
        {view === 'write' && (
          <WriteView
            currentEntry={currentEntry}
            setCurrentEntry={setCurrentEntry}
            onSave={() => {
              saveEntry();
              setView('reflect');
            }}
            entryCount={entries.length}
          />
        )}

        {view === 'reflect' && (
          <ReflectView
            conversation={conversation}
            isReflecting={isReflecting}
            onContinue={continueConversation}
            onBack={() => setView('write')}
          />
        )}

        {view === 'timeline' && (
          <TimelineView
            entries={entries}
            onSelectEntry={(entry) => {
              loadEntry(entry);
              setView('reflect');
            }}
            onStartWriting={() => setView('write')}
          />
        )}
      </main>

      {showCrisisModal && (
        <CrisisModal onClose={() => setShowCrisisModal(false)} />
      )}
    </div>
  );
}

export default App;