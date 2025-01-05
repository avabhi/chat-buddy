"use client";
import { useState } from "react";

export default function ChatPage() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputValue }),
    });

    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.choices[0]?.delta?.content || ""]);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };
  };

  console.log("Rendering ChatPage", messages);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div className=" mt-[20px]">
        {messages.map((msg, index) => (
          <span key={index} className="chat-message">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
