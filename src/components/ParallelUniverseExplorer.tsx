import React, { useState, useEffect } from 'react';
import { higherDimensionalProcessor } from '../core/HigherDimensionalProcessor';
import InteractiveHigherDimensionalVisualization from './InteractiveHigherDimensionalVisualization';

interface ParallelUniverseExplorerProps {
  initialState: number[];
}

const ParallelUniverseExplorer: React.FC<ParallelUniverseExplorerProps> = ({ initialState }) => {
  const [universes, setUniverses] = useState<number[][]>([]);
  const [selectedUniverse, setSelectedUniverse] = useState<number>(0);

  useEffect(() => {
    const generatedUniverses = higherDimensionalProcessor.simulateParallelUniverses(initialState, 5, 100);
    setUniverses(generatedUniverses);
  }, [initialState]);

  const handleUniverseSelect = (index: number) => {
    setSelectedUniverse(index);
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Parallel Universe Explorer</h2>
      <div className="flex mb-4">
        {universes.map((_, index) => (
          <button
            key={index}
            className={`mr-2 px-4 py-2 rounded ${
              index === selectedUniverse ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleUniverseSelect(index)}
          >
            Universe {index + 1}
          </button>
        ))}
      </div>
      {universes.length > 0 && (
        <InteractiveHigherDimensionalVisualization
          data={[universes[selectedUniverse]]}
          title={`Universe ${selectedUniverse + 1}`}
        />
      )}
    </div>
  );
};

export default ParallelUniverseExplorer;