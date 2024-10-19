import React from 'react';
import { Brain, GitCommit, Hash } from 'lucide-react';

interface ComplexityMeasuresDisplayProps {
  measures: {
    kolmogorovComplexity: number;
    fractalDimension: number;
    informationEntropy: number;
  };
}

const ComplexityMeasuresDisplay: React.FC<ComplexityMeasuresDisplayProps> = ({ measures }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Brain className="mr-2" /> Complexity Measures
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Hash className="mr-2" /> Kolmogorov Complexity
          </h3>
          <p className="text-3xl font-bold">{measures.kolmogorovComplexity.toFixed(4)}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitCommit className="mr-2" /> Fractal Dimension
          </h3>
          <p className="text-3xl font-bold">{measures.fractalDimension.toFixed(4)}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Brain className="mr-2" /> Information Entropy
          </h3>
          <p className="text-3xl font-bold">{measures.informationEntropy.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
};

export default ComplexityMeasuresDisplay;