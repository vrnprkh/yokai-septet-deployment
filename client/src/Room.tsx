import { useContext } from "react"
import { MainContext } from "./MainProvider"

export default function Room() {
	const context = useContext(MainContext)
	return (<>
		<div>
			I'm a room my id is {context?.roomId}
		</div>
	</>)
}