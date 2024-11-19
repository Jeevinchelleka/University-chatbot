import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const ChatInput = ({ inputValue, setInputValue, onSendMessage }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setLoading(true);
      await onSendMessage(inputValue);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white border-t border-gray-200 p-4"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-3 rounded-lg border shadow-md focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        <RiSendPlaneFill className="text-xl" />
      </button>
    </form>
  );
};

export default ChatInput;
