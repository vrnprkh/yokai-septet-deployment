import { Input, Button } from "@mui/material";
import { SocketContext } from "../SocketProvider";
import "./Home.css";
import { useContext, useEffect } from "react";
import { useMainContext } from "../MainProvider";
import { useUserContext } from "../UserProvider";
import { useNavigate } from "react-router";

export default function Home() {
  const socket = useContext(SocketContext);
  const { name, setName, roomId, setRoomId } = useMainContext();
  const { setUsers } = useUserContext();
  const navigate = useNavigate();

  // Check if there are users present
  useEffect(() => {
    socket?.on("users", (users: string[]) => {
      setUsers(users);
    });
  }, [socket, setUsers]);

  // Emit login event and redirect to room
  const joinRoom = () => {
    socket?.emit("join", { name, roomId }, (error: string) => {
      if (error) {
        console.error(error);
      }
    });
    navigate("/room");
  };

  return (
    <>
      <div className="homeContainer">
        <Input
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Room code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Button variant="contained" onClick={joinRoom}>
          Join Room
        </Button>
        <Button variant="contained" onClick={joinRoom}>
          Create Room
        </Button>
      </div>
    </>
  );
}
