import React from 'react';
import { User, Brain, Heart, Activity, Fingerprint, Globe } from 'lucide-react';

interface HumanModel {
  thoughts: string[];
  emotions: { type: string; intensity: number }[];
  behaviors: string[];
  personalityTraits: { [trait: string]: number };
  culturalContext: { [factor: string]: string };
}

interface HumanUnderstandingDisplayProps {
  humanModel: HumanModel;
  empathicResponse: string;
  creativePotential: string;
  personalGrowthPlan: string;
}

const HumanUnderstandingDisplay: React.FC<HumanUnderstandingDisplayProps> = ({
  humanModel,
  empathicResponse,
  creativePotential,
  personalGrowthPlan
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <User className="mr-2" /> Human Understanding AI
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Brain className="mr-2" /> Thoughts
          </h3>
          <ul className="list-disc pl-5">
            {humanModel.thoughts.map((thought, index) => (
              <li key={index}>{thought}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Heart className="mr-2" /> Emotions
          </h3>
          <ul className="list-disc pl-5">
            {humanModel.emotions.map((emotion, index) => (
              <li key={index}>{emotion.type}: {emotion.intensity.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Activity className="mr-2" /> Behaviors
          </h3>
          <ul className="list-disc pl-5">
            {humanModel.behaviors.map((behavior, index) => (
              <li key={index}>{behavior}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Fingerprint className="mr-2" /> Personality Traits
          </h3>
          <ul className="list-disc pl-5">
            {Object.entries(humanModel.personalityTraits).map(([trait, value], index) => (
              <li key={index}>{trait}: {value.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Globe className="mr-2" /> Cultural Context
        </h3>
        <ul className="list-disc pl-5">
          {Object.entries(humanModel.culturalContext).map(([factor, value], index) => (
            <li key={index}>{factor}: {value}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Empathic Response</h3>
        <p className="text-gray-700">{empathicResponse}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Creative Potential</h3>
        <p className="text-gray-700">{creativePotential}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Personal Growth Plan</h3>
        <p className="text-gray-700">{personalGrowthPlan}</p>
      </div>
    </div>
  );
};

export default HumanUnderstandingDisplay;