import { advancedLanguageModel } from './AdvancedLanguageModel';
import { knowledgeGraph } from './KnowledgeGraph';

class ProblemSolvingFramework {
  private approaches: string[] = [
    'analytical',
    'creative',
    'critical',
    'systems',
    'design',
    'strategic',
    'collaborative'
  ];

  async identifyApproach(input: string, context: any): Promise<string> {
    const combinedInput = `${input}\n\nContext: ${JSON.stringify(context)}`;
    const prompt = `Analyze the following input and context, then determine the most suitable problem-solving approach from this list: ${this.approaches.join(', ')}. Respond with only the name of the approach.`;
    return advancedLanguageModel.generateText(`${prompt}\n\nInput: ${combinedInput}`, true);
  }

  async calculateApproachRelevance(concept: string, approach: string): Promise<number> {
    const conceptEmbedding = await advancedLanguageModel.getEmbeddings(concept);
    const approachEmbedding = await advancedLanguageModel.getEmbeddings(approach);
    return this.cosineSimilarity(conceptEmbedding, approachEmbedding);
  }

  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (mag1 * mag2);
  }

  async generateApproachSpecificStrategies(approach: string, problem: string): Promise<string[]> {
    const prompt = `Generate 3 specific strategies for solving the following problem using a ${approach} approach:\n\nProblem: ${problem}\n\nStrategies:`;
    const response = await advancedLanguageModel.generateText(prompt, true);
    return response.split('\n').filter(strategy => strategy.trim() !== '');
  }

  async evaluateStrategy(strategy: string, problem: string): Promise<number> {
    const prompt = `Evaluate the effectiveness of the following strategy for solving the given problem. Provide a score from 0 to 1, where 0 is completely ineffective and 1 is highly effective.\n\nProblem: ${problem}\n\nStrategy: ${strategy}\n\nScore:`;
    const response = await advancedLanguageModel.generateText(prompt, true);
    return parseFloat(response) || 0;
  }
}

export const problemSolvingFramework = new ProblemSolvingFramework();