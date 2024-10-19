import * as tf from '@tensorflow/tfjs';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';
import { KnowledgeBaseEntry } from '../types';
import { logError } from './errorHandling';

class NLPProcessor {
  private useModel: UniversalSentenceEncoder | null = null;

  constructor() {
    this.loadUSEModel();
  }

  private async loadUSEModel() {
    try {
      this.useModel = await UniversalSentenceEncoder.load();
    } catch (error) {
      logError(error as Error, { context: 'NLPProcessor.loadUSEModel' });
    }
  }

  async extractKeywords(text: string): Promise<string[]> {
    if (!this.useModel) await this.loadUSEModel();
    if (!this.useModel) return [];

    const sentences = this.splitIntoSentences(text);
    const embeddings = await this.useModel.embed(sentences);
    const keywordScores = await this.calculateKeywordScores(sentences, embeddings);

    return this.selectTopKeywords(keywordScores, 10);
  }

  private splitIntoSentences(text: string): string[] {
    return text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  }

  private async calculateKeywordScores(sentences: string[], embeddings: tf.Tensor): Promise<Map<string, number>> {
    const keywordScores = new Map<string, number>();

    sentences.forEach((sentence, i) => {
      const words = sentence.toLowerCase().split(/\W+/);
      words.forEach(word => {
        if (word.length > 3) {
          const score = embeddings.slice([i, 0], [1, -1]).sum().dataSync()[0];
          keywordScores.set(word, (keywordScores.get(word) || 0) + score);
        }
      });
    });

    return keywordScores;
  }

  private selectTopKeywords(keywordScores: Map<string, number>, topN: number): string[] {
    return Array.from(keywordScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(entry => entry[0]);
  }

  async summarizeContext(context: string): string {
    if (!this.useModel) await this.loadUSEModel();
    if (!this.useModel) return context;

    const sentences = this.splitIntoSentences(context);
    const embeddings = await this.useModel.embed(sentences);
    const sentenceScores = await this.calculateSentenceScores(sentences, embeddings);

    const topSentences = this.selectTopSentences(sentenceScores, 3);
    return topSentences.join(' ');
  }

  private async calculateSentenceScores(sentences: string[], embeddings: tf.Tensor): Promise<Map<string, number>> {
    const sentenceScores = new Map<string, number>();

    sentences.forEach((sentence, i) => {
      const score = embeddings.slice([i, 0], [1, -1]).sum().dataSync()[0];
      sentenceScores.set(sentence, score);
    });

    return sentenceScores;
  }

  private selectTopSentences(sentenceScores: Map<string, number>, topN: number): string[] {
    return Array.from(sentenceScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(entry => entry[0]);
  }

  async extractKnowledge(input: string, response: string): Promise<KnowledgeBaseEntry | null> {
    const combinedText = `${input} ${response}`;
    const keywords = await this.extractKeywords(combinedText);
    const summary = await this.summarizeContext(combinedText);

    if (keywords.length > 0) {
      return {
        id: Date.now().toString(),
        domain: keywords[0],
        description: summary,
        keywords: keywords
      };
    }

    return null;
  }
}

export const nlpProcessor = new NLPProcessor();