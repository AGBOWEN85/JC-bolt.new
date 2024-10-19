import { advancedLanguageModel } from './AdvancedLanguageModel';
import { logError } from '../utils/errorHandling';

export class CreativeLeapGenerator {
  async generateLeap(knowledge: any, problem: string): Promise<string> {
    try {
      const prompt = `
        Using the following knowledge:
        ${JSON.stringify(knowledge)}

        Generate a creative and innovative solution to this problem:
        ${problem}

        Your solution should combine ideas from different fields in unexpected ways.
      `;

      return await advancedLanguageModel.generateText(prompt, true);
    } catch (error) {
      logError(error as Error, { context: 'CreativeLeapGenerator.generateLeap' });
      return "Unable to generate a creative leap at this time.";
    }
  }

  async generateScientificLeap(fieldKnowledge: any, interdisciplinaryConnections: string[]): Promise<string> {
    try {
      const prompt = `
        Based on the current knowledge in this field:
        ${JSON.stringify(fieldKnowledge)}

        And considering these interdisciplinary connections:
        ${interdisciplinaryConnections.join(', ')}

        Generate a potential scientific breakthrough or novel hypothesis that combines these elements in an innovative way.
      `;

      return await advancedLanguageModel.generateText(prompt, true);
    } catch (error) {
      logError(error as Error, { context: 'CreativeLeapGenerator.generateScientificLeap' });
      return "Unable to generate a scientific leap at this time.";
    }
  }

  async generateSocietalImprovement(relevantKnowledge: any, societalIssues: string[]): Promise<string> {
    try {
      const prompt = `
        Considering these societal issues:
        ${societalIssues.join(', ')}

        And using this relevant knowledge:
        ${JSON.stringify(relevantKnowledge)}

        Propose an innovative solution that could lead to significant societal improvement. 
        Consider combining ideas from different fields and approaches in unexpected ways.
      `;

      return await advancedLanguageModel.generateText(prompt, true);
    } catch (error) {
      logError(error as Error, { context: 'CreativeLeapGenerator.generateSocietalImprovement' });
      return "Unable to generate a societal improvement proposal at this time.";
    }
  }
}