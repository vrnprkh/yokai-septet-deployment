import { Button } from "@mui/material";
import "./Home.css";
import { useEffect } from "react";
import { useMainContext } from "../../providers/MainProvider";
import { useUserContext } from "../../providers/UserProvider";
import { useSocketContext } from "../../providers/SocketProvider";
import { useNavigate } from "react-router";
import { User } from "../../types";

export default function Home() {
  const socket = useSocketContext();
  const { setName, roomId, setRoomId } = useMainContext();
  const { setUsers } = useUserContext();
  const navigate = useNavigate();

  // Check if there are users present
  useEffect(() => {
    socket?.on("users", (users: User[]) => {
      setUsers(users);
    });
  }, [socket, setUsers]);

  // Emit login event and redirect to room
  const joinRoom = () => {
    socket?.emit("join", { roomId }, (error: string) => {
      if (error) {
        console.error(error);
      } else {
        navigate("/room");
      }
    });
  };

  const createRoom = () => {
    // Request the backend to create a new room
    socket?.emit(
      "create",
      ({ roomId, username }: { roomId: string; username: string }) => {
        console.log(`FRONTEND: room ${roomId} created by ${username}`);
        if (roomId && username) {
          setRoomId(roomId);
          setName(username);
          navigate(`/room/${roomId}`);
        }
      }
    );
  };

  return (
    <>
      <div className="homeContainer">
        <Button variant="contained" onClick={joinRoom}>
          Join Room
        </Button>
        <Button variant="contained" onClick={createRoom}>
          Create Room
        </Button>
      </div>
    </>
  );
}
