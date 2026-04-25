/**
 * Reset Progress Module
 * Adds reset progress functionality to game cards with confirmation
 */

class ResetProgressManager {
  constructor(app, accountManager = null) {
    this.app = app;
    this.accountManager = accountManager || window.accountManager;
    this.activeResetButtons = new Map();
  }

  /**
   * Add reset button to play modal
   */
  addResetButtonToModal(game) {
    const modal = document.querySelector('.player-modal');
    if (!modal) return;

    // Check if button already exists
    if (modal.querySelector('.reset-progress-btn')) {
      this.updateResetButton(game);
      return;
    }

    // Create reset button container
    const resetContainer = document.createElement('div');
    resetContainer.className = 'reset-progress-container';
    resetContainer.style.cssText = `
      position: absolute;
      bottom: 60px;
      right: 20px;
      z-index: 1001;
      display: flex;
      gap: 10px;
      align-items: center;
    `;

    // Create reset button
    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-progress-btn';
    resetBtn.innerHTML = '🗑️ Reset Progress';
    resetBtn.style.cssText = `
      padding: 8px 16px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      opacity: 0.7;
      transition: opacity 0.3s;
    `;

    resetBtn.onmouseenter = () => resetBtn.style.opacity = '1';
    resetBtn.onmouseleave = () => resetBtn.style.opacity = '0.7';

    // Add confirmation flow
    resetBtn.onclick = () => this.showResetConfirmation(game, resetContainer);

    resetContainer.appendChild(resetBtn);

    // Add to modal
    const closeBtn = modal.querySelector('.player-close');
    if (closeBtn && closeBtn.parentNode) {
      closeBtn.parentNode.appendChild(resetContainer);
    } else {
      modal.appendChild(resetContainer);
    }

    // Check if game has saved progress
    this.updateResetButton(game);
  }

  /**
   * Update reset button visibility based on saved progress
   */
  updateResetButton(game) {
    const resetBtn = document.querySelector('.reset-progress-btn');
    if (!resetBtn) return;

    const hasProgress = this.checkGameHasProgress(game);
    resetBtn.style.display = hasProgress ? 'block' : 'none';
  }

  /**
   * Check if game has saved progress
   */
  checkGameHasProgress(game) {
    const gameSlug = this.getGameSlug(game);

    // Check account manager first
    if (this.accountManager && this.accountManager.isLoggedIn()) {
      const progress = this.accountManager.loadGameProgress(gameSlug);
      if (progress) return true;
    }

    // Check localStorage
    const keys = Object.keys(localStorage).filter(key =>
      key.startsWith(`jeo_${gameSlug}_`) ||
      key.includes(gameSlug) ||
      key.includes(game.name.toLowerCase().replace(/\s+/g, ''))
    );

    return keys.length > 0;
  }

