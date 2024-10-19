import { logError } from '../utils/errorHandling';
import { advancedLanguageModel } from './AdvancedLanguageModel';
import { knowledgeGraph } from './KnowledgeGraph';
import { problemSolvingFramework } from './ProblemSolvingFramework';

interface Agent {
  id: string;
  specialization: string;
  processInput: (input: string) => Promise<string>;
}

class MultiAgentSystem {
  private agents: Agent[] = [];

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents() {
    this.agents = [
      {
        id: 'analytical',
        specialization: 'Analytical Reasoning',
        processInput: this.createAgentProcessor('analytical')
      },
      {
        id: 'creative',
        specialization: 'Creative Problem Solving',
        processInput: this.createAgentProcessor('creative')
      },
      {
        id: 'critical',
        specialization: 'Critical Thinking',
        processInput: this.createAgentProcessor('critical')
      },
      {
        id: 'systems',
        specialization: 'Systems Thinking',
        processInput: this.createAgentProcessor('systems')
      },
      {
        id: 'ethical',
        specialization: 'Ethical Considerations',
        processInput: this.createAgentProcessor('ethical')
      }
    ];
  }

  private createAgentProcessor(specialization: string): (input: string) => Promise<string> {
    return async (input: string) => {
      const prompt = `As an AI agent specialized in ${specialization}, analyze and respond to the following input:
        
        Input: ${input}
        
        Provide a response that leverages your ${specialization} expertise.`;
      
      return await advancedLanguageModel.generateText(prompt, true);
    };
  }

  async processInput(input: string): Promise<string> {
    try {
      const approach = await problemSolvingFramework.identifyApproach(input, {});
      const relevantAgents = this.selectRelevantAgents(approach);
      const agentResponses = await Promise.all(relevantAgents.map(agent => agent.processInput(input)));
      
      const combinedResponse = this.combineAgentResponses(agentResponses, approach);
      return combinedResponse;
    } catch (error) {
      logError(error as Error, { context: 'MultiAgentSystem.processInput' });
      return "An error occurred while processing your input across multiple agents.";
    }
  }

  private selectRelevantAgents(approach: string): Agent[] {
    const approachAgentMap: { [key: string]: string[] } = {
      'analytical': ['analytical', 'critical', 'ethical'],
      'creative': ['creative', 'systems', 'ethical'],
      'critical': ['critical', 'analytical', 'ethical'],
      'systems': ['systems', 'analytical', 'ethical'],
      'design': ['creative', 'systems', 'ethical'],
      'strategic': ['analytical', 'systems', 'ethical'],
      'collaborative': ['creative', 'systems', 'ethical']
    };

    const relevantAgentIds = approachAgentMap[approach] || ['analytical', 'creative', 'ethical'];
    return this.agents.filter(agent => relevantAgentIds.includes(agent.id));
  }

  private async combineAgentResponses(responses: string[], approach: string): Promise<string> {
    const combinedResponse = responses.join('\n\n');
    const prompt = `Combine and synthesize the following agent responses into a coherent and comprehensive answer, focusing on a ${approach} approach:
      
      ${combinedResponse}
      
      Provide a unified response that incorporates insights from all relevant agents.`;
    
    return await advancedLanguageModel.generateText(prompt, true);
  }
}

export const multiAgentSystem = new MultiAgentSystem();