import { useEffect, useState } from "react";
import { useMainContext } from "../../providers/MainProvider";
import { useSocketContext } from "../../providers/SocketProvider";
import { useUserContext } from "../../providers/UserProvider";

import "./room.css";
import { useNavigate, useParams } from "react-router";
import { GameState, Message, User } from "../../types";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Lobby from "./Lobby";
import Game from "../Game/Game";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { UseGameContext as useGameContext } from "../../providers/GameProvider";
import { numberToGameCard } from "../../utils/cardHelper";

export default function Room() {
  const context = useMainContext();
  const { users, setUsers } = useUserContext();
  const gameContext = useGameContext();
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
    // Don't do anything if the user is already connected to a room
    if (context?.roomId === roomId) {
      return;
    }

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

    // Listen for gameState changes
    socket.on("gameState", (gameState : GameState) => {
      console.log(gameState);
      
      // find user data
      let userIndex = -1;
      gameState.users.forEach((u, i) => {
        if (u.id == sessionStorage.getItem("userId")) {
          userIndex = i;
        }
      })
      // create hand
      gameContext.setCurrentCards(gameState.users[userIndex].hand.map((x) => numberToGameCard(x)))

      // populate middle
      gameContext.setTrumpCard(numberToGameCard(gameState.trumpCard))
      
      const middleCards = [0, 0, 0, 0];
      for (let i = 0; i < 4; i++) {
        const offsetIndex = (i + userIndex) % 4
        middleCards[offsetIndex] = gameState.users[offsetIndex].cardPlayed;
      }
      gameContext.setPlayedCards(middleCards.map((x) => numberToGameCard(x)))
    })

    return () => {
      socket.off("users");
      socket.off("previousMessages");
      socket.off("message");
      socket.off("gameState")
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

  const handleStartGame = () => {
    socket.emit(
      "startGame",
      {roomId},
      (response: {gameState : any; error? : string}) => {
        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response.gameState)
        }
      }
    )
  }

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">Room ID: {context?.roomId}</Typography>
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                if (context?.roomId) {
                  navigator.clipboard.writeText(context.roomId);
                }
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
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
        <Button
              variant="contained"
              color="success"
              onClick={handleStartGame}
              sx={{ marginTop: 2, padding: "10px 20px" }}>
          Start Game
        </Button>
      </Box>
    </Box>
  );
}
