# Comprehensive Implementation Plan for Ethanyo Game Downloader & Offline Account System

## Overview
This document provides a complete implementation plan for:
1. Automated game downloading from ethanyo.freetls.fastly.net
2. Offline login system with encrypted progress storage
3. Per-game progress reset functionality
4. User profile customization with avatars

## 1. Ethanyo Game Downloader Script

### Requirements
- Download games from https://ethanyo.freetls.fastly.net/g
- Support two URL formats:
  - Direct: `https://ethanyo.freetls.fastly.net/misc/play/astrosurvivor.html`
  - Query: `https://ethanyo.freetls.fastly.net/misc/play/?title=Balatro&author=LocalThunk&link=balatro`
- Download ALL assets for complete offline play
- Use the game's logo from the website
- Save to Assets/ folder following repo conventions

### Implementation Details

#### Script: `scripts/ethanyo-downloader.js`
```javascript
Features:
- Read URLs from a text file (batch processing)
- Parse both URL formats to extract game identifier
- Deep asset scraping with recursive iframe traversal
- WebAssembly/Unity/Godot stream interception
- Origin/Referer spoofing for protected assets
- Logo extraction from the game's listing page
- Progress tracking and resume capability
- Validation of downloaded games for offline readiness
```

#### Workflow:
1. Parse input file (`ethanyo-games.txt`) for URLs
2. For each URL:
   - Extract game slug/identifier
   - Visit the game page and capture all network requests
   - Download HTML entry point
   - Parse and download all referenced assets (CSS, JS, images, audio, video)
   - Handle dynamic asset loading (Unity, WebAssembly, lazy-loaded content)
   - Extract logo from the game listing page
   - Create Assets/[slug]/ folder structure
   - Validate offline functionality
   - Update games_list.json

## 2. Offline Login System with Encrypted Storage

### Architecture
- **No server required** - fully client-side
- Encrypted text blob contains all user data
- Import/export as text or file
- AES-256 encryption with user passphrase

### Data Structure
```json
{
  "version": "1.0",
  "user": {
    "username": "string",
    "avatar": "base64_image_or_preset_id",
    "created": "timestamp",
    "preferences": {
      "theme": "dark/light",
      "accent": "color",
      "layout": "grid/list"
    }
  },
  "gameProgress": {
    "game_slug": {
      "lastPlayed": "timestamp",
      "saveData": "base64_encoded_game_save",
      "achievements": [],
      "playtime": "seconds",
      "customData": {}
    }
  },
  "favorites": ["game_slug1", "game_slug2"],
  "settings": {
    "hideMaintenance": true,
    "customizations": {}
  }
}
```

### Implementation Components

#### 1. Encryption Service (`scripts/crypto-service.js`)
```javascript
Features:
- AES-256-GCM encryption
- PBKDF2 key derivation from passphrase
- Compress data before encryption (reduce blob size)
- Base64 encoding for text export
- File export as .jeoSave
```

#### 2. Account Manager (`scripts/account-manager.js`)
```javascript
Features:
- Create new account with username/avatar
- Encrypt account data to blob
- Decrypt blob with passphrase
- Merge progress from current session
- Export/import functions
- Auto-save to localStorage (encrypted)
```

#### 3. Progress Interceptor (`scripts/progress-interceptor.js`)
```javascript
Features:
- Hook into game's localStorage/IndexedDB writes
- Capture save data per game
- Store in account manager
- Restore on login
- Handle multiple save formats
```

## 3. UI Components

### Login Page (`login.html`)
```html
Features:
- Clean, intuitive design
- Two options: "Create Account" / "Import Account"
- Import via:
  - Paste encrypted text
  - Upload .jeoSave file
  - Scan QR code (optional)
- Passphrase input with strength indicator
- "Remember me" option (stores encrypted blob locally)
```

### Signup Page (`signup.html`)
```html
Features:
- Username input with validation
- Avatar selection:
  - Preset avatars (20+ options)
  - Upload custom image
  - Avatar editor (crop, filters)
- Passphrase creation with confirmation
- Theme/accent preview
- Export options immediately after creation
```

