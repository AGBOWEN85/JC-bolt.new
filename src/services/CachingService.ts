import { logError } from '../utils/errorHandling';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class CachingService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  async get<T>(key: string): Promise<T | null> {
    try {
      const entry = this.cache.get(key);
      if (!entry) return null;

      if (Date.now() - entry.timestamp > this.DEFAULT_TTL) {
        this.cache.delete(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      logError(error as Error, { context: 'CachingService.get', key });
      return null;
    }
  }

  async set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): Promise<void> {
    try {
      this.cache.set(key, {
        data,
        timestamp: Date.now() + ttl
      });
    } catch (error) {
      logError(error as Error, { context: 'CachingService.set', key });
    }
  }

  async invalidate(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

export const cachingService = new CachingService();