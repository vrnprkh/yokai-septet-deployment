import { Card, Typography } from "@mui/material";

interface PlayerCardProps {
  name: string;
  isUser: boolean;
}

function PlayerCard({ name, isUser }: PlayerCardProps) {
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
    </Card>
  );
}

export default PlayerCard;
