import { ErrorLog } from '../types';
import { monitoringSystem } from '../services/MonitoringSystem';

const errorLogs: ErrorLog[] = [];

export async function logError(error: Error, context?: Record<string, any>): Promise<void> {
  const errorLog: ErrorLog = {
    id: generateUniqueId(),
    timestamp: Date.now(),
    message: error.message,
    stack: error.stack,
    context,
  };

  errorLogs.push(errorLog);
  console.error('Error logged:', errorLog);

  // Send error to monitoring system
  await monitoringSystem.logNodePerformance(context?.node || 'unknown', 'failure');

  // In a production environment, you might want to send this to a logging service
  // await sendToLoggingService(errorLog);
}

export function getErrorLogs(): ErrorLog[] {
  return [...errorLogs];
}

function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export async function analyzeErrorLogs(): Promise<string> {
  const recentErrors = errorLogs.slice(-50); // Analyze last 50 errors
  const errorSummary = recentErrors.reduce((summary, log) => {
    summary[log.context?.context || 'unknown'] = (summary[log.context?.context || 'unknown'] || 0) + 1;
    return summary;
  }, {} as Record<string, number>);

  const analysisPrompt = `
    Analyze the following error log summary for an AI system:

    ${Object.entries(errorSummary).map(([context, count]) => `${context}: ${count} errors`).join('\n')}

    Provide insights on potential systemic issues and recommendations for improving system stability.
  `;

  return await advancedLanguageModel.generateText(analysisPrompt, true);
}