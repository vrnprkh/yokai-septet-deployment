import { Card, Typography, Chip } from "@mui/material";

interface PlayerCardProps {
  name: string;
  isReady: boolean;
  isUser: boolean;
}

function PlayerCard({ name, isReady, isUser }: PlayerCardProps) {
  return (
    <Card
      className="playerCardContainer"
      sx={{
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 1,
      }}
    >
      <Typography
        variant="h6"
        className="playerCardName"
        sx={{ fontWeight: "bold", color: isUser ? "red" : "#333" }}
      >
        {name}
      </Typography>
      <Chip
        label={isReady ? "Ready" : "Not Ready"}
        color={isReady ? "success" : "error"}
        sx={{ textTransform: "capitalize" }}
      />
    </Card>
  );
}

export default PlayerCard;
