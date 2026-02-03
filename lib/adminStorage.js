// Admin storage utilities for managing data
// In production, this would connect to a backend API

export const AdminStorage = {
  // Artworks (legacy - admin now uses API)
  getArtworks: () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('admin_artworks');
    return stored ? JSON.parse(stored) : [];
  },

  saveArtworks: (artworks) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('admin_artworks', JSON.stringify(artworks));
    // Also update the data file reference (for development)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('artworksUpdated'));
    }
  },

  addArtwork: (artwork) => {
    const artworks = AdminStorage.getArtworks();
    const newId = Math.max(...artworks.map(a => a.id), 0) + 1;
    const newArtwork = { ...artwork, id: newId };
    artworks.push(newArtwork);
    AdminStorage.saveArtworks(artworks);
    return newArtwork;
  },

  updateArtwork: (id, updates) => {
    const artworks = AdminStorage.getArtworks();
    const index = artworks.findIndex(a => a.id === id);
    if (index !== -1) {
      artworks[index] = { ...artworks[index], ...updates };
      AdminStorage.saveArtworks(artworks);
      return artworks[index];
    }
    return null;
  },

  deleteArtwork: (id) => {
    const artworks = AdminStorage.getArtworks();
    const filtered = artworks.filter(a => a.id !== id);
    AdminStorage.saveArtworks(filtered);
    return true;
  },

  // Contact Submissions
  getContacts: () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('admin_contacts');
    return stored ? JSON.parse(stored) : [];
  },

  saveContacts: (contacts) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('admin_contacts', JSON.stringify(contacts));
  },

  addContact: (contact) => {
    const contacts = AdminStorage.getContacts();
    const newContact = {
      ...contact,
      id: Date.now(),
      date: new Date().toISOString(),
      read: false,
    };
    contacts.unshift(newContact);
    AdminStorage.saveContacts(contacts);
    return newContact;
  },

  markContactRead: (id, read = true) => {
    const contacts = AdminStorage.getContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      contacts[index].read = read;
      AdminStorage.saveContacts(contacts);
      return contacts[index];
    }
    return null;
  },

  deleteContact: (id) => {
    const contacts = AdminStorage.getContacts();
    const filtered = contacts.filter(c => c.id !== id);
    AdminStorage.saveContacts(filtered);
    return true;
  },

  // Categories
  getCategories: () => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('admin_categories');
    return stored ? JSON.parse(stored) : [];
  },

  saveCategories: (categories) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('admin_categories', JSON.stringify(categories));
  },

  addCategory: (category) => {
    const categories = AdminStorage.getCategories();
    if (!categories.includes(category)) {
      categories.push(category);
      AdminStorage.saveCategories(categories);
    }
    return categories;
  },

  deleteCategory: (category) => {
    const categories = AdminStorage.getCategories();
    const filtered = categories.filter(c => c !== category);
    AdminStorage.saveCategories(filtered);
    return filtered;
  },

  // Authentication (API-based) - stored in localStorage
  setAuthSession: (apiResponse) => {
    if (typeof window === 'undefined' || !apiResponse?.success) return false;
    const { user, tokens } = apiResponse;
    if (!user || !tokens?.access?.token) return false;
    localStorage.setItem('admin_user', JSON.stringify(user));
    localStorage.setItem('admin_access_token', tokens.access.token);
    if (tokens.refresh?.token) {
      localStorage.setItem('admin_refresh_token', tokens.refresh.token);
    }
    return true;
  },

  getAccessToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_access_token');
  },

  getRefreshToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_refresh_token');
  },

  getUser: () => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('admin_user');
    return stored ? JSON.parse(stored) : null;
  },

  logout: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
  },

  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('admin_access_token');
  },
};
