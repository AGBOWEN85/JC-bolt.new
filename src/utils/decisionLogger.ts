import { logError } from './errorHandling';

interface Decision {
  id: string;
  timestamp: number;
  context: string;
  decision: string;
  reasoning: string;
  ethicalImplications: string[];
  confidenceScore: number;
}

class DecisionLogger {
  private decisions: Decision[] = [];

  logDecision(decision: Omit<Decision, 'id' | 'timestamp'>): void {
    try {
      const newDecision: Decision = {
        ...decision,
        id: this.generateUniqueId(),
        timestamp: Date.now()
      };
      this.decisions.push(newDecision);
      this.publishDecision(newDecision);
    } catch (error) {
      logError(error as Error, { context: 'DecisionLogger.logDecision' });
    }
  }

  getDecisionHistory(): Decision[] {
    return this.decisions;
  }

  getDecisionById(id: string): Decision | undefined {
    return this.decisions.find(decision => decision.id === id);
  }

  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private publishDecision(decision: Decision): void {
    // In a real-world scenario, this method would publish the decision to a public ledger or database
    console.log('Decision published:', decision);
  }
}

export const decisionLogger = new DecisionLogger();