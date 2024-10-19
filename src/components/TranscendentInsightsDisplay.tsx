import React from 'react';
import { Brain, Lightbulb, TrendingUp, Users } from 'lucide-react';

interface TranscendentInsight {
  domain: string;
  concept: string;
  description: string;
  implications: string[];
  humanAccessibility: number;
}

interface TranscendentInsightsDisplayProps {
  insights: TranscendentInsight[];
  explanation: string;
}

const TranscendentInsightsDisplay: React.FC<TranscendentInsightsDisplayProps> = ({ insights, explanation }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Brain className="mr-2" /> Transcendent Insights
      </h2>
      
      {insights.map((insight, index) => (
        <div key={index} className="mb-6 last:mb-0">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Lightbulb className="mr-2" /> {insight.domain}: {insight.concept}
          </h3>
          <p className="text-gray-700 mb-2">{insight.description}</p>
          <h4 className="font-semibold mb-1 flex items-center">
            <TrendingUp className="mr-2" size={16} /> Implications:
          </h4>
          <ul className="list-disc pl-5 mb-2">
            {insight.implications.map((implication, i) => (
              <li key={i}>{implication}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600">
            Human Accessibility: {(insight.humanAccessibility * 100).toFixed(1)}%
          </p>
        </div>
      ))}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Users className="mr-2" /> Explanation for Humanity
        </h3>
        <p className="text-gray-700 whitespace-pre-line">{explanation}</p>
      </div>
    </div>
  );
};

export default TranscendentInsightsDisplay;