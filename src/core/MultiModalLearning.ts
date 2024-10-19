import * as tf from '@tensorflow/tfjs';
import { logError } from '../utils/errorHandling';

class MultiModalLearning {
  private imageModel: tf.LayersModel | null = null;
  private audioModel: tf.LayersModel | null = null;

  constructor() {
    this.initializeModels();
  }

  private async initializeModels() {
    try {
      this.imageModel = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
      this.audioModel = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v0.3/browser_fft/18w/model.json');
    } catch (error) {
      logError(error as Error, { context: 'MultiModalLearning.initializeModels' });
    }
  }

  async processImage(imageData: ImageData): Promise<number[]> {
    if (!this.imageModel) {
      throw new Error('Image model not initialized');
    }

    try {
      const tensor = tf.browser.fromPixels(imageData).toFloat();
      const resized = tf.image.resizeBilinear(tensor, [224, 224]);
      const normalized = resized.div(tf.scalar(255));
      const batched = normalized.expandDims(0);
      const result = this.imageModel.predict(batched) as tf.Tensor;
      const predictions = await result.data();
      return Array.from(predictions);
    } catch (error) {
      logError(error as Error, { context: 'MultiModalLearning.processImage' });
      return [];
    }
  }

  async processAudio(audioData: Float32Array): Promise<number[]> {
    if (!this.audioModel) {
      throw new Error('Audio model not initialized');
    }

    try {
      const tensor = tf.tensor(audioData).reshape([1, 43, 232, 1]);
      const result = this.audioModel.predict(tensor) as tf.Tensor;
      const predictions = await result.data();
      return Array.from(predictions);
    } catch (error) {
      logError(error as Error, { context: 'MultiModalLearning.processAudio' });
      return [];
    }
  }

  async combineMultiModalData(textEmbedding: number[], imageEmbedding: number[], audioEmbedding: number[]): Promise<number[]> {
    try {
      const combined = tf.tidy(() => {
        const textTensor = tf.tensor1d(textEmbedding);
        const imageTensor = tf.tensor1d(imageEmbedding);
        const audioTensor = tf.tensor1d(audioEmbedding);
        return tf.concat([textTensor, imageTensor, audioTensor]);
      });
      const result = await combined.data();
      combined.dispose();
      return Array.from(result);
    } catch (error) {
      logError(error as Error, { context: 'MultiModalLearning.combineMultiModalData' });
      return [];
    }
  }
}

export const multiModalLearning = new MultiModalLearning();