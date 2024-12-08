import { useEffect, useState } from "react";
import { useMainContext } from "./MainProvider";
import { useSocketContext } from "./SocketProvider";
import { useUserContext } from "./UserProvider";

// Define the Message type
type Message = {
  text: string;
  user: string;
};

export default function Room() {
  const context = useMainContext();
  const userContext = useUserContext();
  const socket = useSocketContext();

  // Initialize message as an object with text and user properties
  const [message, setMessage] = useState<Message>({ text: "", user: "" });
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("previousMessages", (messages: Message[]) => {
      // Display previous messages when the user joins the room
      setMessages(messages);
    });

    socket.on("message", (updatedMessages: Message[]) => {
      // Update the state with the full list of messages (including the new one)
      setMessages(updatedMessages);
    });

    return () => {
      socket.off("previousMessages");
      socket.off("message");
    };
  }, [socket]);

  const handleSendMessage = () => {
    // Ensure the message object is complete with text and user
    if (message.text && context?.name) {
      // Emit the message to the server
      socket.emit("sendMessage", message.text);
      setMessage({ text: "", user: context?.name || "" });

      console.log("messages", messages);
    }
  };

  return (
    <>
      <div>I'm in room with ID: {context?.roomId}</div>
      <div>My name is {context?.name}</div>
      <div>I'm here with {userContext?.users?.join(", ")}</div>
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
