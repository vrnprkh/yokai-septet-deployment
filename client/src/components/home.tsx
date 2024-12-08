import { Input, Button } from '@mui/material';
import './home.css'



export default function Home() {

	return (
		<>
			<div className='homeContainer'>
				<Input></Input>
				<Button variant='contained'>Join Room</Button>
				<Button variant='contained'>Create Room</Button>
			</div>
		</>

	)
}