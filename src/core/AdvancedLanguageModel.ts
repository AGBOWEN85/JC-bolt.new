import { HfInference } from '@huggingface/inference';
import OpenAI from 'openai';
import { logError } from '../utils/errorHandling';
import * as tf from '@tensorflow/tfjs';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';

class AdvancedLanguageModel {
  private hf: HfInference;
  private openai: OpenAI;
  private useModel: UniversalSentenceEncoder | null = null;

  constructor() {
    this.hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.loadUSEModel();
  }

  private async loadUSEModel() {
    try {
      this.useModel = await UniversalSentenceEncoder.load();
    } catch (error) {
      logError(error as Error, { context: 'AdvancedLanguageModel.loadUSEModel' });
    }
  }

  async generateText(prompt: string, useGPT4: boolean = false): Promise<string> {
    try {
      if (useGPT4) {
        const response = await this.openai.chat.completions.create({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
          temperature: 0.7,
        });
        return response.choices[0].message.content || '';
      } else {
        const response = await this.hf.textGeneration({
          model: 'gpt2',
          inputs: prompt,
          parameters: {
            max_new_tokens: 50,
            temperature: 0.7,
            top_p: 0.95,
          },
        });
        return response.generated_text;
      }
    } catch (error) {
      logError(error as Error, { context: 'AdvancedLanguageModel.generateText', prompt, useGPT4 });
      return '';
    }
  }

  async getEmbeddings(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
      });
      return response.data[0].embedding;
    } catch (error) {
      logError(error as Error, { context: 'AdvancedLanguageModel.getEmbeddings', text });
      return [];
    }
  }

  async analyzeComplexity(text: string): Promise<number> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Analyze the complexity of the following text on a scale of 1 to 10, where 1 is very simple and 10 is extremely complex. Respond with only the number." },
          { role: "user", content: text }
        ],
        max_tokens: 1,
        temperature: 0,
      });
      return parseInt(response.choices[0].message.content || '5', 10);
    } catch (error) {
      logError(error as Error, { context: 'AdvancedLanguageModel.analyzeComplexity', text });
      return 5; // Default to medium complexity
    }
  }

  async extractConcepts(text: string): Promise<string[]> {
    try {
      if (!this.useModel) await this.loadUSEModel();
      if (!this.useModel) throw new Error('USE model not loaded');

      const embedding = await this.useModel.embed(text);
      const embeddingData = await embedding.data();

      // Use k-means clustering to identify key concepts
      const k = 5; // Number of concepts to extract
      const { centroids, assignments } = tf.tidy(() => {
        const points = tf.tensor2d(embeddingData, [1, embeddingData.length]);
        return this.kMeans(points, k);
      });

      // Extract words closest to each centroid
      const words = text.split(/\s+/);
      const concepts: string[] = [];
      for (let i = 0; i < k; i++) {
        const centroidWords = words.filter((_, index) => assignments[index] === i);
        if (centroidWords.length > 0) {
          concepts.push(centroidWords[Math.floor(Math.random() * centroidWords.length)]);
        }
      }

      return concepts;
    } catch (error) {
      logError(error as Error, { context: 'AdvancedLanguageModel.extractConcepts', text });
      return [];
    }
  }

  private kMeans(points: tf.Tensor2D, k: number, iterations: number = 10): { centroids: tf.Tensor2D, assignments: number[] } {
    const numPoints = points.shape[0];
    const dims = points.shape[1];

    // Randomly initialize centroids
    let centroids = tf.randomUniform([k, dims]);

    for (let i = 0; i < iterations; i++) {
      // Assign points to centroids
      const assignments = tf.tidy(() => {
        const allDistances = tf.sum(tf.square(tf.sub(tf.expandDims(points, 1), tf.expandDims(centroids, 0))), 2);
        return allDistances.argMin(1).dataSync();
      });

      // Update centroids
      centroids = tf.tidy(() => {
        const newCentroids = [];
        for (let j = 0; j < k; j++) {
          const assignedPoints = tf.booleanMaskAsync(points, tf.equal(assignments, j));
          if (assignedPoints.shape[0] > 0) {
            newCentroids.push(tf.mean(assignedPoints, 0));
          } else {
            newCentroids.push(centroids.slice(j, 1));
          }
        }
        return tf.stack(newCentroids);
      });
    }

    const assignments = tf.tidy(() => {
      const allDistances = tf.sum(tf.square(tf.sub(tf.expandDims(points, 1), tf.expandDims(centroids, 0))), 2);
      return allDistances.argMin(1).dataSync();
    });

    return { centroids, assignments: Array.from(assignments) };
  }
}

export const advancedLanguageModel = new AdvancedLanguageModel();