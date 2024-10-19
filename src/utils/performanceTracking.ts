import { logError } from './errorHandling';

interface PerformanceMetric {
  timestamp: number;
  responseTime: number;
  accuracy: number;
  userSatisfaction: number;
}

class PerformanceTracker {
  private metrics: PerformanceMetric[] = [];
  private readonly MAX_METRICS = 10000; // Store up to 10,000 metrics

  addMetric(metric: Omit<PerformanceMetric, 'timestamp'>): void {
    this.metrics.push({
      ...metric,
      timestamp: Date.now(),
    });

    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics.shift(); // Remove the oldest metric
    }
  }

  getAverageMetrics(timeRange: number): PerformanceMetric {
    const now = Date.now();
    const relevantMetrics = this.metrics.filter(m => now - m.timestamp <= timeRange);

    if (relevantMetrics.length === 0) {
      return {
        timestamp: now,
        responseTime: 0,
        accuracy: 0,
        userSatisfaction: 0,
      };
    }

    const sum = relevantMetrics.reduce(
      (acc, metric) => ({
        responseTime: acc.responseTime + metric.responseTime,
        accuracy: acc.accuracy + metric.accuracy,
        userSatisfaction: acc.userSatisfaction + metric.userSatisfaction,
      }),
      { responseTime: 0, accuracy: 0, userSatisfaction: 0 }
    );

    return {
      timestamp: now,
      responseTime: sum.responseTime / relevantMetrics.length,
      accuracy: sum.accuracy / relevantMetrics.length,
      userSatisfaction: sum.userSatisfaction / relevantMetrics.length,
    };
  }

  async analyzePerformanceTrend(): Promise<string> {
    try {
      const lastDay = this.getAverageMetrics(24 * 60 * 60 * 1000);
      const lastWeek = this.getAverageMetrics(7 * 24 * 60 * 60 * 1000);
      const lastMonth = this.getAverageMetrics(30 * 24 * 60 * 60 * 1000);

      const trend = {
        responseTime: this.calculateTrend(lastMonth.responseTime, lastWeek.responseTime, lastDay.responseTime),
        accuracy: this.calculateTrend(lastMonth.accuracy, lastWeek.accuracy, lastDay.accuracy),
        userSatisfaction: this.calculateTrend(lastMonth.userSatisfaction, lastWeek.userSatisfaction, lastDay.userSatisfaction),
      };

      return `
        Performance Trend Analysis:
        Response Time: ${trend.responseTime}
        Accuracy: ${trend.accuracy}
        User Satisfaction: ${trend.userSatisfaction}
      `;
    } catch (error) {
      logError(error as Error, { context: 'PerformanceTracker.analyzePerformanceTrend' });
      return 'Unable to analyze performance trend due to an error.';
    }
  }

  private calculateTrend(month: number, week: number, day: number): string {
    const weekTrend = ((week - month) / month) * 100;
    const dayTrend = ((day - week) / week) * 100;

    if (dayTrend > 5) return 'Rapidly Improving';
    if (dayTrend > 0) return 'Gradually Improving';
    if (dayTrend < -5) return 'Rapidly Declining';
    if (dayTrend < 0) return 'Gradually Declining';
    return 'Stable';
  }
}

export const performanceTracker = new PerformanceTracker();