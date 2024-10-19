import { knowledgeGraph } from './KnowledgeGraph';
import { logError } from '../utils/errorHandling';

export class InterdisciplinaryAnalyzer {
  async analyzeConnections(concepts: string[]): Promise<void> {
    try {
      for (const concept of concepts) {
        const relatedConcepts = await knowledgeGraph.findRelatedConcepts(concept);
        for (const relatedConcept of relatedConcepts) {
          if (relatedConcept.domain !== concept.domain) {
            await knowledgeGraph.addInterdisciplinaryConnection(concept, relatedConcept);
          }
        }
      }
    } catch (error) {
      logError(error as Error, { context: 'InterdisciplinaryAnalyzer.analyzeConnections' });
    }
  }

  async findConnections(field: string): Promise<string[]> {
    try {
      const connections = await knowledgeGraph.getInterdisciplinaryConnections(field);
      return connections.map(connection => connection.targetField);
    } catch (error) {
      logError(error as Error, { context: 'InterdisciplinaryAnalyzer.findConnections' });
      return [];
    }
  }
}