import { useMainContext } from "./MainProvider";
import { useUserContext } from "./UserProvider";

export default function Room() {
  const context = useMainContext();
  const userContext = useUserContext();

  return (
    <>
      <div>I'm a room my id is {context?.roomId}</div>
      <div>My name is {context?.name}</div>
      <div>I'm here with {userContext?.users}</div>
    </>
  );
}
