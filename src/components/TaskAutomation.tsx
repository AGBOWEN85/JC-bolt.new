import React, { useContext } from 'react';
import { JCContext } from '../context/JCContext';

const TaskAutomation: React.FC = () => {
  const { automatedTasks } = useContext(JCContext);

  return (
    <ul className="space-y-3">
      {automatedTasks.map((task, index) => (
        <li key={index} className="bg-gray-50 p-3 rounded-lg">
          <span className="font-semibold text-green-600">{task.name}</span>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default TaskAutomation;