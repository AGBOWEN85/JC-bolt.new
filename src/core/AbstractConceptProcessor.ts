import { logError } from '../utils/errorHandling';
import { advancedLanguageModel } from './AdvancedLanguageModel';

class AbstractConceptProcessor {
  async extractConcepts(data: any): Promise<string[]> {
    try {
      const conceptDescription = await this.generateConceptDescription(data);
      return this.identifyCoreAbstractions(conceptDescription);
    } catch (error) {
      logError(error as Error, { context: 'AbstractConceptProcessor.extractConcepts' });
      return [];
    }
  }

  private async generateConceptDescription(data: any): Promise<string> {
    const prompt = `Analyze the following data and provide a detailed description of the core concepts it represents:

    ${JSON.stringify(data)}

    Description:`;

    return await advancedLanguageModel.generateText(prompt, true);
  }

  private async identifyCoreAbstractions(description: string): Promise<string[]> {
    const prompt = `Based on the following description, identify and list the core abstract concepts:

    ${description}

    Core Abstract Concepts:`;

    const conceptList = await advancedLanguageModel.generateText(prompt, true);
    return conceptList.split('\n').map(concept => concept.trim());
  }
}

export { AbstractConceptProcessor };