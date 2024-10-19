import React from 'react';
import { Cpu, Users, Leaf, Zap, AlertTriangle, TrendingUp, Lightbulb, Cog, BarChart2, RefreshCw } from 'lucide-react';

interface SystemRedesignDisplayProps {
  redesign: {
    system: string;
    systemAnalysis: string;
    creativeInsight: string;
    longTermPrediction: string;
    ethicalConsiderations: string;
    technologyBlueprint: string;
    socialSystemDesign: string;
    environmentalPlan: string;
    systemRedesign: string;
    implementationStrategy: string;
  };
}

const SystemRedesignDisplay: React.FC<SystemRedesignDisplayProps> = ({ redesign }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <RefreshCw className="mr-2" /> System Redesign: {redesign.system}
      </h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <BarChart2 className="mr-2" /> Current System Analysis
        </h3>
        <p className="text-gray-700">{redesign.systemAnalysis}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Lightbulb className="mr-2" /> Creative Insight
        </h3>
        <p className="text-gray-700">{redesign.creativeInsight}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2" /> Long-Term Prediction
        </h3>
        <p className="text-gray-700">{redesign.longTermPrediction}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <AlertTriangle className="mr-2" /> Ethical Considerations
        </h3>
        <p className="text-gray-700">{redesign.ethicalConsiderations}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Cpu className="mr-2" /> Technology Blueprint
        </h3>
        <p className="text-gray-700">{redesign.technologyBlueprint}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Users className="mr-2" /> Social System Design
        </h3>
        <p className="text-gray-700">{redesign.socialSystemDesign}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Leaf className="mr-2" /> Environmental Plan
        </h3>
        <p className="text-gray-700">{redesign.environmentalPlan}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <RefreshCw className="mr-2" /> System Redesign
        </h3>
        <p className="text-gray-700">{redesign.systemRedesign}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Cog className="mr-2" /> Implementation Strategy
        </h3>
        <p className="text-gray-700">{redesign.implementationStrategy}</p>
      </div>
    </div>
  );
};

export default SystemRedesignDisplay;