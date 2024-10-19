import { Complex } from 'complex.js';

interface QuantumNode {
  id: string;
  state: Complex;
}

interface QuantumEdge {
  source: string;
  target: string;
  weight: Complex;
}

class QuantumKnowledgeGraph {
  private nodes: Map<string, QuantumNode>;
  private edges: QuantumEdge[];

  constructor() {
    this.nodes = new Map();
    this.edges = [];
  }

  addNode(id: string, state: Complex): void {
    this.nodes.set(id, { id, state });
  }

  addEdge(source: string, target: string, weight: Complex): void {
    this.edges.push({ source, target, weight });
  }

  getEntangledNodes(nodeId: string): QuantumNode[] {
    const entangledNodes: QuantumNode[] = [];
    for (const edge of this.edges) {
      if (edge.source === nodeId) {
        const targetNode = this.nodes.get(edge.target);
        if (targetNode) {
          entangledNodes.push(targetNode);
        }
      }
    }
    return entangledNodes;
  }

  applyQuantumOperation(nodeId: string, operation: (state: Complex) => Complex): void {
    const node = this.nodes.get(nodeId);
    if (node) {
      node.state = operation(node.state);
      const entangledNodes = this.getEntangledNodes(nodeId);
      for (const entangledNode of entangledNodes) {
        entangledNode.state = operation(entangledNode.state);
      }
    }
  }
}

export const quantumKnowledgeGraph = new QuantumKnowledgeGraph();