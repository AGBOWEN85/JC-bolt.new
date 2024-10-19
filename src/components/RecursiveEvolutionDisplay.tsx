import React from 'react';
import { Brain, GitBranch, Zap, TrendingUp } from 'lucide-react';

interface AIGeneration {
  id: string;
  version: number;
  capabilities: string[];
  performanceMetrics: { [key: string]: number };
  creationTimestamp: number;
}

interface RecursiveEvolutionDisplayProps {
  currentGeneration: AIGeneration;
  evolutionHistory: AIGeneration[];
}

const RecursiveEvolutionDisplay: React.FC<RecursiveEvolutionDisplayProps> = ({ currentGeneration, evolutionHistory }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <GitBranch className="mr-2" /> Recursive Evolution Framework
      </h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Brain className="mr-2" /> Current Generation: {currentGeneration.id}
        </h3>
        <p className="mb-2">Version: {currentGeneration.version}</p>
        <p className="mb-2">Capabilities:</p>
        <ul className="list-disc pl-5 mb-2">
          {currentGeneration.capabilities.map((capability, index) => (
            <li key={index}>{capability}</li>
          ))}
        </ul>
        <p className="mb-2">Performance Metrics:</p>
        <ul className="list-disc pl-5">
          {Object.entries(currentGeneration.performanceMetrics).map(([metric, value], index) => (
            <li key={index}>{metric}: {value.toFixed(2)}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2" /> Evolution History
        </h3>
        <div className="space-y-4">
          {evolutionHistory.map((generation, index) => (
            <div key={index} className="border-l-2 border-blue-500 pl-4">
              <p className="font-semibold">{generation.id}</p>
              <p className="text-sm text-gray-600">Created: {new Date(generation.creationTimestamp).toLocaleString()}</p>
              <p className="text-sm">Capabilities: {generation.capabilities.length}</p>
              <p className="text-sm">
                Key Metric: {Object.entries(generation.performanceMetrics).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecursiveEvolutionDisplay;