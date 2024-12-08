import { useEffect, useState } from "react";
import { useMainContext } from "../providers/MainProvider";
import { useSocketContext } from "../providers/SocketProvider";
import { useUserContext } from "../providers/UserProvider";

// Define the Message type
type Message = {
  text: string;
  user: string;
};

export type User = {
  id: string;
  name: string;
  roomId: string;
};

export default function Room() {
  const context = useMainContext();
  const { users, setUsers } = useUserContext();
  const socket = useSocketContext();

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
    };
  }, [setUsers, socket]);

  const handleSendMessage = () => {
    // Ensure the message object is complete with text and user
    if (message.text && context?.name) {
      // Emit the message to the server
      socket.emit("sendMessage", message.text);
      setMessage({ text: "", user: context?.name || "" });
    }
  };

  return (
    <>
      <div>I'm in room with ID: {context?.roomId}</div>
      <div>My name is {context?.name}</div>
      <div>I'm here with {users?.map((user) => user.name).join(", ")}</div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter Message"
        value={message.text}
        onChange={(e) => setMessage({ ...message, text: e.target.value })}
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </>
  );
}
