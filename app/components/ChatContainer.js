"use client";
import Message from "./Message";

const ChatContainer = ({ messages }) => (
  <div className="flex-grow overflow-y-auto p-4">
    {messages.length ? (
      messages.map((msg, i) => (
        <Message key={i} text={msg.text} isUser={msg.sender === "user"} />
      ))
    ) : (
      <div className="p-4 text-gray-500">Start a conversation...</div>
    )}
  </div>
);

export default ChatContainer;
