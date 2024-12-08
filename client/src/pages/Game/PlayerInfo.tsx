import { Avatar, Card } from "@mui/material";
import "./PlayerInfo.css";

export default function PlayerInfo({name = "DefaultName", isTurn = false} : {name? : string, isTurn? : boolean}) {
  return (
    <>
      <Card className="playerInfoContainer">
        <Avatar sx={{width: "4vw", height: "4vw", backgroundColor : isTurn ? "green" : ""}}></Avatar>
        <div className="text">{name}</div>
      </Card>
    </>
  );
}
