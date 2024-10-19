import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Recommendation {
  id: string;
  content: string;
  relevanceScore: number;
  ethicalScore: number;
  valueAlignment: number;
  confidence: number;
}

interface RecommendationDisplayProps {
  recommendations: Recommendation[];
  onFeedback: (id: string, isPositive: boolean) => void;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendations, onFeedback }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
      {recommendations.length > 0 ? (
        <ul className="space-y-2">
          {recommendations.map((rec) => (
            <li key={rec.id} className="bg-white p-3 rounded-lg shadow">
              <p className="text-sm">{rec.content}</p>
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <span>Relevance: {(rec.relevanceScore * 100).toFixed(0)}%</span>
                <span>Ethical Score: {(rec.ethicalScore * 100).toFixed(0)}%</span>
                <span>Value Alignment: {(rec.valueAlignment * 100).toFixed(0)}%</span>
              </div>
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  onClick={() => onFeedback(rec.id, true)}
                  className="p-1 rounded-full hover:bg-green-100"
                >
                  <ThumbsUp size={16} className="text-green-500" />
                </button>
                <button
                  onClick={() => onFeedback(rec.id, false)}
                  className="p-1 rounded-full hover:bg-red-100"
                >
                  <ThumbsDown size={16} className="text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recommendations available.</p>
      )}
    </div>
  );
};

export default RecommendationDisplay;