import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { userFeedback } from '../core/UserFeedback';

interface FeedbackInterfaceProps {
  messageId: string;
  userId: string;
}

const FeedbackInterface: React.FC<FeedbackInterfaceProps> = ({ messageId, userId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const handleRating = (value: number) => {
    setRating(value);
    userFeedback.addFeedback({ userId, messageId, rating: value });
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      userFeedback.addFeedback({ userId, messageId, rating: rating || 3, comment });
      setComment('');
      setIsCommentVisible(false);
    }
  };

  return (
    <div className="mt-2 flex flex-col items-start">
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            size={20}
            className={`cursor-pointer ${value <= (rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => handleRating(value)}
          />
        ))}
        <ThumbsUp
          size={20}
          className="cursor-pointer ml-2 text-green-500"
          onClick={() => handleRating(5)}
        />
        <ThumbsDown
          size={20}
          className="cursor-pointer text-red-500"
          onClick={() => handleRating(1)}
        />
        <MessageSquare
          size={20}
          className="cursor-pointer ml-2 text-blue-500"
          onClick={() => setIsCommentVisible(!isCommentVisible)}
        />
      </div>
      {isCommentVisible && (
        <div className="mt-2 w-full">
          <textarea
            className="w-full p-2 border rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <button
            className="mt-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackInterface;