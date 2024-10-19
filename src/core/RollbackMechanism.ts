import { logError } from '../utils/errorHandling';
import { knowledgeGraph } from './KnowledgeGraph';
import { adaptiveLearning } from '../utils/adaptiveLearning';

interface SystemState {
  timestamp: number;
  knowledgeGraphState: any;
  modelState: any;
}

class RollbackMechanism {
  private states: SystemState[] = [];
  private maxStates: number = 10;

  async saveCurrentState(): Promise<void> {
    try {
      const currentState: SystemState = {
        timestamp: Date.now(),
        knowledgeGraphState: await knowledgeGraph.exportState(),
        modelState: await adaptiveLearning.exportModelState()
      };

      this.states.push(currentState);
      if (this.states.length > this.maxStates) {
        this.states.shift();
      }
    } catch (error) {
      logError(error as Error, { context: 'RollbackMechanism.saveCurrentState' });
    }
  }

  async rollbackToPreviousState(): Promise<boolean> {
    if (this.states.length < 2) {
      console.log('Not enough states to rollback');
      return false;
    }

    try {
      const previousState = this.states[this.states.length - 2];
      await knowledgeGraph.importState(previousState.knowledgeGraphState);
      await adaptiveLearning.importModelState(previousState.modelState);

      this.states.pop(); // Remove the current state
      console.log(`Rolled back to state from ${new Date(previousState.timestamp).toISOString()}`);
      return true;
    } catch (error) {
      logError(error as Error, { context: 'RollbackMechanism.rollbackToPreviousState' });
      return false;
    }
  }

  async rollbackToSpecificTimestamp(timestamp: number): Promise<boolean> {
    const targetState = this.states.find(state => state.timestamp <= timestamp);
    if (!targetState) {
      console.log('No suitable state found for the specified timestamp');
      return false;
    }

    try {
      await knowledgeGraph.importState(targetState.knowledgeGraphState);
      await adaptiveLearning.importModelState(targetState.modelState);

      this.states = this.states.slice(0, this.states.indexOf(targetState) + 1);
      console.log(`Rolled back to state from ${new Date(targetState.timestamp).toISOString()}`);
      return true;
    } catch (error) {
      logError(error as Error, { context: 'RollbackMechanism.rollbackToSpecificTimestamp' });
      return false;
    }
  }
}

export const rollbackMechanism = new RollbackMechanism();