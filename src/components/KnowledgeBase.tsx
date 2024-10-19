import React, { useContext } from 'react';
import { JCContext } from '../context/JCContext';

const KnowledgeBase: React.FC = () => {
  const { knowledgeBase } = useContext(JCContext);

  return (
    <div className="space-y-3">
      {knowledgeBase.map((entry, index) => (
        <div key={index} className="bg-gray-50 p-3 rounded-lg">
          <h3 className="font-semibold text-blue-600 capitalize">{entry.domain}</h3>
          <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KnowledgeBase;