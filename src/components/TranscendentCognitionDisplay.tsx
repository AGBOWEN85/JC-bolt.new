import React from 'react';
import { Brain, Zap, Cube, Network, Clock, Globe } from 'lucide-react';

interface TranscendentCognitionDisplayProps {
  output: {
    multidimensionalInsight: string;
    quantumProbabilityField: number[];
    abstractConceptualFramework: any;
    multiversalImplications: any;
    temporalResonancePatterns: any;
    consciousnessManifold: any;
  };
}

const TranscendentCognitionDisplay: React.FC<TranscendentCognitionDisplayProps> = ({ output }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Brain className="mr-2" /> Transcendent Cognition Output
      </h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Cube className="mr-2" /> Multidimensional Insight
        </h3>
        <p className="text-gray-700">{output.multidimensionalInsight}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Zap className="mr-2" /> Quantum Probability Field
        </h3>
        <div className="h-20 flex items-end">
          {output.quantumProbabilityField.map((prob, index) => (
            <div
              key={index}
              className="w-2 bg-blue-500 mr-1"
              style={{ height: `${prob * 100}%` }}
              title={`State ${index}: ${prob.toFixed(4)}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Network className="mr-2" /> Abstract Conceptual Framework
        </h3>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
          {JSON.stringify(output.abstractConceptualFramework, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Globe className="mr-2" /> Multiversal Implications
        </h3>
        <ul className="list-disc pl-5">
          {output.multiversalImplications.commonalities.universalPrinciples.map((principle: string, index: number) => (
            <li key={index}>{principle}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Clock className="mr-2" /> Temporal Resonance Patterns
        </h3>
        <ul className="list-disc pl-5">
          {output.temporalResonancePatterns.resonances.map((resonance: any, index: number) => (
            <li key={index}>
              Pattern {resonance.pattern1} and Pattern {resonance.pattern2}: Strength {resonance.strength.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Brain className="mr-2" /> Consciousness Manifold
        </h3>
        <p>Dimensionality: {output.consciousnessManifold.dimensionality}</p>
        <p>Curvature: {output.consciousnessManifold.curvature.toFixed(4)}</p>
        <p>Estimated Complexity: {output.consciousnessManifold.globalProperties.estimatedComplexity.toFixed(4)}</p>
      </div>
    </div>
  );
};

export default TranscendentCognitionDisplay;