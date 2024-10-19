import * as tf from '@tensorflow/tfjs';
import { logError } from '../utils/errorHandling';

interface ClientData {
  input: number[];
  label: number[];
}

class FederatedLearning {
  private globalModel: tf.LayersModel | null = null;
  private clientModels: Map<string, tf.LayersModel> = new Map();
  private clientDataBuffers: Map<string, ClientData[]> = new Map();
  private aggregationThreshold: number = 5;

  constructor() {
    this.initializeGlobalModel();
  }

  private async initializeGlobalModel() {
    try {
      this.globalModel = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [768], units: 384, activation: 'relu' }),
          tf.layers.dense({ units: 192, activation: 'relu' }),
          tf.layers.dense({ units: 96, activation: 'relu' }),
          tf.layers.dense({ units: 10, activation: 'softmax' }) // Increased output units for more complex classification
        ]
      });
      this.globalModel.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });
    } catch (error) {
      logError(error as Error, { context: 'FederatedLearning.initializeGlobalModel' });
    }
  }

  async trainClientModel(clientId: string, data: ClientData) {
    try {
      let clientBuffer = this.clientDataBuffers.get(clientId) || [];
      clientBuffer.push(data);
      this.clientDataBuffers.set(clientId, clientBuffer);

      if (clientBuffer.length >= this.aggregationThreshold) {
        let clientModel = this.clientModels.get(clientId);
        if (!clientModel) {
          clientModel = this.createClientModel();
          this.clientModels.set(clientId, clientModel);
        }

        const { inputs, labels } = this.prepareData(clientBuffer);
        await clientModel.fit(inputs, labels, { epochs: 5, batchSize: 32 });

        this.updateGlobalModel(clientModel);
        this.clientDataBuffers.set(clientId, []); // Clear the buffer after training
      }
    } catch (error) {
      logError(error as Error, { context: 'FederatedLearning.trainClientModel', clientId });
    }
  }

  private createClientModel(): tf.LayersModel {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [768], units: 384, activation: 'relu' }),
        tf.layers.dense({ units: 192, activation: 'relu' }),
        tf.layers.dense({ units: 96, activation: 'relu' }),
        tf.layers.dense({ units: 10, activation: 'softmax' })
      ]
    });
    model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });
    return model;
  }

  private prepareData(data: ClientData[]): { inputs: tf.Tensor2D, labels: tf.Tensor2D } {
    const inputs = tf.tensor2d(data.map(d => d.input));
    const labels = tf.tensor2d(data.map(d => d.label));
    return { inputs, labels };
  }

  private async updateGlobalModel(clientModel: tf.LayersModel) {
    if (!this.globalModel) return;

    const clientWeights = clientModel.getWeights();
    const globalWeights = this.globalModel.getWeights();

    const updatedWeights = globalWeights.map((globalWeight, i) => {
      const clientWeight = clientWeights[i];
      return tf.tidy(() => {
        const weightDiff = clientWeight.sub(globalWeight);
        const scaledDiff = weightDiff.mul(tf.scalar(0.1)); // Learning rate for global model update
        return globalWeight.add(scaledDiff);
      });
    });

    this.globalModel.setWeights(updatedWeights);
  }

  async getGlobalPrediction(input: number[]): Promise<number[]> {
    if (!this.globalModel) return [];

    const inputTensor = tf.tensor2d([input]);
    const prediction = this.globalModel.predict(inputTensor) as tf.Tensor;
    const result = await prediction.data();
    inputTensor.dispose();
    prediction.dispose();
    return Array.from(result);
  }

  async evaluateGlobalModel(testData: ClientData[]): Promise<{ accuracy: number, loss: number }> {
    if (!this.globalModel) return { accuracy: 0, loss: 0 };

    const { inputs, labels } = this.prepareData(testData);
    const result = await this.globalModel.evaluate(inputs, labels) as tf.Scalar[];
    const loss = result[0].dataSync()[0];
    const accuracy = result[1].dataSync()[0];

    inputs.dispose();
    labels.dispose();
    result.forEach(tensor => tensor.dispose());

    return { accuracy, loss };
  }
}

export const federatedLearning = new FederatedLearning();