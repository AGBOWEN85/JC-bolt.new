import { logError } from '../utils/errorHandling';
import { advancedLanguageModel } from './AdvancedLanguageModel';

interface MemoryEntry {
  input: string;
  response: string;
  timestamp: number;
}

class ContextualMemory {
  private userMemory: Map<string, MemoryEntry[]> = new Map();
  private maxMemorySize: number = 10;

  async getContext(userId: string): Promise<string> {
    try {
      const userEntries = this.userMemory.get(userId) || [];
      if (userEntries.length === 0) return '';

      const contextEntries = userEntries.slice(-this.maxMemorySize);
      const contextText = contextEntries.map(entry => `User: ${entry.input}\nJC: ${entry.response}`).join('\n\n');
      
      return await advancedLanguageModel.generateText(
        `Summarize the following conversation context in a concise manner:\n\n${contextText}`,
        true
      );
    } catch (error) {
      logError(error as Error, { context: 'ContextualMemory.getContext', userId });
      return '';
    }
  }

  async updateContext(userId: string, input: string, response: string): Promise<void> {
    try {
      const userEntries = this.userMemory.get(userId) || [];
      userEntries.push({ input, response, timestamp: Date.now() });
      
      if (userEntries.length > this.maxMemorySize) {
        userEntries.shift();
      }

      this.userMemory.set(userId, userEntries);
    } catch (error) {
      logError(error as Error, { context: 'ContextualMemory.updateContext', userId });
    }
  }

  async getRelevantMemories(userId: string, query: string): Promise<MemoryEntry[]> {
    try {
      const userEntries = this.userMemory.get(userId) || [];
      const queryEmbedding = await advancedLanguageModel.getEmbeddings(query);

      const scoredEntries = await Promise.all(userEntries.map(async entry => {
        const entryEmbedding = await advancedLanguageModel.getEmbeddings(`${entry.input} ${entry.response}`);
        const similarity = this.cosineSimilarity(queryEmbedding, entryEmbedding);
        return { ...entry, similarity };
      }));

      scoredEntries.sort((a, b) => b.similarity - a.similarity);
      return scoredEntries.slice(0, 3);
    } catch (error) {
      logError(error as Error, { context: 'ContextualMemory.getRelevantMemories', userId });
      return [];
    }
  }

  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (mag1 * mag2);
  }
}

export const contextualMemory = new ContextualMemory();