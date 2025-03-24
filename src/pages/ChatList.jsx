import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function ChatList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const mockChats = [
      {
        _id: "1",
        user: "Sarah",
        avatar: "👩",
        lastMessage: "Is this still available?",
        timestamp: "2h ago",
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

    setChats(mockChats);
  }, []);

  return (
    <main className="chat-list-wrapper">
      <div className="chat-glass-container">
        <h2 className="dashboard-title">Messages</h2>
        <div className="chat-list-container">
          {chats.map((chat) => (
            <Link
              to={`/chat/${chat._id}`}
              className="chat-card"
              key={chat._id}
              state={{ user: chat.user, avatar: chat.avatar }}
            >
              <div className="chat-avatar">
                {chat.avatar || <FaUserCircle />}
              </div>
              <div className="chat-info">
                <div className="chat-top">
                  <strong>{chat.user}</strong>
                  <span className="chat-time">{chat.timestamp}</span>
                </div>
                <p className="chat-snippet">{chat.lastMessage}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ChatList;
