import { Message } from '../types';
import { nlpProcessor } from './nlp';

class ContextManager {
  private contextWindow: Message[] = [];
  private maxContextSize = 100;

  addMessage(message: Message): void {
    this.contextWindow.push(message);
    if (this.contextWindow.length > this.maxContextSize) {
      this.contextWindow.shift();
    }
  }

  getContext(): Message[] {
    return this.contextWindow;
  }

  async summarizeContext(): Promise<string> {
    const fullContext = this.contextWindow
      .map(msg => `${msg.sender}: ${msg.text}`)
      .join('\n');

    return nlpProcessor.summarizeContext(fullContext);
  }

  async getRelevantContext(query: string): Promise<Message[]> {
    const queryEmbedding = await nlpProcessor.getEmbedding(query);
    const contextEmbeddings = await Promise.all(
      this.contextWindow.map(msg => nlpProcessor.getEmbedding(msg.text))
    );

    const similarities = contextEmbeddings.map(embedding => 
      nlpProcessor.calculateSimilarity(queryEmbedding, embedding)
    );

    const relevantIndices = similarities
      .map((similarity, index) => ({ similarity, index }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(item => item.index);

    return relevantIndices.map(index => this.contextWindow[index]);
  }
}

export const contextManager = new ContextManager();