### Account Dashboard (`account.html`)
```html
Features:
- Profile display with avatar
- Stats overview (games played, total playtime)
- Export account (text/file/QR)
- Change passphrase
- Delete account
- Sync indicator showing last save time
```

## 4. Game Card Enhancements

### Reset Progress Button
```javascript
Location: Each game card, appears after clicking "Play"
Features:
- Secondary confirmation required
- "Are you sure? This will delete all progress for [Game Name]"
- Positioned away from play button to prevent accidents
- Only shows if game has saved progress
- Visual feedback on reset (animation)
```

### Implementation in `app.js`:
```javascript
- Add resetProgress() method to Game class
- Clear game-specific localStorage keys
- Remove from account progress object
- Update UI to reflect reset
- Log action for potential undo feature
```

## 5. Progress Storage Integration

### Per-Game Storage Keys
```javascript
Format: jeo_[game_slug]_[data_type]
Examples:
- jeo_balatro_save
- jeo_balatro_settings
- jeo_balatro_achievements
```

### Storage Flow
1. **On Game Start:**
   - Check if user logged in
   - If yes, restore progress from account blob
   - If no, use local storage

2. **During Gameplay:**
   - Intercept all storage writes
   - Update account manager in real-time
   - Periodic auto-save (every 30 seconds)

3. **On Game Exit:**
   - Final save capture
   - Update account blob
   - Store encrypted in localStorage

## 6. Security Considerations

### Encryption
- Never store plaintext passwords
- Salt unique per account
- 100,000 PBKDF2 iterations minimum
- Secure random IV for each encryption

### Privacy
- No telemetry or external calls
- All data stays client-side
- Optional localStorage with user consent
- Clear data option in settings

## 7. File Structure

```
/workspaces/jeoweb/
├── scripts/
│   ├── ethanyo-downloader.js      # Main downloader
│   ├── crypto-service.js          # Encryption utilities
│   ├── account-manager.js         # Account system
│   ├── progress-interceptor.js    # Save data capture
│   └── reset-progress.js          # Progress reset logic
├── styles/
│   ├── login.css                  # Login page styles
│   ├── account.css                # Account dashboard
│   └── components.css             # Shared components
├── login.html                     # Login page
├── signup.html                    # Signup page
├── account.html                   # Account dashboard
├── ethanyo-games.txt             # Input URLs
└── Assets/                       # Downloaded games
```

## 8. NPM Scripts

Add to package.json:
```json
"scripts": {
  "ethanyo:download": "node scripts/ethanyo-downloader.js",
  "ethanyo:batch": "node scripts/ethanyo-downloader.js --batch ethanyo-games.txt",
  "ethanyo:validate": "node scripts/ethanyo-downloader.js --validate",
  "account:export": "node scripts/account-manager.js --export",
  "account:test": "node scripts/account-manager.js --test"
}
```

## 9. Testing Strategy

### Automated Tests
- Encryption/decryption roundtrip
- Progress save/restore per game type
- Offline validation for downloaded games
- UI component rendering
- Cross-browser compatibility

### Manual Testing
- Create account flow
- Import/export workflows
- Progress reset confirmation
- Game loading with restored saves
- Avatar upload and display

## 10. Implementation Priority

1. **Phase 1:** Ethanyo downloader script (highest priority)
2. **Phase 2:** Basic account system with encryption
3. **Phase 3:** Progress capture and restore
4. **Phase 4:** UI pages (login, signup, dashboard)
5. **Phase 5:** Reset progress button
6. **Phase 6:** Advanced features (QR codes, avatar editor)

## Success Criteria

✅ Games download completely for offline play
✅ Account system works without any server
✅ Progress persists across sessions
✅ Reset button prevents accidental clicks
✅ Intuitive UI that matches existing design
✅ All data encrypted and secure
✅ Export/import works reliably
✅ No external dependencies added