import React from 'react';
import { Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';

interface CreativeInsightDisplayProps {
  insight: {
    creativeLeap: string;
    ethicalImplications: string;
    societalImpact: string;
  };
}

const CreativeInsightDisplay: React.FC<CreativeInsightDisplayProps> = ({ insight }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Lightbulb className="mr-2" /> Creative Insight
      </h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Innovative Idea</h3>
        <p className="text-gray-700">{insight.creativeLeap}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <AlertTriangle className="mr-2" /> Ethical Implications
        </h3>
        <p className="text-gray-700">{insight.ethicalImplications}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2" /> Potential Societal Impact
        </h3>
        <p className="text-gray-700">{insight.societalImpact}</p>
      </div>
    </div>
  );
};

export default CreativeInsightDisplay;