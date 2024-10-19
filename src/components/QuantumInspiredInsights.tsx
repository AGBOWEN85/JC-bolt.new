import React from 'react';
import { Zap, Cpu } from 'lucide-react';

interface QuantumInspiredInsightsProps {
  optimizedSolution: number[];
  parallelResults: string[];
}

const QuantumInspiredInsights: React.FC<QuantumInspiredInsightsProps> = ({ optimizedSolution, parallelResults }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Zap className="mr-2" /> Quantum-Inspired Insights
      </h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Cpu className="mr-2" /> Optimized Solution
        </h3>
        <p className="text-sm bg-gray-100 p-2 rounded">
          {optimizedSolution.join(', ')}
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Parallel Processing Results</h3>
        <ul className="space-y-2">
          {parallelResults.map((result, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              <p className="text-sm">{result}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuantumInspiredInsights;