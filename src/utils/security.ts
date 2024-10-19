import crypto from 'crypto';
import { logError } from './errorHandling';

class SecurityManager {
  private readonly ENCRYPTION_KEY: Buffer;
  private readonly IV_LENGTH = 16;

  constructor() {
    // In a real-world scenario, this key would be securely stored and not hardcoded
    this.ENCRYPTION_KEY = crypto.scryptSync(process.env.ENCRYPTION_SECRET || 'fallback-secret', 'salt', 32);
  }

  encrypt(text: string): string {
    try {
      const iv = crypto.randomBytes(this.IV_LENGTH);
      const cipher = crypto.createCipheriv('aes-256-cbc', this.ENCRYPTION_KEY, iv);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
      logError(error as Error, { context: 'SecurityManager.encrypt' });
      throw new Error('Encryption failed');
    }
  }

  decrypt(text: string): string {
    try {
      const textParts = text.split(':');
      const iv = Buffer.from(textParts.shift()!, 'hex');
      const encryptedText = Buffer.from(textParts.join(':'), 'hex');
      const decipher = crypto.createDecipheriv('aes-256-cbc', this.ENCRYPTION_KEY, iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    } catch (error) {
      logError(error as Error, { context: 'SecurityManager.decrypt' });
      throw new Error('Decryption failed');
    }
  }

  hashData(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  verifyIntegrity(data: string, hash: string): boolean {
    return this.hashData(data) === hash;
  }
}

export const securityManager = new SecurityManager();