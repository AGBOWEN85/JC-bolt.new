import { ethicalDecisionMaking } from './EthicalDecisionMaking';
import { logError } from '../utils/errorHandling';

export class EthicalImplicationEvaluator {
  async evaluate(proposal: string): Promise<string> {
    try {
      const ethicalDecision = await ethicalDecisionMaking.makeEthicalDecision(proposal);
      return `
        Ethical Implications:
        ${ethicalDecision.reasoning}

        Potential Risks:
        ${ethicalDecision.ethicalImplications.join('\n')}

        Ethical Recommendation:
        ${ethicalDecision.decision}
      `;
    } catch (error) {
      logError(error as Error, { context: 'EthicalImplicationEvaluator.evaluate' });
      return "Unable to evaluate ethical implications at this time.";
    }
  }
}