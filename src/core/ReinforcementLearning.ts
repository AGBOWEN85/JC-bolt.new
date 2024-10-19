import * as tf from '@tensorflow/tfjs';

class ReinforcementLearning {
  private model: tf.Sequential;
  private optimizer: tf.Optimizer;
  private gamma: number;
  private epsilon: number;

  constructor() {
    this.model = this.createModel();
    this.optimizer = tf.train.adam(0.01);
    this.gamma = 0.99;
    this.epsilon = 0.1;
  }

  private createModel(): tf.Sequential {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [200] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 200, activation: 'tanh' }));
    return model;
  }

  async updatePolicy(state: number[], reward: number): Promise<number[]> {
    const stateTensor = tf.tensor2d([state]);
    const actionTensor = this.model.predict(stateTensor) as tf.Tensor;
    
    const loss = tf.tidy(() => {
      const targetQ = reward + this.gamma * tf.max(actionTensor);
      return tf.losses.meanSquaredError(targetQ, actionTensor);
    });

    const grads = tf.variableGrads(() => loss);
    this.optimizer.applyGradients(grads.grads);

    tf.dispose([stateTensor, actionTensor, loss, grads]);

    // Epsilon-greedy exploration
    if (Math.random() < this.epsilon) {
      return Array(200).fill(0).map(() => Math.random() * 2 - 1);
    } else {
      return Array.from(actionTensor.dataSync());
    }
  }
}

export const reinforcementLearning = new ReinforcementLearning();