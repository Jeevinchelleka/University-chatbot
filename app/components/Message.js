// components/Message.js
import { useEffect, useState } from "react";

const Message = ({ text, isUser }) => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString()); // Only sets on the client
  }, []);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
