import { Box, Button, Input, Modal, Typography } from "@mui/material";
import "./Home.css";
import { useEffect, useState } from "react";
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
  const [roomCodeModalOpen, setRoomCodeModalOpen] = useState(false);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Check if there are users present
  useEffect(() => {
    socket?.on("users", (users: User[]) => {
      setUsers(users);
    });
  }, [socket, setUsers]);

  // Emit login event and redirect to room
  const joinRoom = () => {
    socket?.emit("join", { roomId }, (response: { username: string }) => {
      if (response.username) {
        setRoomId(roomId);
        setName(response.username); // Set the username received from the backend
        navigate(`/room/${roomId}`);
      }
    });
  };

  const createRoom = () => {
    // Request the backend to create a new room
    socket?.emit(
      "create",
      ({ roomId, username }: { roomId: string; username: string }) => {
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
      <Modal
        open={roomCodeModalOpen}
        onClose={() => setRoomCodeModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Room Code
          </Typography>
          <Input
            placeholder="Room code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button variant="contained" onClick={joinRoom}>
            Join Room
          </Button>
        </Box>
      </Modal>
      <div className="homeContainer">
        <Button variant="contained" onClick={() => setRoomCodeModalOpen(true)}>
          Join Room
        </Button>
        <Button variant="contained" onClick={createRoom}>
          Create Room
        </Button>
      </div>
    </>
  );
}
