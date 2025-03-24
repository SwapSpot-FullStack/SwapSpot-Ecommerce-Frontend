import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function ChatPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const username = state?.user || "User";
  const avatar = state?.avatar || "👤";

  const getInitialMessages = (user) => {
    switch (user) {
      case "Sarah":
        return [
          { id: 1, sender: "me", text: "Hey, is this still available?" },
          { id: 2, sender: "them", text: "Yep, it sure is!" },
        ];
      case "Alex":
        return [
          { id: 1, sender: "me", text: "Hey, I want to buy this!" },
          { id: 2, sender: "them", text: "Sure, when are you free?" },
          { id: 3, sender: "me", text: "Tonight works!" },
        ];
      case "John":
        return [
          { id: 1, sender: "me", text: "Thanks for the item!" },
          { id: 2, sender: "them", text: "You're welcome!" },
          { id: 3, sender: "me", text: "Catch you later." },
        ];
      case "Bartholomew":
        return [
          {
            id: 1,
            sender: "me",
            text: "Bonjour! Is the jacket warm enough for Paris?",
          },
          {
            id: 2,
            sender: "them",
            text: "Oui, très chaud!",
          },
        ];
      default:
        return [
          { id: 1, sender: "them", text: "Hey there 👋" },
          { id: 2, sender: "me", text: "Hi!" },
        ];
    }
  };

  const [messages, setMessages] = useState(getInitialMessages(username));
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
        <button className="back-button" onClick={() => navigate("/chat")}>
          ←
        </button>
        <div className="chat-user">
          <div className="chat-avatar">{avatar}</div>
          <span className="chat-username">{username}</span>
        </div>
      </div>

      <div className="chat-content">
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
    </div>
  );
}

export default ChatPage;
