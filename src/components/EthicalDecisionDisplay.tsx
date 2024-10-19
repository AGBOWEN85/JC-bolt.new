import React from 'react';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';

interface EthicalDecisionDisplayProps {
  decision: {
    decision: string;
    reasoning: string;
    ethicalImplications: string[];
    confidenceScore: number;
    multiverseAnalysis: {
      divergentOutcomes: string[];
      ethicalRisks: string[];
      potentialBenefits: string[];
    };
  };
}

const EthicalDecisionDisplay: React.FC<EthicalDecisionDisplayProps> = ({ decision }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Activity className="mr-2" /> Ethical Decision Analysis
      </h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <CheckCircle className="mr-2 text-green-500" /> Decision
        </h3>
        <p className="text-lg">{decision.decision}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Reasoning</h3>
        <p>{decision.reasoning}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Ethical Implications</h3>
        <ul className="list-disc pl-5">
          {decision.ethicalImplications.map((implication, index) => (
            <li key={index}>{implication}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Confidence Score</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${decision.confidenceScore * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {(decision.confidenceScore * 100).toFixed(1)}% confident
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-500" /> Multiverse Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Divergent Outcomes</h4>
            <ul className="list-disc pl-5">
              {decision.multiverseAnalysis.divergentOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Ethical Risks</h4>
            <ul className="list-disc pl-5">
              {decision.multiverseAnalysis.ethicalRisks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Potential Benefits</h4>
            <ul className="list-disc pl-5">
              {decision.multiverseAnalysis.potentialBenefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicalDecisionDisplay;