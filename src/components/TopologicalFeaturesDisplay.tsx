import React from 'react';
import { BarChart2, GitBranch, Circle } from 'lucide-react';

interface TopologicalFeaturesDisplayProps {
  features: {
    connectedComponents: number;
    holes: number;
    persistentHomology: number[][];
  };
}

const TopologicalFeaturesDisplay: React.FC<TopologicalFeaturesDisplayProps> = ({ features }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <BarChart2 className="mr-2" /> Topological Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GitBranch className="mr-2" /> Connected Components
          </h3>
          <p className="text-3xl font-bold">{features.connectedComponents}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Circle className="mr-2" /> Holes
          </h3>
          <p className="text-3xl font-bold">{features.holes}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Persistent Homology</h3>
          <div className="h-40 overflow-y-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left">Birth</th>
                  <th className="px-2 py-1 text-left">Death</th>
                </tr>
              </thead>
              <tbody>
                {features.persistentHomology.map(([birth, death], index) => (
                  <tr key={index}>
                    <td className="px-2 py-1">{birth.toFixed(2)}</td>
                    <td className="px-2 py-1">{death.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopologicalFeaturesDisplay;