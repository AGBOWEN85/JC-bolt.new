import { KnowledgeBaseEntry } from '../types';
import { getCachedData, setCachedData } from '../utils/cache';
import { logError } from '../utils/errorHandling';

export class KnowledgeBaseService {
  private knowledgeBase: KnowledgeBaseEntry[] = [];

  async initialize(): Promise<void> {
    try {
      const cachedData = getCachedData<KnowledgeBaseEntry[]>('knowledgeBase');
      if (cachedData) {
        this.knowledgeBase = cachedData;
      } else {
        // In a real-world scenario, this would fetch data from an API or database
        this.knowledgeBase = [
          { id: '1', domain: 'programming', description: 'Various programming languages, frameworks, and development tools', keywords: ['coding', 'software', 'development'] },
          { id: '2', domain: 'web development', description: 'Technologies and best practices for building web applications', keywords: ['frontend', 'backend', 'fullstack'] },
          { id: '3', domain: 'artificial intelligence', description: 'Concepts and applications of AI and machine learning', keywords: ['machine learning', 'neural networks', 'deep learning'] },
          { id: '4', domain: 'data science', description: 'Techniques for analyzing and interpreting complex data', keywords: ['statistics', 'big data', 'analytics'] },
          { id: '5', domain: 'business strategy', description: 'Approaches to business planning and management', keywords: ['management', 'leadership', 'entrepreneurship'] },
          { id: '6', domain: 'project management', description: 'Methods for organizing and overseeing projects', keywords: ['agile', 'scrum', 'waterfall'] },
          { id: '7', domain: 'cybersecurity', description: 'Practices for protecting systems and data from threats', keywords: ['security', 'hacking', 'encryption'] },
          { id: '8', domain: 'cloud computing', description: 'Services and architectures for cloud-based solutions', keywords: ['aws', 'azure', 'google cloud'] },
          { id: '9', domain: 'mobile development', description: 'Building applications for iOS and Android platforms', keywords: ['ios', 'android', 'react native'] },
          { id: '10', domain: 'blockchain', description: 'Distributed ledger technology and its applications', keywords: ['cryptocurrency', 'smart contracts', 'decentralization'] },
        ];
        setCachedData('knowledgeBase', this.knowledgeBase);
      }
    } catch (error) {
      logError(error as Error, { context: 'KnowledgeBaseService.initialize' });
      throw new Error('Failed to initialize knowledge base');
    }
  }

  async getAll(): Promise<KnowledgeBaseEntry[]> {
    return this.knowledgeBase;
  }

  async getById(id: string): Promise<KnowledgeBaseEntry | undefined> {
    return this.knowledgeBase.find(entry => entry.id === id);
  }

  async search(query: string): Promise<KnowledgeBaseEntry[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.knowledgeBase.filter(entry =>
      entry.domain.toLowerCase().includes(lowercaseQuery) ||
      entry.description.toLowerCase().includes(lowercaseQuery) ||
      entry.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
    );
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();