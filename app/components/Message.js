const Message = ({ text, isUser }) => (
  <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
    <div
      className={`max-w-xs p-3 rounded-lg shadow-md ${
        isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {text}
    </div>
  </div>
);

export default Message;
