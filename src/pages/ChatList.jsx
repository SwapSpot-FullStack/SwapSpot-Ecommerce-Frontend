import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

// Component to display a list of chat conversations
function ChatList() {
  // State to store mock chat data
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Mock data to simulate chat messages
    const mockChats = [
      {
        _id: "1",
        user: "Sarah",
        avatar: "👩", // User avatar
        lastMessage: "Is this still available?", // Last message in chat
        timestamp: "2h ago", // Time of the last message
      },
      {
        _id: "2",
        user: "Alex",
        avatar: "🧑🏼‍💻",
        lastMessage: "I'll pick it up today",
        timestamp: "5h ago",
      },
      {
        _id: "3",
        user: "John",
        avatar: "🧔🏽",
        lastMessage: "Thanks mate!",
        timestamp: "1d ago",
      },
      {
        id: 4,
        user: "Bartholomew",
        avatar: "🧑‍🎨",
        lastMessage: "Oui, très chaud!.",
        time: "3d ago",
      },
    ];

    // Set the mock data to the state
    setChats(mockChats);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <main className="chat-list-wrapper">
      <div className="chat-glass-container">
        <h2 className="dashboard-title">Messages</h2> {/* Page heading */}
        <div className="chat-list-container">
          {/* Map through chats and render each chat card */}
          {chats.map((chat) => (
            <Link
              to={`/chat/${chat._id}`} // Link to the individual chat page
              className="chat-card"
              key={chat._id} // Use unique chat ID as key
              state={{ user: chat.user, avatar: chat.avatar }} // Pass user info as state
            >
              <div className="chat-avatar">
                {/* Display user avatar, default to FaUserCircle icon if not available */}
                {chat.avatar || <FaUserCircle />}
              </div>
              <div className="chat-info">
                <div className="chat-top">
                  <strong>{chat.user}</strong> {/* User's name */}
                  <span className="chat-time">{chat.timestamp}</span>{" "}
                  {/* Time of the last message */}
                </div>
                <p className="chat-snippet">{chat.lastMessage}</p>{" "}
                {/* Last message snippet */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ChatList;
