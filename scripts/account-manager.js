/**
 * Account Manager for Offline Login System
 * Manages user accounts, progress, and preferences
 */

class AccountManager {
  constructor() {
    this.crypto = new CryptoService();
    this.currentAccount = null;
    this.storageKey = 'jeo_account_encrypted';
    this.sessionKey = 'jeo_session_token';
    this.autoSaveInterval = 30000; // 30 seconds
    this.autoSaveTimer = null;
  }

  /**
   * Create a new account
   */
  async createAccount(username, passphrase, avatar = null) {
    // Validate inputs
    if (!username || username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }

    const passphraseStrength = this.crypto.validatePassphraseStrength(passphrase);
    if (!passphraseStrength.valid) {
      throw new Error('Weak passphrase: ' + passphraseStrength.feedback.join(', '));
    }

    // Create account object
    const account = {
      version: '1.0',
      user: {
        id: this.generateUserId(),
        username: username,
        avatar: avatar || this.getDefaultAvatar(),
        created: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          theme: localStorage.getItem('jeo-theme') || 'dark',
          accent: localStorage.getItem('jeo-accent') || '#00ff00',
          layout: localStorage.getItem('jeo-layout') || 'grid',
          hideMaintenance: localStorage.getItem('jeo-hide-maintenance') === 'true'
        }
      },
      gameProgress: {},
      favorites: JSON.parse(localStorage.getItem('jeo-favorites') || '[]'),
      statistics: {
        totalPlaytime: 0,
        gamesPlayed: 0,
        achievements: []
      },
      settings: this.getCurrentSettings()
    };

    // Set as current account
    this.currentAccount = account;

    // Start auto-save
    this.startAutoSave();

