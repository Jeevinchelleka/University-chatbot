"use client";
import { useState } from "react";
import ChatInput from "./ChatInput";

export default function ChatContainer({ inputValue }) {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="mb-2 p-2 bg-blue-100 rounded-lg shadow-md"
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <ChatInput inputValue={inputValue} onSendMessage={handleSendMessage} />
    </div>
  );
}
