import { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaStop } from "react-icons/fa";

const ChatInput = ({
  inputValue,
  setInputValue,
  onSendMessage,
  setResponse,
}) => {
  const [loading, setLoading] = useState(false); // Track the loading state

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setLoading(true); // Set loading to true when message is being sent
      try {
        const response = await onSendMessage(inputValue); // Send the message and get the response

        // Log the response to debug the structure
        // console.log("Response from API:", response);

        // Ensure response is valid before accessing its properties
        if (response && response.AI) {
          setResponse(response.AI); // Set only the AI response in the state
        } else {
          console.log("Error: Invalid response format");
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
      setLoading(false); // Set loading to false once response is received
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
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <FaStop className="text-black text-xl   cursor-not-allowed" /> // Black stop icon with red border, and disabled cursor
        ) : (
          <RiSendPlaneFill className="text-white text-xl" /> // Show send icon
        )}
      </button>
    </form>
  );
};

export default ChatInput;
