/**
 * Offline Token System for Profile and Save Management
 * Implements local-only encrypted backup/restore functionality
 */

class TokenSystem {
    constructor() {
        this.profile = null;
        this.VERSION = 1;
        this.ITERATIONS = 200000; // PBKDF2 iterations
    }

    // Initialize the token system
    async init() {
        console.log('[TokenSystem] Initializing...');

        // Load existing profile from localStorage
        this.loadLocalProfile();

        // Setup UI handlers
        this.setupUI();
    }

    // Crypto utilities
    async deriveKey(password, salt) {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: this.ITERATIONS,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    }

    async encrypt(data, password) {
        const encoder = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await this.deriveKey(password, salt);

        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            encoder.encode(JSON.stringify(data))
        );

        // Combine salt, iv, and encrypted data
        const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
        combined.set(salt);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(encrypted), salt.length + iv.length);

        // Return base64 encoded
        return btoa(String.fromCharCode.apply(null, combined));
    }

    async decrypt(encryptedData, password) {
        try {
            // Decode from base64
            const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

            // Extract salt, iv, and encrypted data
            const salt = combined.slice(0, 16);
            const iv = combined.slice(16, 28);
            const encrypted = combined.slice(28);

            const key = await this.deriveKey(password, salt);

            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                encrypted
            );

            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(decrypted));
        } catch (error) {
            console.error('[TokenSystem] Decryption failed:', error);
            throw new Error('Invalid password or corrupted token');
        }
    }

    // Profile management
    createProfile(displayName, avatarBase64, theme = 'dark') {
        this.profile = {
            displayName,
            avatarBase64,
            theme,
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        this.saveLocalProfile();
        return this.profile;
    }

    updateProfile(updates) {
        if (!this.profile) {
            throw new Error('No profile exists');
        }

        Object.assign(this.profile, updates, {
            lastModified: new Date().toISOString()
        });

        this.saveLocalProfile();
        return this.profile;
    }

    saveLocalProfile() {
        if (this.profile) {
            localStorage.setItem('user_profile', JSON.stringify(this.profile));
        }
    }

    loadLocalProfile() {
        const data = localStorage.getItem('user_profile');
        if (data) {
            try {
                this.profile = JSON.parse(data);
                return this.profile;
            } catch (error) {
                console.error('[TokenSystem] Failed to load profile:', error);
            }
        }
        return null;
    }

    // Token export/import
    async exportToken(password = '') {
        if (!this.profile) {
            throw new Error('No profile to export');
        }

        // Collect all game progress
        const games = {};
        const progressKeys = Object.keys(localStorage).filter(k => k.startsWith('game_progress_'));

        progressKeys.forEach(key => {
            const slug = key.replace('game_progress_', '');
            try {
                games[slug] = JSON.parse(localStorage.getItem(key));
            } catch (error) {
                console.warn(`[TokenSystem] Failed to export progress for ${slug}`);
            }
        });

        // Create token data
        const tokenData = {
            version: this.VERSION,
            profile: this.profile,
            games: games,
            settings: this.getSettings(),
            exportedAt: new Date().toISOString()
        };

        // Encrypt if password provided
        let tokenString;
        if (password) {
            tokenString = await this.encrypt(tokenData, password);
        } else {
            // No encryption, just base64 encode
            tokenString = btoa(JSON.stringify(tokenData));
        }

        // Create token file content
        const tokenFile = {
            type: 'jeoweb-token',
            version: this.VERSION,
            encrypted: !!password,
            data: tokenString,
            metadata: {
                displayName: this.profile.displayName,
                exportedAt: new Date().toISOString(),
                gameCount: Object.keys(games).length
            }
        };

        return tokenFile;
    }

    async importToken(tokenFile, password = '') {
        if (tokenFile.type !== 'jeoweb-token') {
            throw new Error('Invalid token file');
        }

        let tokenData;
        if (tokenFile.encrypted) {
            if (!password) {
                throw new Error('Password required for encrypted token');
            }
            tokenData = await this.decrypt(tokenFile.data, password);
        } else {
            // Decode from base64
            tokenData = JSON.parse(atob(tokenFile.data));
        }

        // Validate version
        if (tokenData.version !== this.VERSION) {
            console.warn(`[TokenSystem] Token version mismatch: ${tokenData.version} vs ${this.VERSION}`);
        }

        // Import profile
        this.profile = tokenData.profile;
        this.saveLocalProfile();

        // Import game progress
        let imported = 0;
        for (const [slug, progress] of Object.entries(tokenData.games)) {
            localStorage.setItem(`game_progress_${slug}`, JSON.stringify(progress));
            imported++;
        }

        // Import settings
        if (tokenData.settings) {
            this.importSettings(tokenData.settings);
        }

        console.log(`[TokenSystem] Imported profile and ${imported} game saves`);

        // Refresh UI
        this.refreshUI();

        return {
            profile: this.profile,
            gamesImported: imported
        };
    }

    // Settings management
    getSettings() {
        const settings = {};
        const settingsKeys = ['theme', 'autoSave', 'soundEnabled', 'notifications'];

        settingsKeys.forEach(key => {
            const value = localStorage.getItem(`setting_${key}`);
            if (value !== null) {
                settings[key] = value;
            }
        });

        return settings;
    }

    importSettings(settings) {
        for (const [key, value] of Object.entries(settings)) {
            localStorage.setItem(`setting_${key}`, value);
        }
    }

    // UI Setup
    setupUI() {
        // Add profile button to header if it doesn't exist
        if (!document.querySelector('.profile-button')) {
            this.addProfileButton();
        }

        // Setup profile modal
        this.setupProfileModal();
    }

    addProfileButton() {
        const header = document.querySelector('header') || document.querySelector('.nav');
        if (!header) return;

        const profileBtn = document.createElement('button');
        profileBtn.className = 'profile-button';
        profileBtn.innerHTML = this.profile
            ? `<img src="${this.profile.avatarBase64}" alt="Profile"> ${this.profile.displayName}`
            : '<i class="icon-user"></i> Sign In';

        profileBtn.addEventListener('click', () => this.showProfileModal());
        header.appendChild(profileBtn);
    }

    setupProfileModal() {
        // Remove existing modal if present
        const existing = document.querySelector('.profile-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'profile-modal modal hidden';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${this.profile ? 'Profile' : 'Create Profile'}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${this.profile ? this.getProfileView() : this.getSignupView()}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup modal events
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Setup form handlers based on view
        if (this.profile) {
            this.setupProfileHandlers(modal);
        } else {
            this.setupSignupHandlers(modal);
        }
    }

    getSignupView() {
        return `
            <form id="signup-form">
                <div class="form-group">
                    <label for="display-name">Display Name</label>
                    <input type="text" id="display-name" class="form-control" required
                           placeholder="Enter your display name">
                </div>
                <div class="form-group">
                    <label for="avatar">Avatar</label>
                    <div class="avatar-picker">
                        <img id="avatar-preview" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23ddd'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999'%3EAvatar%3C/text%3E%3C/svg%3E" alt="Avatar">
                        <input type="file" id="avatar-input" accept="image/*">
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('avatar-input').click()">
                            Choose Avatar
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password (Optional)</label>
                    <input type="password" id="password" class="form-control"
                           placeholder="For encrypted backup tokens">
                    <small>Leave empty for unencrypted tokens</small>
                </div>
                <button type="submit" class="btn btn-primary">Create Profile</button>
            </form>
        `;
    }

    getProfileView() {
        const stats = this.getStats();
        return `
            <div class="profile-info">
                <div class="profile-header">
                    <img src="${this.profile.avatarBase64}" alt="Avatar" class="profile-avatar">
                    <div>
                        <h3>${this.profile.displayName}</h3>
                        <p>Member since ${new Date(this.profile.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="profile-stats">
                    <div class="stat">
                        <span class="stat-value">${stats.gamesPlayed}</span>
                        <span class="stat-label">Games Played</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${stats.totalSaves}</span>
                        <span class="stat-label">Total Saves</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${this.formatBytes(stats.storageUsed)}</span>
                        <span class="stat-label">Storage Used</span>
                    </div>
                </div>
                <div class="profile-actions">
                    <button class="btn btn-primary export-token">
                        <i class="icon-download"></i> Export Token
                    </button>
                    <button class="btn btn-secondary import-token">
                        <i class="icon-upload"></i> Import Token
                    </button>
                    <button class="btn btn-secondary edit-profile">
                        <i class="icon-edit"></i> Edit Profile
                    </button>
                    <button class="btn btn-danger logout">
                        <i class="icon-logout"></i> Sign Out
                    </button>
                </div>
            </div>
        `;
    }

    setupSignupHandlers(modal) {
        const form = modal.querySelector('#signup-form');
        const avatarInput = modal.querySelector('#avatar-input');
        const avatarPreview = modal.querySelector('#avatar-preview');

        // Avatar upload
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const displayName = form.querySelector('#display-name').value;
            const avatarBase64 = avatarPreview.src;
            const password = form.querySelector('#password').value;

            // Create profile
            this.createProfile(displayName, avatarBase64);

            // Export initial token if password provided
            if (password) {
                const token = await this.exportToken(password);
                this.downloadToken(token);
            }

            // Refresh UI
            this.refreshUI();
            modal.classList.add('hidden');
        });
    }

    setupProfileHandlers(modal) {
        // Export token
        modal.querySelector('.export-token').addEventListener('click', async () => {
            const password = prompt('Enter password for encryption (optional):');
            const token = await this.exportToken(password || '');
            this.downloadToken(token);
        });

        // Import token
        modal.querySelector('.import-token').addEventListener('click', () => {
            this.showImportDialog();
        });

        // Edit profile
        modal.querySelector('.edit-profile').addEventListener('click', () => {
            // Switch to edit view
            modal.querySelector('.modal-body').innerHTML = this.getEditView();
            this.setupEditHandlers(modal);
        });

        // Logout
        modal.querySelector('.logout').addEventListener('click', () => {
            if (confirm('Are you sure you want to sign out? This will not delete your saved games.')) {
                this.logout();
                modal.classList.add('hidden');
            }
        });
    }

    getEditView() {
        return `
            <form id="edit-form">
                <div class="form-group">
                    <label for="edit-display-name">Display Name</label>
                    <input type="text" id="edit-display-name" class="form-control"
                           value="${this.profile.displayName}" required>
                </div>
                <div class="form-group">
                    <label for="edit-avatar">Avatar</label>
                    <div class="avatar-picker">
                        <img id="edit-avatar-preview" src="${this.profile.avatarBase64}" alt="Avatar">
                        <input type="file" id="edit-avatar-input" accept="image/*">
                        <button type="button" class="btn btn-secondary"
                                onclick="document.getElementById('edit-avatar-input').click()">
                            Change Avatar
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="theme">Theme</label>
                    <select id="theme" class="form-control">
                        <option value="dark" ${this.profile.theme === 'dark' ? 'selected' : ''}>Dark</option>
                        <option value="light" ${this.profile.theme === 'light' ? 'selected' : ''}>Light</option>
                        <option value="auto" ${this.profile.theme === 'auto' ? 'selected' : ''}>Auto</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                    <button type="button" class="btn btn-secondary cancel-edit">Cancel</button>
                </div>
            </form>
        `;
    }

    setupEditHandlers(modal) {
        const form = modal.querySelector('#edit-form');
        const avatarInput = modal.querySelector('#edit-avatar-input');
        const avatarPreview = modal.querySelector('#edit-avatar-preview');

        // Avatar change
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Save changes
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.updateProfile({
                displayName: form.querySelector('#edit-display-name').value,
                avatarBase64: avatarPreview.src,
                theme: form.querySelector('#theme').value
            });

            // Apply theme
            this.applyTheme(this.profile.theme);

            // Back to profile view
            modal.querySelector('.modal-body').innerHTML = this.getProfileView();
            this.setupProfileHandlers(modal);

            // Refresh UI
            this.refreshUI();
        });

        // Cancel
        modal.querySelector('.cancel-edit').addEventListener('click', () => {
            modal.querySelector('.modal-body').innerHTML = this.getProfileView();
            this.setupProfileHandlers(modal);
        });
    }

    showImportDialog() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.token,.json';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const text = await file.text();
                const tokenFile = JSON.parse(text);

                let password = '';
                if (tokenFile.encrypted) {
                    password = prompt('Enter password to decrypt token:');
                    if (!password) return;
                }

                const result = await this.importToken(tokenFile, password);
                alert(`Successfully imported profile and ${result.gamesImported} game saves!`);
            } catch (error) {
                alert('Failed to import token: ' + error.message);
            }
        };

        input.click();
    }

    downloadToken(token) {
        const blob = new Blob([JSON.stringify(token, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.profile.displayName}-token-${Date.now()}.token`;
        a.click();

        URL.revokeObjectURL(url);
    }

    logout() {
        this.profile = null;
        localStorage.removeItem('user_profile');
        this.refreshUI();
    }

    refreshUI() {
        // Update profile button
        const profileBtn = document.querySelector('.profile-button');
        if (profileBtn) {
            profileBtn.innerHTML = this.profile
                ? `<img src="${this.profile.avatarBase64}" alt="Profile"> ${this.profile.displayName}`
                : '<i class="icon-user"></i> Sign In';
        }

        // Update modal if open
        const modal = document.querySelector('.profile-modal:not(.hidden)');
        if (modal) {
            modal.querySelector('.modal-body').innerHTML = this.profile
                ? this.getProfileView()
                : this.getSignupView();

            if (this.profile) {
                this.setupProfileHandlers(modal);
            } else {
                this.setupSignupHandlers(modal);
            }
        }
    }

    showProfileModal() {
        const modal = document.querySelector('.profile-modal');
        if (modal) {
            modal.classList.remove('hidden');
        } else {
            this.setupProfileModal();
            setTimeout(() => {
                document.querySelector('.profile-modal').classList.remove('hidden');
            }, 100);
        }
    }

    applyTheme(theme) {
        document.body.className = document.body.className.replace(/theme-\w+/, '');

        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
        } else {
            document.body.classList.add(`theme-${theme}`);
        }
    }

    getStats() {
        const progressKeys = Object.keys(localStorage).filter(k => k.startsWith('game_progress_'));
        let storageUsed = 0;

        // Calculate storage used
        for (let key in localStorage) {
            storageUsed += localStorage.getItem(key).length + key.length;
        }

        return {
            gamesPlayed: progressKeys.length,
            totalSaves: progressKeys.length, // Could track individual save counts
            storageUsed: storageUsed
        };
    }

    formatBytes(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
}

// Initialize token system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.tokenSystem = new TokenSystem();
        window.tokenSystem.init();
    });
} else {
    window.tokenSystem = new TokenSystem();
    window.tokenSystem.init();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenSystem;
}