import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// ChatPage component to display a single chat conversation
function ChatPage() {
  // Retrieve state from the location to get user and avatar info
  const { state } = useLocation();
  const { id } = useParams(); // Get chat ID from URL params
  const navigate = useNavigate(); // Navigation hook to go back

  // Fallback values for user and avatar if not available in state
  const username = state?.user || "User";
  const avatar = state?.avatar || "👤";

  // Function to return initial mock messages based on the username
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

  // State for storing the messages in the chat
  const [messages, setMessages] = useState(getInitialMessages(username));

  // State for the input field value
  const [input, setInput] = useState("");

  // Function to handle sending a message
  const sendMessage = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    if (!input.trim()) return; // Don't send empty messages
    // Add the new message to the messages array
    setMessages([...messages, { id: Date.now(), sender: "me", text: input }]);
    setInput(""); // Clear the input field
  };

  return (
    <div className="chat-page">
      {/* Header with back button and user info */}
      <div className="chat-header">
        <button className="back-button" onClick={() => navigate("/chat")}>
          ← {/* Go back to the chat list */}
        </button>
        <div className="chat-user">
          <div className="chat-avatar">{avatar}</div>
          <span className="chat-username">{username}</span>
        </div>
      </div>

      {/* Chat content area */}
      <div className="chat-content">
        {/* Display all messages in the chat */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.sender === "me" ? "me" : "them"}`}
            >
              {/* Display message text, check if it's from 'me' or 'them' */}
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input form for sending a new message */}
        <form className="chat-input" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input} // Bind the input field value to state
            onChange={(e) => setInput(e.target.value)} // Update input state on change
          />
          <button type="submit">Send</button> {/* Send button */}
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
