import { useEffect, useState } from "react";
import { useMainContext } from "../../providers/MainProvider";
import { useSocketContext } from "../../providers/SocketProvider";
import { useUserContext } from "../../providers/UserProvider";
import "./Room.css";
import { useNavigate } from "react-router";
import { Message, User } from "../../types";

export default function Room() {
  const context = useMainContext();
  const { users, setUsers } = useUserContext();
  const socket = useSocketContext();
  const navigate = useNavigate();

  const [message, setMessage] = useState<Message>({ text: "", user: "" });
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Listen for users in the room
    socket.on("users", (newUsers: User[]) => {
      console.log("Updated users:", newUsers);
      setUsers(newUsers);
    });

    // Listen for previous messages
    socket.on("previousMessages", (previousMessages: Message[]) => {
      console.log("Previous messages received:", previousMessages);
      setMessages(previousMessages);
    });

    // Listen for new messages
    socket.on("message", (updatedMessages) => {
      setMessages(updatedMessages);
    });

    return () => {
      socket.off("users");
      socket.off("previousMessages");
      socket.off("message");
      socket.emit("leaveRoom");
    };
  }, [setUsers, socket]);

  const handleSendMessage = () => {
    if (message.text && context?.name) {
      // Emit the message to the server
      socket.emit("sendMessage", message.text);
      setMessage({ text: "", user: context?.name || "" });
    }
  };

  return (
    <div className="roomContainer">
      {/* Left Panel */}
      <div className="leftPanel">
        <h1>Waiting for players... ({users?.length}/4)</h1>
        <h1>Team Selection</h1>
        <h1>Team 1</h1>
        <h2>{users[0] && users[0].name}</h2>
        <h2>{users[2] && users[2].name}</h2>
        <h2>Team 2</h2>
        <h2>{users[1] && users[1].name}</h2>
        <h2>{users[3] && users[3].name}</h2>
      </div>

      {/* Right Panel */}
      <div className="rightPanel">
        <div className="roomInfo">
          <h2>Room ID: {context?.roomId}</h2>
          <div>Welcome, {context?.name}!</div>
          <div className="roomUsers">
            Participants: {users?.map((user) => user.name).join(", ")}
          </div>
        </div>

        <div className="messagesContainer">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.user === context?.name ? "userMessage" : ""
              }`}
            >
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <div className="inputContainer">
          <input
            type="text"
            placeholder="Enter Message"
            value={message.text}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        <button className="leaveButton" onClick={() => navigate("/")}>
          Leave Room
        </button>
      </div>
    </div>
  );
}
