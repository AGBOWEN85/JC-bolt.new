import { logError } from '../utils/errorHandling';
import { knowledgeGraph } from '../core/KnowledgeGraph';

interface Contribution {
  userId: string;
  concept: string;
  description: string;
  timestamp: number;
}

interface ModerationStatus {
  approved: boolean;
  moderatorId: string;
  timestamp: number;
}

class CollaborativeKnowledgeService {
  private contributions: Contribution[] = [];
  private moderationQueue: Map<string, ModerationStatus> = new Map();

  async addContribution(userId: string, concept: string, description: string): Promise<void> {
    try {
      const contribution: Contribution = {
        userId,
        concept,
        description,
        timestamp: Date.now()
      };
      this.contributions.push(contribution);
      await this.queueForModeration(contribution);
    } catch (error) {
      logError(error as Error, { context: 'CollaborativeKnowledgeService.addContribution', userId, concept });
    }
  }

  private async queueForModeration(contribution: Contribution): Promise<void> {
    const key = `${contribution.userId}-${contribution.concept}-${contribution.timestamp}`;
    this.moderationQueue.set(key, {
      approved: false,
      moderatorId: '',
      timestamp: 0
    });
  }

  async moderateContribution(moderatorId: string, contributionKey: string, approved: boolean): Promise<void> {
    try {
      const status = this.moderationQueue.get(contributionKey);
      if (status) {
        status.approved = approved;
        status.moderatorId = moderatorId;
        status.timestamp = Date.now();

        if (approved) {
          const [userId, concept, timestamp] = contributionKey.split('-');
          const contribution = this.contributions.find(c => 
            c.userId === userId && c.concept === concept && c.timestamp === parseInt(timestamp)
          );
          if (contribution) {
            await knowledgeGraph.addConcept(contribution.concept, {
              description: contribution.description,
              contributedBy: contribution.userId
            });
          }
        }
      }
    } catch (error) {
      logError(error as Error, { context: 'CollaborativeKnowledgeService.moderateContribution', moderatorId, contributionKey });
    }
  }

  async getContributionsForModeration(): Promise<Contribution[]> {
    return this.contributions.filter(contribution => {
      const key = `${contribution.userId}-${contribution.concept}-${contribution.timestamp}`;
      const status = this.moderationQueue.get(key);
      return status && !status.approved;
    });
  }

  async getUserContributions(userId: string): Promise<Contribution[]> {
    return this.contributions.filter(contribution => contribution.userId === userId);
  }
}

export const collaborativeKnowledgeService = new CollaborativeKnowledgeService();