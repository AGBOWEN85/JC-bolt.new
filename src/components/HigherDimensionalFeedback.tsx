import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';

interface HigherDimensionalFeedbackProps {
  onFeedbackSubmit: (rating: number, comment: string) => void;
}

const HigherDimensionalFeedback: React.FC<HigherDimensionalFeedbackProps> = ({ onFeedbackSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = () => {
    onFeedbackSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Feedback on Higher-Dimensional Analysis</h3>
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            size={24}
            className={`cursor-pointer ${value <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRating(value)}
          />
        ))}
      </div>
      <div className="mb-2">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Your comments on the analysis..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default HigherDimensionalFeedback;