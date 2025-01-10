import { useEffect, useState } from "react";
import { useMainContext } from "../../providers/MainProvider";
import { useSocketContext } from "../../providers/SocketProvider";
import { useUserContext } from "../../providers/UserProvider";
import "./room.css";
import { useNavigate, useParams } from "react-router";
import { Message, User } from "../../types";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Lobby from "./Lobby";
import Game from "../Game/Game";

export default function Room() {
  const context = useMainContext();
  const { users, setUsers } = useUserContext();
  const socket = useSocketContext();
  const navigate = useNavigate();

  const [message, setMessage] = useState<Message>({ text: "", user: "" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const roomId = useParams().roomId;

  const toggleReady = () => {
    setIsReady(!isReady);
  };

  useEffect(() => {
    // If the user was already in the room, reconnect to the room
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      console.log("Stored user Id block called");
      socket.emit(
        "reconnect",
        { roomId, userId: storedUserId },
        (response: { username: string; id: string; error?: string }) => {
          if (response.error) {
            console.error(response.error);
            sessionStorage.removeItem("userId"); // Remove invalid session
          } else if (response.username && response.id && roomId) {
            context.setName(response.username);
            context.setRoomId(roomId);
            console.log(`${response.username} reconnected successfully`);
          }
        }
      );
    } else {
      // If the user is not in the room, join the room
      console.log("No stored user, creating a new user and joining room");
      socket?.emit(
        "join",
        { roomId },
        (response: { username: string; id: string; error?: string }) => {
          if (response.username && roomId) {
            // Store the user Id in session storage
            sessionStorage.setItem("userId", response.id);
            context.setName(response.username); // Set the username received from the backend
            context.setRoomId(roomId);
          }
        }
      );
    }
  }, [context, roomId, socket]);

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

    if (users.length == 4) {
      context.setHideLobby(true);
    }

    // Listen for new messages
    socket.on("message", (updatedMessages) => {
      setMessages(updatedMessages);
    });

    return () => {
      socket.off("users");
      socket.off("previousMessages");
      socket.off("message");
    };
  }, [context, setUsers, socket, users.length]);

  const handleSendMessage = () => {
    if (message.text && context?.name) {
      // Emit the message to the server
      socket.emit("sendMessage", message.text);
      setMessage({ text: "", user: context?.name || "" });
    }
  };

  const handleLeaveRoom = () => {
    sessionStorage.removeItem("userId");
    socket.emit("leaveRoom");
    navigate("/");
  };

  return (
    <Box className="roomContainer">
      {/* Left Panel */}
      {!context.hideLobby && (
        <Lobby users={users} isReady={isReady} toggleReady={toggleReady} />
      )}
      {context.hideLobby && <Game />}
      {/* Right Panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">Room ID: {context?.roomId}</Typography>
          <Typography variant="body1">Welcome, {context?.name}!</Typography>
          <Typography variant="body1">
            Participants: {users?.map((user) => user.name).join(", ")}
          </Typography>
        </Paper>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            marginBottom: 2,
            height: "100%",
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                padding: 2,
                marginBottom: 1,
                borderRadius: 1,
                backgroundColor:
                  msg.user === context?.name ? "#b2dfdb" : "#e0f7fa",
                wordWrap: "break-word",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {msg.user}:
              </Typography>
              <Typography variant="body2">{msg.text}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Message"
            value={message.text}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{ padding: "10px 20px" }}
          >
            Send
          </Button>
        </Box>

        <Button
          variant="contained"
          color="error"
          onClick={handleLeaveRoom}
          sx={{ marginTop: 2, padding: "10px 20px" }}
        >
          Leave Room
        </Button>
      </Box>
    </Box>
  );
}
