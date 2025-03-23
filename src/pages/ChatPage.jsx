import { useState } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "them", text: "Hey, is this still available?" },
    { id: 2, sender: "me", text: "Yep, it is!" },
    { id: 3, sender: "them", text: "Cool, can we meet tomorrow?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "me", text: input }]);
    setInput("");
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <button className="back-button">←</button>
        <div className="chat-user">
          <div className="chat-avatar">👤</div>
          <span className="chat-username">John Doe</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender === "me" ? "me" : "them"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;
