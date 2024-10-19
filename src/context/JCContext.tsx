import { createContext } from 'react';
import { Message, KnowledgeBaseEntry, AutomatedTask } from '../types';

export interface JCContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  knowledgeBase: KnowledgeBaseEntry[];
  setKnowledgeBase: React.Dispatch<React.SetStateAction<KnowledgeBaseEntry[]>>;
  automatedTasks: AutomatedTask[];
  setAutomatedTasks: React.Dispatch<React.SetStateAction<AutomatedTask[]>>;
}

export const JCContext = createContext<JCContextType>({
  messages: [],
  setMessages: () => {},
  knowledgeBase: [],
  setKnowledgeBase: () => {},
  automatedTasks: [],
  setAutomatedTasks: () => {},
});