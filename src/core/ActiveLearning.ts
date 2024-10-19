import { advancedLanguageModel } from './AdvancedLanguageModel';
import { knowledgeGraph } from './KnowledgeGraph';
import { logError } from '../utils/errorHandling';

interface UncertainArea {
  concept: string;
  uncertainty: number;
  impact: number;
}

class ActiveLearning {
  private uncertaintyThreshold: number = 0.3;
  private maxQueries: number = 5;

  async identifyUncertainAreas(input: string): Promise<UncertainArea[]> {
    try {
      const embeddings = await advancedLanguageModel.getEmbeddings(input);
      const concepts = await knowledgeGraph.searchConcepts(input);
      
      const uncertainAreas: UncertainArea[] = [];
      for (const concept of concepts) {
        const relatedConcepts = await knowledgeGraph.getRelatedConcepts(concept);
        const conceptEmbeddings = await Promise.all(relatedConcepts.map(c => advancedLanguageModel.getEmbeddings(c)));
        
        const similarities = conceptEmbeddings.map(e => this.cosineSimilarity(embeddings, e));
        const avgSimilarity = similarities.reduce((a, b) => a + b, 0) / similarities.length;
        const uncertainty = 1 - avgSimilarity;
        
        if (uncertainty > this.uncertaintyThreshold) {
          const impact = await this.assessConceptImpact(concept);
          uncertainAreas.push({ concept, uncertainty, impact });
        }
      }
      
      return uncertainAreas.sort((a, b) => b.impact * b.uncertainty - a.impact * a.uncertainty);
    } catch (error) {
      logError(error as Error, { context: 'ActiveLearning.identifyUncertainAreas', input });
      return [];
    }
  }

  async generateQueries(uncertainAreas: UncertainArea[]): Promise<string[]> {
    try {
      const queries: string[] = [];
      for (const area of uncertainAreas.slice(0, this.maxQueries)) {
        const prompt = `Generate a specific, targeted question to learn more about ${area.concept}, considering its uncertainty level of ${area.uncertainty.toFixed(2)} and potential impact of ${area.impact.toFixed(2)}:`;
        const query = await advancedLanguageModel.generateText(prompt, true); // Use GPT-4 for query generation
        queries.push(query);
      }
      return queries;
    } catch (error) {
      logError(error as Error, { context: 'ActiveLearning.generateQueries', uncertainAreas });
      return [];
    }
  }

  private async assessConceptImpact(concept: string): Promise<number> {
    try {
      const relatedConcepts = await knowledgeGraph.getRelatedConcepts(concept);
      const centralityScore = relatedConcepts.length / 10; // Normalize to 0-1 range
      const complexityScore = await advancedLanguageModel.analyzeComplexity(concept) / 10;
      return (centralityScore + complexityScore) / 2;
    } catch (error) {
      logError(error as Error, { context: 'ActiveLearning.assessConceptImpact', concept });
      return 0;
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

export const activeLearning = new ActiveLearning();