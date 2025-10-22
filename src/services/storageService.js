const STORAGE_KEYS = {
  ENTRIES: 'ghostwriter_entries',
  DRAFT: 'ghostwriter_draft',
  SETTINGS: 'ghostwriter_settings',
};

export const storageService = {
  // Get all entries
  getEntries: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading entries:', error);
      return [];
    }
  },

  // Save entries
  saveEntries: (entries) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
      return true;
    } catch (error) {
      console.error('Error saving entries:', error);
      return false;
    }
  },

  // Add a new entry
  addEntry: (entryText) => {
    const entries = storageService.getEntries();
    const newEntry = {
      id: Date.now(),
      text: entryText,
      date: new Date().toISOString(),
      conversation: [],
    };
    
    const updated = [newEntry, ...entries];
    storageService.saveEntries(updated);
    return newEntry;
  },

  // Update entry conversation
  updateEntryConversation: (entryId, conversation) => {
    const entries = storageService.getEntries();
    const updated = entries.map(entry => 
      entry.id === entryId 
        ? { ...entry, conversation }
        : entry
    );
    storageService.saveEntries(updated);
  },

  // Get draft
  getDraft: () => {
    return localStorage.getItem(STORAGE_KEYS.DRAFT) || '';
  },

  // Save draft
  saveDraft: (text) => {
    if (text.trim()) {
      localStorage.setItem(STORAGE_KEYS.DRAFT, text);
    } else {
      localStorage.removeItem(STORAGE_KEYS.DRAFT);
    }
  },

  // Clear draft
  clearDraft: () => {
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  },

  // Delete entry
  deleteEntry: (entryId) => {
    const entries = storageService.getEntries();
    const updated = entries.filter(entry => entry.id !== entryId);
    storageService.saveEntries(updated);
  },

  // Export all data
  exportData: () => {
    const entries = storageService.getEntries();
    const dataStr = JSON.stringify(entries, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ghostwriter-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  },

  // Clear all data (with confirmation)
  clearAllData: () => {
    if (window.confirm('Are you sure you want to delete all your entries? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEYS.ENTRIES);
      localStorage.removeItem(STORAGE_KEYS.DRAFT);
      return true;
    }
    return false;
  },
};