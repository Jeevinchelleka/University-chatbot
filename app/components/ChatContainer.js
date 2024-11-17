"use client";
import Message from "./Message";

export default function ChatContainer({ messages }) {
  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Message
              key={index}
              text={msg.text}
              isUser={msg.sender === "user"}
            />
          ))
        ) : (
          <div className="p-4 text-gray-500">Start a conversation...</div>
        )}
      </div>
    </div>
  );
}
