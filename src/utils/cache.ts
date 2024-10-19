import { CacheEntry } from '../types';

class LRUCache<K, V> {
  private cache: Map<K, V>;
  private readonly capacity: number;

  constructor(capacity: number) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}

const CACHE_SIZE = 1000;
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export const cache = new LRUCache<string, CacheEntry<any>>(CACHE_SIZE);

export function getCachedData<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_EXPIRATION) {
    return entry.data;
  }
  return null;
}

export function setCachedData<T>(key: string, data: T): void {
  cache.put(key, { data, timestamp: Date.now() });
}