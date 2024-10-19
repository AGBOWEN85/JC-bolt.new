import React from 'react';
import { Zap, Globe, Clock, Shield } from 'lucide-react';

interface InterdimensionalSolutionDisplayProps {
  solution: string;
}

const InterdimensionalSolutionDisplay: React.FC<InterdimensionalSolutionDisplayProps> = ({ solution }) => {
  const sections = solution.split('\n\n');

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Zap className="mr-2" /> Interdimensional Energy Solution
      </h2>
      {sections.map((section, index) => {
        const [title, ...content] = section.split('\n');
        return (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              {index === 1 && <Globe className="mr-2" />}
              {index === 2 && <Clock className="mr-2" />}
              {index === 3 && <Shield className="mr-2" />}
              {title}
            </h3>
            <ul className="list-disc pl-5">
              {content.map((item, i) => (
                <li key={i} className="mb-1">{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default InterdimensionalSolutionDisplay;