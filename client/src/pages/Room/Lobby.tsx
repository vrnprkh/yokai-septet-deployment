import { Box, Button, Paper, Typography } from "@mui/material";
import PlayerCard from "./PlayerCard";
import { User } from "../../types";

interface LobbyProps {
  users: User[];
  isReady: boolean;
  toggleReady: () => void;
}

const Lobby = ({ users, isReady, toggleReady }: LobbyProps) => {
  return (
    <Box
      className="Lobby"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "30%",
        padding: 2,
      }}
    >
      <Paper sx={{ padding: 2, marginBottom: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Waiting for players... ({users?.length}/4)
        </Typography>
        <Typography variant="h6">Team Selection</Typography>
      </Paper>

      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Team 1
        </Typography>
        {users
          .filter((user) => user.team === 1)
          .map((user) => (
            <PlayerCard name={user.name} isReady={user.isReady} />
          ))}
      </Box>

      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Team 2
        </Typography>
        {users
          .filter((user) => user.team === 2)
          .map((user) => (
            <PlayerCard name={user.name} isReady={user.isReady} />
          ))}
      </Box>

      <Button
        variant="contained"
        color={isReady ? "success" : "error"}
        sx={{ marginTop: 2 }}
        onClick={toggleReady}
      >
        {isReady ? "Not Ready" : "Ready"}
      </Button>
    </Box>
  );
};

export default Lobby;