    return account;
  }

  /**
   * Login with encrypted blob
   */
  async login(encryptedData, passphrase, rememberMe = false) {
    try {
      // Decrypt account data
      const account = await this.crypto.decrypt(encryptedData, passphrase);

      // Validate account structure
      if (!account.version || !account.user) {
        throw new Error('Invalid account data');
      }

      // Update last login
      account.user.lastLogin = new Date().toISOString();

      // Set as current account
      this.currentAccount = account;

      // Apply user preferences
      this.applyPreferences(account.user.preferences);

      // Restore game progress
      this.restoreGameProgress(account.gameProgress);

      // Store encrypted if remember me
      if (rememberMe) {
        const reEncrypted = await this.crypto.encrypt(account, passphrase);
        localStorage.setItem(this.storageKey, reEncrypted);

        // Store session token
        const sessionToken = this.crypto.generateToken();
        sessionStorage.setItem(this.sessionKey, sessionToken);
      }

      // Start auto-save
      this.startAutoSave();

      return account;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid passphrase or corrupted account data');
    }
  }

  /**
   * Logout current account
   */
  logout() {
    // Stop auto-save
    this.stopAutoSave();

    // Clear current account
    this.currentAccount = null;

    // Clear session
    sessionStorage.removeItem(this.sessionKey);

    // Optionally clear stored account
    if (confirm('Remove saved account from this device?')) {
      localStorage.removeItem(this.storageKey);
    }
  }

  /**
   * Export account as encrypted blob
   */
  async exportAccount(passphrase, format = 'text') {
    if (!this.currentAccount) {
      throw new Error('No account logged in');
    }

    // Update with latest progress
    this.syncCurrentProgress();

    // Encrypt account data
    const encrypted = await this.crypto.encrypt(this.currentAccount, passphrase);

    switch (format) {
      case 'text':
        return encrypted;

      case 'file':
        return this.exportAsFile(encrypted);

      case 'qr':
        return this.exportAsQR(encrypted);

      default:
        return encrypted;
    }
  }

  /**
   * Import account from various formats
   */
  async importAccount(data, passphrase) {
    let encryptedData;

    // Determine format
    if (typeof data === 'string') {
      // Text or base64
      encryptedData = data.trim();
    } else if (data instanceof File) {
      // File upload
      encryptedData = await this.readFile(data);
    } else if (data instanceof ArrayBuffer) {
      // Binary data
      encryptedData = this.crypto.arrayBufferToBase64(data);
    } else {
      throw new Error('Unsupported import format');
    }

    // Try to login
    return this.login(encryptedData, passphrase);
  }

  /**
   * Export as downloadable file
   */
  exportAsFile(encrypted) {
    const blob = new Blob([encrypted], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jeo_account_${this.currentAccount.user.username}_${Date.now()}.jeosave`;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  }

  /**
   * Export as QR code
   */
  async exportAsQR(encrypted) {
    // Check if QR library is available
    if (typeof QRCode === 'undefined') {
      // Load QR library dynamically
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js');
    }

    // Create QR code
    const container = document.createElement('div');
    container.id = 'qr-export';
    container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
    `;

    // Add title and instructions
    container.innerHTML = `
      <h3 style="margin: 0 0 15px 0; color: black;">Account QR Code</h3>
      <div id="qr-code"></div>
      <p style="margin: 15px 0 0 0; color: #666; font-size: 14px;">
        Scan this code on another device to import your account
      </p>
      <button id="qr-close" style="
        margin-top: 15px;
        padding: 10px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      ">Close</button>
    `;

    document.body.appendChild(container);

    // Generate QR code
    new QRCode(document.getElementById('qr-code'), {
      text: encrypted,
      width: 256,
      height: 256,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.L
    });

    // Close button
    document.getElementById('qr-close').onclick = () => {
      document.body.removeChild(container);
    };

    return true;
  }

  /**
   * Save game progress
   */
  saveGameProgress(gameSlug, progressData) {
    if (!this.currentAccount) {
      // Not logged in, save to localStorage
      localStorage.setItem(`jeo_${gameSlug}_save`, JSON.stringify(progressData));
      return;
    }

    // Update account progress
    this.currentAccount.gameProgress[gameSlug] = {
      lastPlayed: new Date().toISOString(),
      saveData: progressData,
      playtime: (this.currentAccount.gameProgress[gameSlug]?.playtime || 0) + 1
    };

    // Trigger auto-save
    this.scheduleAutoSave();
  }

  /**
   * Load game progress
   */
  loadGameProgress(gameSlug) {
    if (!this.currentAccount) {
      // Not logged in, load from localStorage
      const saved = localStorage.getItem(`jeo_${gameSlug}_save`);
      return saved ? JSON.parse(saved) : null;
    }

    // Load from account
    return this.currentAccount.gameProgress[gameSlug]?.saveData || null;
  }

  /**
   * Reset game progress
   */
  resetGameProgress(gameSlug) {
    if (!this.currentAccount) {
      // Clear localStorage
      const keys = Object.keys(localStorage).filter(key => key.startsWith(`jeo_${gameSlug}_`));
      keys.forEach(key => localStorage.removeItem(key));
      return true;
    }

    // Remove from account
    delete this.currentAccount.gameProgress[gameSlug];
    this.scheduleAutoSave();
    return true;
  }

  /**
   * Apply user preferences
   */
  applyPreferences(preferences) {
    if (preferences.theme) {
      document.body.className = `theme-${preferences.theme}`;
      localStorage.setItem('jeo-theme', preferences.theme);
    }

    if (preferences.accent) {
      document.documentElement.style.setProperty('--accent-color', preferences.accent);
      localStorage.setItem('jeo-accent', preferences.accent);
    }

    if (preferences.layout) {
      document.querySelector('.games-grid')?.classList.toggle('list-view', preferences.layout === 'list');
      localStorage.setItem('jeo-layout', preferences.layout);
    }

    if (typeof preferences.hideMaintenance !== 'undefined') {
      localStorage.setItem('jeo-hide-maintenance', preferences.hideMaintenance);
    }
  }

  /**
   * Restore game progress for all games
   */
  restoreGameProgress(gameProgress) {
    // Clear existing localStorage game saves
    const keys = Object.keys(localStorage).filter(key => key.match(/^jeo_[^_]+_save$/));
    keys.forEach(key => localStorage.removeItem(key));

    // Restore from account
    for (const [gameSlug, progress] of Object.entries(gameProgress)) {
      if (progress.saveData) {
        localStorage.setItem(`jeo_${gameSlug}_save`, JSON.stringify(progress.saveData));
      }
    }
  }

  /**
   * Sync current progress
   */
  syncCurrentProgress() {
    if (!this.currentAccount) return;

    // Find all game saves in localStorage
    const keys = Object.keys(localStorage).filter(key => key.match(/^jeo_([^_]+)_save$/));

    for (const key of keys) {
      const match = key.match(/^jeo_([^_]+)_save$/);
      if (match) {
        const gameSlug = match[1];
        const saveData = localStorage.getItem(key);

        if (saveData) {
          this.currentAccount.gameProgress[gameSlug] = {
            ...this.currentAccount.gameProgress[gameSlug],
            lastPlayed: new Date().toISOString(),
            saveData: JSON.parse(saveData)
          };
        }
      }
    }

    // Update favorites
    this.currentAccount.favorites = JSON.parse(localStorage.getItem('jeo-favorites') || '[]');

    // Update preferences
    this.currentAccount.user.preferences = {
      theme: localStorage.getItem('jeo-theme') || 'dark',
      accent: localStorage.getItem('jeo-accent') || '#00ff00',
      layout: localStorage.getItem('jeo-layout') || 'grid',
      hideMaintenance: localStorage.getItem('jeo-hide-maintenance') === 'true'
    };
  }

  /**
   * Auto-save functionality
   */
  startAutoSave() {
    this.stopAutoSave();
    this.autoSaveTimer = setInterval(() => {
      this.autoSave();
    }, this.autoSaveInterval);
  }

  stopAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  scheduleAutoSave() {
    // Debounce auto-save
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.autoSave();
    }, 5000); // 5 seconds
  }

  async autoSave() {
    if (!this.currentAccount) return;

    try {
      // Sync current progress
      this.syncCurrentProgress();

      // If we have a stored passphrase hash, re-encrypt
      const storedAccount = localStorage.getItem(this.storageKey);
      if (storedAccount) {
        // Use a derived key from session token
        const sessionToken = sessionStorage.getItem(this.sessionKey);
        if (sessionToken) {
          const encrypted = await this.crypto.encrypt(this.currentAccount, sessionToken);
          localStorage.setItem(this.storageKey, encrypted);
          console.log('✅ Account auto-saved');
        }
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }

  /**
   * Helper functions
   */

  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getDefaultAvatar() {
    const avatars = [
      '👤', '🎮', '🕹️', '👾', '🤖', '🦸', '🦹', '🧙', '🎯', '🎲'
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  getCurrentSettings() {
    return {
      autoSave: true,
      notifications: false,
      analytics: false,
      developerMode: false
    };
  }

  async readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  async loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Get account statistics
   */
  getStatistics() {
    if (!this.currentAccount) return null;

    const stats = {
      username: this.currentAccount.user.username,
      memberSince: this.currentAccount.user.created,
      gamesPlayed: Object.keys(this.currentAccount.gameProgress).length,
      totalPlaytime: Object.values(this.currentAccount.gameProgress)
        .reduce((total, game) => total + (game.playtime || 0), 0),
      favoriteGames: this.currentAccount.favorites.length,
      lastActive: this.currentAccount.user.lastLogin
    };

    return stats;
  }

  /**
   * Change passphrase
   */
  async changePassphrase(oldPassphrase, newPassphrase) {
    if (!this.currentAccount) {
      throw new Error('No account logged in');
    }

    // Validate new passphrase
    const strength = this.crypto.validatePassphraseStrength(newPassphrase);
    if (!strength.valid) {
      throw new Error('Weak passphrase: ' + strength.feedback.join(', '));
    }

    // Re-encrypt with new passphrase
    const encrypted = await this.crypto.encrypt(this.currentAccount, newPassphrase);

    // Update stored account if remember me was enabled
    if (localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, encrypted);
    }

    return true;
  }

  /**
   * Delete account
   */
  deleteAccount() {
    if (!this.currentAccount) return;

    // Confirm deletion
    if (!confirm(`Are you sure you want to delete your account "${this.currentAccount.user.username}"? This action cannot be undone.`)) {
      return false;
    }

    // Clear all data
    this.stopAutoSave();
    this.currentAccount = null;
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.sessionKey);

    // Clear all game saves
    const keys = Object.keys(localStorage).filter(key => key.startsWith('jeo_'));
    keys.forEach(key => localStorage.removeItem(key));

    return true;
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return this.currentAccount !== null;
  }

  /**
   * Get current user info
   */
  getCurrentUser() {
    return this.currentAccount?.user || null;
  }
}

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccountManager;
} else {
  window.AccountManager = AccountManager;
}