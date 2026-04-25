/**
 * Crypto Service for Offline Account System
 * Handles encryption/decryption of user data using Web Crypto API
 */

class CryptoService {
  constructor() {
    this.algorithm = 'AES-GCM';
    this.keyLength = 256;
    this.saltLength = 32;
    this.ivLength = 16;
    this.tagLength = 128;
    this.pbkdf2Iterations = 100000;
  }

  /**
   * Generate a random salt
   */
  generateSalt() {
    return crypto.getRandomValues(new Uint8Array(this.saltLength));
  }

  /**
   * Generate a random IV
   */
  generateIV() {
    return crypto.getRandomValues(new Uint8Array(this.ivLength));
  }

  /**
   * Derive encryption key from passphrase
   */
  async deriveKey(passphrase, salt) {
    const encoder = new TextEncoder();
    const passphraseKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: this.pbkdf2Iterations,
        hash: 'SHA-256'
      },
      passphraseKey,
      { name: this.algorithm, length: this.keyLength },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypt data with passphrase
   */
  async encrypt(data, passphrase) {
    try {
      // Convert data to JSON string
      const jsonStr = JSON.stringify(data);
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(jsonStr);

      // Generate salt and IV
      const salt = this.generateSalt();
      const iv = this.generateIV();

      // Derive key
      const key = await this.deriveKey(passphrase, salt);

      // Encrypt
      const encryptedBuffer = await crypto.subtle.encrypt(
        {
          name: this.algorithm,
          iv: iv,
          tagLength: this.tagLength
        },
        key,
        dataBuffer
      );

      // Combine salt + iv + encrypted data
      const combined = new Uint8Array(
        salt.length + iv.length + encryptedBuffer.byteLength
      );
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);

      // Convert to base64
      return this.arrayBufferToBase64(combined.buffer);
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt data with passphrase
   */
  async decrypt(encryptedData, passphrase) {
    try {
      // Convert from base64
      const combined = new Uint8Array(this.base64ToArrayBuffer(encryptedData));

      // Extract salt, iv, and encrypted data
      const salt = combined.slice(0, this.saltLength);
      const iv = combined.slice(this.saltLength, this.saltLength + this.ivLength);
      const encrypted = combined.slice(this.saltLength + this.ivLength);

      // Derive key
      const key = await this.deriveKey(passphrase, salt);

      // Decrypt
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: this.algorithm,
          iv: iv,
          tagLength: this.tagLength
        },
        key,
        encrypted
      );

      // Convert back to JSON
      const decoder = new TextDecoder();
      const jsonStr = decoder.decode(decryptedBuffer);
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data - invalid passphrase or corrupted data');
    }
  }

  /**
   * Hash a passphrase for validation
   */
  async hashPassphrase(passphrase) {
    const encoder = new TextEncoder();
    const data = encoder.encode(passphrase);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return this.arrayBufferToBase64(hashBuffer);
  }

  /**
   * Convert ArrayBuffer to Base64
   */
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Convert Base64 to ArrayBuffer
   */
  base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Compress data before encryption (optional, for large save files)
   */
  async compress(data) {
    const jsonStr = JSON.stringify(data);
    const encoder = new TextEncoder();
    const input = encoder.encode(jsonStr);

    // Use CompressionStream if available
    if (typeof CompressionStream !== 'undefined') {
      const stream = new CompressionStream('gzip');
      const writer = stream.writable.getWriter();
      writer.write(input);
      writer.close();

      const chunks = [];
      const reader = stream.readable.getReader();
      let result;
      while (!(result = await reader.read()).done) {
        chunks.push(result.value);
      }

      const compressed = new Uint8Array(
        chunks.reduce((acc, chunk) => acc + chunk.length, 0)
      );
      let offset = 0;
      for (const chunk of chunks) {
        compressed.set(chunk, offset);
        offset += chunk.length;
      }

      return compressed;
    }

    // Fallback: no compression
    return input;
  }

  /**
   * Decompress data after decryption
   */
  async decompress(compressed) {
    // Use DecompressionStream if available
    if (typeof DecompressionStream !== 'undefined') {
      const stream = new DecompressionStream('gzip');
      const writer = stream.writable.getWriter();
      writer.write(compressed);
      writer.close();

      const chunks = [];
      const reader = stream.readable.getReader();
      let result;
      while (!(result = await reader.read()).done) {
        chunks.push(result.value);
      }

      const decompressed = new Uint8Array(
        chunks.reduce((acc, chunk) => acc + chunk.length, 0)
      );
      let offset = 0;
      for (const chunk of chunks) {
        decompressed.set(chunk, offset);
        offset += chunk.length;
      }

      const decoder = new TextDecoder();
      const jsonStr = decoder.decode(decompressed);
      return JSON.parse(jsonStr);
    }

    // Fallback: assume no compression
    const decoder = new TextDecoder();
    const jsonStr = decoder.decode(compressed);
    return JSON.parse(jsonStr);
  }

  /**
   * Generate a secure random token
   */
  generateToken(length = 32) {
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return this.arrayBufferToBase64(bytes.buffer);
  }

  /**
   * Validate passphrase strength
   */
  validatePassphraseStrength(passphrase) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(passphrase);
    const hasLowerCase = /[a-z]/.test(passphrase);
    const hasNumbers = /\d/.test(passphrase);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passphrase);

    const strength = {
      valid: false,
      score: 0,
      feedback: []
    };

    if (passphrase.length < minLength) {
      strength.feedback.push(`Must be at least ${minLength} characters`);
    } else {
      strength.score += 25;
    }

    if (!hasUpperCase) {
      strength.feedback.push('Add uppercase letters');
    } else {
      strength.score += 25;
    }

    if (!hasLowerCase) {
      strength.feedback.push('Add lowercase letters');
    } else {
      strength.score += 25;
    }

    if (!hasNumbers) {
      strength.feedback.push('Add numbers');
    } else {
      strength.score += 15;
    }

    if (!hasSpecialChar) {
      strength.feedback.push('Add special characters');
    } else {
      strength.score += 10;
    }

    strength.valid = strength.score >= 65;
    return strength;
  }
}

// Export for use in browser and Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CryptoService;
} else {
  window.CryptoService = CryptoService;
}