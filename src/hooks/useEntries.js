import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { getClaudeReflection, getContinuedReflection } from '../services/claudeService';

export function useEntries() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentEntryId, setCurrentEntryId] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [isReflecting, setIsReflecting] = useState(false);

  // Load entries on mount
  useEffect(() => {
    const loaded = storageService.getEntries();
    setEntries(loaded);
    
    // Load draft if exists
    const draft = storageService.getDraft();
    if (draft) {
      setCurrentEntry(draft);
    }
  }, []);

  // Autosave draft
  useEffect(() => {
    const timer = setTimeout(() => {
      storageService.saveDraft(currentEntry);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentEntry]);

  // Save entry and generate reflection
  const saveEntry = async () => {
    if (!currentEntry.trim()) return;

    setIsReflecting(true);
    
    // Save to storage
    const newEntry = storageService.addEntry(currentEntry);
    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntryId(newEntry.id);

    // Clear draft
    storageService.clearDraft();
    
    // Get Claude's reflection
    try {
      const response = await getClaudeReflection(currentEntry);
      
      const newConversation = [
        { role: 'user', content: currentEntry },
        { 
          role: 'assistant', 
          content: response.content,
          crisis: response.crisis 
        },
      ];

      setConversation(newConversation);
      
      // Update entry with conversation
      storageService.updateEntryConversation(newEntry.id, newConversation);
    } catch (error) {
      console.error('Error generating reflection:', error);
      setConversation([
        { role: 'user', content: currentEntry },
        { 
          role: 'assistant', 
          content: "I'm here with you, but I'm having trouble connecting right now. Your words are safely saved. Would you like to try again?",
          error: true
        },
      ]);
    } finally {
      setIsReflecting(false);
      setCurrentEntry('');
    }
  };

  // Continue conversation
  const continueConversation = async (message) => {
    if (!message.trim() || !currentEntryId) return;

    const userMessage = { role: 'user', content: message };
    const updatedConversation = [...conversation, userMessage];
    
    setConversation(updatedConversation);
    setIsReflecting(true);

    try {
      const response = await getContinuedReflection(message, updatedConversation);
      
      const assistantMessage = {
        role: 'assistant',
        content: response.content,
        crisis: response.crisis,
      };

      const finalConversation = [...updatedConversation, assistantMessage];
      setConversation(finalConversation);
      
      // Update storage
      storageService.updateEntryConversation(currentEntryId, finalConversation);
      
      // Update entries state
      setEntries(prev => prev.map(entry =>
        entry.id === currentEntryId
          ? { ...entry, conversation: finalConversation }
          : entry
      ));
    } catch (error) {
      console.error('Error continuing conversation:', error);
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again.",
        error: true,
      }]);
    } finally {
      setIsReflecting(false);
    }
  };

  // Load existing entry
  const loadEntry = (entry) => {
    setCurrentEntryId(entry.id);
    setConversation(entry.conversation || []);
  };

  // Delete entry
  const deleteEntry = (entryId) => {
    storageService.deleteEntry(entryId);
    setEntries(prev => prev.filter(e => e.id !== entryId));
  };

  return {
    entries,
    currentEntry,
    setCurrentEntry,
    conversation,
    isReflecting,
    saveEntry,
    continueConversation,
    loadEntry,
    deleteEntry,
  };
}