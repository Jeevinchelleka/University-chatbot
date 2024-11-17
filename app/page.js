"use client";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import SuggestionBox from "./components/SuggestionBox";
import Header from "./components/Header";

export default function Home() {
  const [inputValue, setInputValue] = useState(""); // Manage the input value
  const [messages, setMessages] = useState([]); // Store messages

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]); // Add new message
    setInputValue(""); // Clear input field after sending
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex h-full">
        {/* Chat Section */}
        <div className="w-8/12 flex flex-col bg-gray-100">
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

          {/* ChatInput */}
          <ChatInput
            inputValue={inputValue} // Pass input value
            setInputValue={setInputValue} // Pass the setter to handle typing
            onSendMessage={handleSendMessage} // Pass send message handler
          />
        </div>

        {/* Suggestion Section */}
        <div className="w-4/12 bg-slate-800 text-white p-4">
          {/* SuggestionBox */}
          <SuggestionBox
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
    </div>
  );
}
