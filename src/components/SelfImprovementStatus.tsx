import React from 'react';
import { RefreshCw } from 'lucide-react';

interface SelfImprovementStatusProps {
  improvements: string[];
}

const SelfImprovementStatus: React.FC<SelfImprovementStatusProps> = ({ improvements }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <RefreshCw className="mr-2" /> Self-Improvement Status
      </h2>
      {improvements.length > 0 ? (
        <ul className="list-disc pl-5">
          {improvements.map((improvement, index) => (
            <li key={index} className="mb-2">{improvement}</li>
          ))}
        </ul>
      ) : (
        <p>No current self-improvement tasks.</p>
      )}
    </div>
  );
};

export default SelfImprovementStatus;