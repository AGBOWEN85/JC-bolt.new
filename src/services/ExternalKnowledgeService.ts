import axios from 'axios';
import { logError } from '../utils/errorHandling';
import { knowledgeGraph } from '../core/KnowledgeGraph';

class ExternalKnowledgeService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.EXTERNAL_API_KEY || '';
    this.baseUrl = 'https://api.example.com/v1'; // Replace with actual API endpoint
  }

  async fetchLatestKnowledge(topic: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/knowledge`, {
        params: { topic, apiKey: this.apiKey }
      });
      
      const newKnowledge = response.data.content;
      await this.integrateNewKnowledge(topic, newKnowledge);
      
      return newKnowledge;
    } catch (error) {
      logError(error as Error, { context: 'ExternalKnowledgeService.fetchLatestKnowledge', topic });
      return "Unable to fetch latest knowledge at the moment.";
    }
  }

  private async integrateNewKnowledge(topic: string, content: string): Promise<void> {
    const concepts = await knowledgeGraph.extractConcepts(content);
    for (const concept of concepts) {
      await knowledgeGraph.addOrUpdateConcept(concept, [topic], 'external');
    }
  }

  async getRealtimeData(dataType: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/realtime-data`, {
        params: { type: dataType, apiKey: this.apiKey }
      });
      return response.data;
    } catch (error) {
      logError(error as Error, { context: 'ExternalKnowledgeService.getRealtimeData', dataType });
      return null;
    }
  }
}

export const externalKnowledgeService = new ExternalKnowledgeService();