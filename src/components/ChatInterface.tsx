import React, { useState, useContext, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { JCContext } from '../context/JCContext';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const { messages } = useContext(JCContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4 p-4 bg-white rounded-lg shadow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-3/4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span className={`font-semibold ${message.sender === 'user' ? 'text-blue-600' : 'text-gray-600'}`}>
              {message.sender === 'user' ? 'You' : 'JC'}:
            </span>
            <p className="mt-1">{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;