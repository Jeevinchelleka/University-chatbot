"use client";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import SuggestionBox from "./components/SuggestionBox";
import Header from "./components/Header";

export default function Home() {
  const [inputValue, setInputValue] = useState(""); // Manage the input value
  const [messages, setMessages] = useState([]); // Store messages

  // Function to handle sending the message to the backend
  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);
    setInputValue(""); // Clear the input field

    try {
      // Log the message that is being sent to the server
      console.log("Sending message:", message);

      // Make the POST request to the backend
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Response from backend:", data);

      // Check if the "AI" field is available in the response
      if (data.AI) {
        // If "AI" exists, show the response in the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.AI },
        ]);
        console.log("Bot response:", data.AI);
      } else {
        // Handle case if "AI" is missing or empty
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "No AI response" },
        ]);
        console.log("No AI response found in the backend data");
      }
    } catch (error) {
      // If an error occurs, log the error
      console.error("Error during API call:", error.message || error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Something went wrong" },
      ]);
    }
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
                className={`mb-2 p-2 rounded-lg shadow-md ${
                  msg.sender === "bot"
                    ? "bg-blue-100 text-black"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
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
