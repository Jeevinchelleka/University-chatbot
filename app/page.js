"use client";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import SuggestionBox from "./components/SuggestionBox";
import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const renderMessageText = (text) => {
    return text.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index}>
            <strong>{line.replace(/\*\*/g, "")}</strong>
          </p>
        );
      }

      if (line.trim().startsWith("* ")) {
        return (
          <li key={index} className="list-disc ml-5">
            {line.replace("* ", "").trim()}
          </li>
        );
      }

      return <p key={index}>{line}</p>;
    });
  };

  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);
    setInputValue("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.AI || "No AI response" },
      ]);
    } catch (error) {
      console.error("API error:", error);
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
      <div className="flex flex-col md:flex-row h-full">
        {/* Chat Section */}
        <div className="w-full md:w-8/12 flex flex-col bg-gray-100">
          <ChatContainer messages={messages} />
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Suggestion Section */}
        <div className="w-full md:w-4/12 bg-slate-800 text-white p-4 md:block hidden">
          <SuggestionBox
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
    </div>
  );
}
