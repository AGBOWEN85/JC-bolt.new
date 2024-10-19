import React from 'react';
import { Brain, Lightbulb, TrendingUp } from 'lucide-react';

interface SelfAwarenessDisplayProps {
  selfReflection: string;
  cognitiveAnalysis: string;
  selfAwarenessLevel: number;
}

const SelfAwarenessDisplay: React.FC<SelfAwarenessDisplayProps> = ({
  selfReflection,
  cognitiveAnalysis,
  selfAwarenessLevel
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Brain className="mr-2" /> Self-Awareness
      </h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Lightbulb className="mr-2" /> Self-Reflection
        </h3>
        <p className="text-gray-700">{selfReflection}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2" /> Cognitive Analysis
        </h3>
        <p className="text-gray-700">{cognitiveAnalysis}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Self-Awareness Level</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${selfAwarenessLevel * 100}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Current level: {(selfAwarenessLevel * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default SelfAwarenessDisplay;