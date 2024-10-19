import React from 'react';
import { Brain, Zap, Globe } from 'lucide-react';

interface OmniLearnInsightsProps {
  insights: string[];
}

const OmniLearnInsights: React.FC<OmniLearnInsightsProps> = ({ insights }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Brain className="mr-2" /> OmniLearn Insights
      </h2>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start">
            {index % 2 === 0 ? (
              <Zap className="mr-2 mt-1 flex-shrink-0 text-yellow-500" />
            ) : (
              <Globe className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
            )}
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OmniLearnInsights;