import React from 'react';
import { Cpu, Users, Leaf, Zap, AlertTriangle, TrendingUp, Lightbulb, Cog } from 'lucide-react';

interface RealityArchitectDisplayProps {
  design: {
    challenge: string;
    creativeInsight: string;
    longTermPrediction: string;
    ethicalConsiderations: string;
    technologyBlueprint: string;
    socialSystemDesign: string;
    environmentalPlan: string;
    implementationStrategy: string;
  };
}

const RealityArchitectDisplay: React.FC<RealityArchitectDisplayProps> = ({ design }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Zap className="mr-2" /> Reality Architect Design
      </h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Challenge</h3>
        <p className="text-gray-700">{design.challenge}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Lightbulb className="mr-2" /> Creative Insight
        </h3>
        <p className="text-gray-700">{design.creativeInsight}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2" /> Long-Term Prediction
        </h3>
        <p className="text-gray-700">{design.longTermPrediction}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <AlertTriangle className="mr-2" /> Ethical Considerations
        </h3>
        <p className="text-gray-700">{design.ethicalConsiderations}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Cpu className="mr-2" /> Technology Blueprint
        </h3>
        <p className="text-gray-700">{design.technologyBlueprint}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Users className="mr-2" /> Social System Design
        </h3>
        <p className="text-gray-700">{design.socialSystemDesign}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Leaf className="mr-2" /> Environmental Plan
        </h3>
        <p className="text-gray-700">{design.environmentalPlan}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Cog className="mr-2" /> Implementation Strategy
        </h3>
        <p className="text-gray-700">{design.implementationStrategy}</p>
      </div>
    </div>
  );
};

export default RealityArchitectDisplay;