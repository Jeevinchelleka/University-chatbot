"use client";

const ChatInput = ({ inputValue, setInputValue, onSendMessage }) => {
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue); // Send the message when Enter is pressed or button is clicked
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white border-t border-gray-200 p-4 flex-shrink-0"
    >
      <input
        type="text"
        value={inputValue} // Controlled input value
        onChange={handleInputChange} // Handle input change
        placeholder="Type your message..."
        className="w-full p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
