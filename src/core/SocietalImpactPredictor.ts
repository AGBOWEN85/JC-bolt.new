import { predictiveEngine } from './PredictiveEngine';
import { logError } from '../utils/errorHandling';

export class SocietalImpactPredictor {
  async predict(proposal: string): Promise<string> {
    try {
      const impactDomains = ['economy', 'education', 'healthcare', 'environment', 'social_equality'];
      const predictions = await Promise.all(impactDomains.map(domain => 
        predictiveEngine.generatePredictions(domain)
      ));

      const impactAnalysis = predictions.map(prediction => `
        ${prediction.domain.charAt(0).toUpperCase() + prediction.domain.slice(1)}:
        Short-term: ${prediction.shortTerm}
        Medium-term: ${prediction.mediumTerm}
        Long-term: ${prediction.longTerm}
      `).join('\n');

      return `
        Predicted Societal Impact:
        ${impactAnalysis}

        Overall Confidence: ${(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length * 100).toFixed(2)}%
      `;
    } catch (error) {
      logError(error as Error, { context: 'SocietalImpactPredictor.predict' });
      return "Unable to predict societal impact at this time.";
    }
  }
}