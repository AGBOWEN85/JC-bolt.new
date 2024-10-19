import { PerformanceMetrics } from '../types';

let metrics: PerformanceMetrics = {
  responseTime: 0,
  processingTime: 0,
  cacheHits: 0,
  cacheMisses: 0,
};

export function updateMetrics(newMetrics: Partial<PerformanceMetrics>): void {
  metrics = { ...metrics, ...newMetrics };
}

export function getMetrics(): PerformanceMetrics {
  return { ...metrics };
}

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      updateMetrics({ cacheHits: metrics.cacheHits + 1 });
      return cache.get(key)!;
    }
    updateMetrics({ cacheMisses: metrics.cacheMisses + 1 });
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export async function measurePerformance<T>(
  fn: () => Promise<T>,
  context: string
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();
    updateMetrics({ [context]: end - start });
    return result;
  } catch (error) {
    console.error(`Error in ${context}:`, error);
    throw error;
  }
}