  /**
   * Show reset confirmation dialog
   */
  showResetConfirmation(game, container) {
    const resetBtn = container.querySelector('.reset-progress-btn');

    // Hide original button
    resetBtn.style.display = 'none';

    // Create confirmation UI
    const confirmContainer = document.createElement('div');
    confirmContainer.className = 'reset-confirm-container';
    confirmContainer.style.cssText = `
      display: flex;
      gap: 10px;
      align-items: center;
      background: rgba(220, 53, 69, 0.95);
      padding: 10px;
      border-radius: 5px;
      animation: slideIn 0.3s ease-out;
    `;

    const warningText = document.createElement('span');
    warningText.textContent = `Reset all progress for ${game.name}?`;
    warningText.style.cssText = `
      color: white;
      font-size: 14px;
      margin-right: 10px;
    `;

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Yes, Reset';
    confirmBtn.style.cssText = `
      padding: 6px 12px;
      background: white;
      color: #dc3545;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-weight: bold;
    `;

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
      padding: 6px 12px;
      background: transparent;
      color: white;
      border: 1px solid white;
      border-radius: 3px;
      cursor: pointer;
    `;

    // Add click handlers
    confirmBtn.onclick = () => {
      this.resetGameProgress(game);
      container.removeChild(confirmContainer);
      resetBtn.style.display = 'block';
      this.showSuccessMessage(container, game);
    };

    cancelBtn.onclick = () => {
      container.removeChild(confirmContainer);
      resetBtn.style.display = 'block';
    };

    // Auto-cancel after 10 seconds
    setTimeout(() => {
      if (container.contains(confirmContainer)) {
        container.removeChild(confirmContainer);
        resetBtn.style.display = 'block';
      }
    }, 10000);

    confirmContainer.appendChild(warningText);
    confirmContainer.appendChild(confirmBtn);
    confirmContainer.appendChild(cancelBtn);
    container.appendChild(confirmContainer);
  }

  /**
   * Reset game progress
   */
  resetGameProgress(game) {
    const gameSlug = this.getGameSlug(game);

    // Use account manager if available
    if (this.accountManager && this.accountManager.isLoggedIn()) {
      this.accountManager.resetGameProgress(gameSlug);
    }

    // Clear all localStorage keys for this game
    const keysToRemove = [];
    for (let key in localStorage) {
      if (key.includes(gameSlug) ||
          key.includes(game.name.toLowerCase().replace(/\s+/g, '')) ||
          key.startsWith(`jeo_${gameSlug}_`)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => {
      console.log(`Removing progress key: ${key}`);
      localStorage.removeItem(key);
    });

    // Clear from recently played
    if (this.app) {
      const recentIndex = this.app.recentlyPlayed.indexOf(game.name);
      if (recentIndex > -1) {
        this.app.recentlyPlayed.splice(recentIndex, 1);
        localStorage.setItem('jeo-recent', JSON.stringify(this.app.recentlyPlayed));
      }
    }

    // Log the reset
    console.log(`✅ Reset progress for game: ${game.name}`);
    this.logReset(game);
  }

  /**
   * Show success message after reset
   */
  showSuccessMessage(container, game) {
    const successMsg = document.createElement('div');
    successMsg.className = 'reset-success';
    successMsg.textContent = `✅ Progress reset for ${game.name}`;
    successMsg.style.cssText = `
      position: absolute;
      bottom: 100px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      animation: fadeInOut 3s ease-out;
      pointer-events: none;
    `;

    container.appendChild(successMsg);

    setTimeout(() => {
      if (container.contains(successMsg)) {
        container.removeChild(successMsg);
      }
    }, 3000);

    // Update reset button visibility
    this.updateResetButton(game);
  }

  /**
   * Get game slug from game object
   */
  getGameSlug(game) {
    if (game.slug) return game.slug;
    if (game.url) {
      const parts = game.url.split('/');
      const slug = parts[parts.length - 2] || parts[parts.length - 1];
      return slug.replace(/[^a-z0-9]/gi, '').toLowerCase();
    }
    return game.name.toLowerCase().replace(/\s+/g, '');
  }

  /**
   * Log reset action for potential undo
   */
  logReset(game) {
    const resetLog = JSON.parse(localStorage.getItem('jeo-reset-log') || '[]');
    resetLog.push({
      game: game.name,
      timestamp: new Date().toISOString(),
      slug: this.getGameSlug(game)
    });

    // Keep only last 10 resets
    if (resetLog.length > 10) {
      resetLog.shift();
    }

    localStorage.setItem('jeo-reset-log', JSON.stringify(resetLog));
  }

  /**
   * Initialize reset progress system
   */
  init() {
    // Add CSS for animations
    if (!document.querySelector('#reset-progress-styles')) {
      const style = document.createElement('style');
      style.id = 'reset-progress-styles';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .reset-progress-container {
          user-select: none;
        }

        .reset-confirm-container button:hover {
          transform: scale(1.05);
          transition: transform 0.2s;
        }

        .reset-progress-btn:disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Hook into game opening
    if (this.app && this.app.openPlayer) {
      const originalOpenPlayer = this.app.openPlayer.bind(this.app);
      this.app.openPlayer = (url, game) => {
        originalOpenPlayer(url, game);
        setTimeout(() => {
          this.addResetButtonToModal(game);
        }, 100);
      };
    }
  }
}

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResetProgressManager;
} else {
  window.ResetProgressManager = ResetProgressManager;
}