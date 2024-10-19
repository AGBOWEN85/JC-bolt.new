import React from 'react';

interface AdvancedTestResultsProps {
  score: number;
  details: string[];
}

const AdvancedTestResults: React.FC<AdvancedTestResultsProps> = ({ score, details }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Advanced Test Results</h2>
      <div className="mb-4">
        <span className="text-xl font-semibold">Total Score: </span>
        <span className="text-2xl font-bold text-blue-600">{score}/100</span>
      </div>
      <ul className="list-disc pl-5">
        {details.map((detail, index) => (
          <li key={index} className="mb-2">{detail}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedTestResults;