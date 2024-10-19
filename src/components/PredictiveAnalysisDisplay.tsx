import React from 'react';
import { TrendingUp, Clock } from 'lucide-react';

interface Prediction {
  domain: string;
  shortTerm: string;
  mediumTerm: string;
  longTerm: string;
  confidence: number;
}

interface PredictiveAnalysisDisplayProps {
  predictions: Prediction[];
}

const PredictiveAnalysisDisplay: React.FC<PredictiveAnalysisDisplayProps> = ({ predictions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <TrendingUp className="mr-2" /> Predictive Analysis
      </h2>
      {predictions.map((prediction, index) => (
        <div key={index} className="mb-6 last:mb-0">
          <h3 className="text-xl font-semibold mb-2">{prediction.domain}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-1 flex items-center">
                <Clock className="mr-1" size={16} /> Short-term
              </h4>
              <p className="text-sm">{prediction.shortTerm}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 flex items-center">
                <Clock className="mr-1" size={16} /> Medium-term
              </h4>
              <p className="text-sm">{prediction.mediumTerm}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 flex items-center">
                <Clock className="mr-1" size={16} /> Long-term
              </h4>
              <p className="text-sm">{prediction.longTerm}</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-semibold">Confidence: </span>
            <span className="text-sm">{(prediction.confidence * 100).toFixed(2)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PredictiveAnalysisDisplay;