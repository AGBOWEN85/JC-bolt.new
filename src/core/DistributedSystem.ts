import { logError } from '../utils/errorHandling';
import { jcCore } from './JCCore';
import { failSafeSystem } from './FailSafeSystem';
import { monitoringSystem } from '../services/MonitoringSystem';

class DistributedSystem {
  private nodes: string[] = ['node1', 'node2', 'node3']; // Simulated distributed nodes
  private activeNode: string = 'node1';

  async processDistributed(input: string, userId: string): Promise<any> {
    try {
      const result = await this.executeOnNode(this.activeNode, input, userId);
      await monitoringSystem.logNodePerformance(this.activeNode, 'success');
      return result;
    } catch (error) {
      logError(error as Error, { context: 'DistributedSystem.processDistributed', node: this.activeNode });
      await monitoringSystem.logNodePerformance(this.activeNode, 'failure');
      return this.handleNodeFailure(input, userId);
    }
  }

  private async executeOnNode(node: string, input: string, userId: string): Promise<any> {
    // Simulate distributed execution
    return jcCore.processInput(input, userId);
  }

  private async handleNodeFailure(input: string, userId: string): Promise<any> {
    const availableNodes = this.nodes.filter(node => node !== this.activeNode);
    if (availableNodes.length > 0) {
      this.activeNode = availableNodes[0];
      console.log(`Switching to backup node: ${this.activeNode}`);
      return this.processDistributed(input, userId);
    } else {
      throw new Error('All nodes are unavailable');
    }
  }

  async performHealthCheck(): Promise<void> {
    for (const node of this.nodes) {
      try {
        await this.executeOnNode(node, 'health_check', 'system');
        await monitoringSystem.logNodeStatus(node, 'healthy');
      } catch (error) {
        await monitoringSystem.logNodeStatus(node, 'unhealthy');
        if (node === this.activeNode) {
          this.handleNodeFailure('health_check', 'system');
        }
      }
    }
  }
}

export const distributedSystem = new DistributedSystem();