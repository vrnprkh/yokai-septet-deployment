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
  const [joinRoomError, setJoinRoomError] = useState<string>();

  // Check if there are users present
  useEffect(() => {
    socket?.on("users", (users: User[]) => {
      setUsers(users);
    });
  }, [socket, setUsers]);

  // Emit login event and redirect to room
  const joinRoom = () => {
    socket?.emit(
      "join",
      { roomId },
      (response: { username: string; id: string; error?: string }) => {
        if (response.error) {
          setJoinRoomError(response.error); // Set the error state if the room doesn't exist
        } else if (response.username) {
          setRoomId(roomId);
          // Store the user Id in session storage
          sessionStorage.setItem("userId", response.id);
          setName(response.username); // Set the username received from the backend
          navigate(`/room/${roomId}`);
        }
      }
    );
  };

  const createRoom = () => {
    // Request the backend to create a new room
    socket?.emit(
      "create",
      ({
        roomId,
        username,
        id,
      }: {
        roomId: string;
        username: string;
        id: string;
      }) => {
        if (roomId && username) {
          setRoomId(roomId);
          sessionStorage.setItem("userId", id);
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
        <Box className="modalContainer">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="modalTitle"
          >
            Enter Room Code
          </Typography>
          <Typography className="modalDescription">
            Enter the room code provided by your friend to join the room.
          </Typography>
          <Input
            placeholder="Room code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="modalInput"
          />
          {joinRoomError && (
            <Typography className="errorText">{joinRoomError}</Typography>
          )}
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
