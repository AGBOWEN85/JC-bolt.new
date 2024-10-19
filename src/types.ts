export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'jc';
  timestamp: number;
}

export interface KnowledgeBaseEntry {
  id: string;
  domain: string;
  description: string;
  keywords: string[];
}

export interface AutomatedTask {
  id: string;
  name: string;
  description: string;
  execute: (params: Record<string, any>) => Promise<string>;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export interface PerformanceMetrics {
  responseTime: number;
  processingTime: number;
  cacheHits: number;
  cacheMisses: number;
}

export interface ErrorLog {
  id: string;
  timestamp: number;
  message: string;
  stack?: string;
  context?: Record<string, any>;
}