import './sass/app.sass'
import io from 'socket.io-client';
import {useState} from 'react';
import Chat from "./Chat";
import Login from "./Login";

const socket = io.connect('http://localhost:3001');

function App() {
    // Room State
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [chatVisible, setChatVisible] = useState(false);

    const joinRoom = () => {
        const isAuth = room !== '' && username !== '';

        if (isAuth) {
            socket.emit('join_room', room);
            setChatVisible(true);
        }
    }

    return (
        <div className="App">
            {!chatVisible ? (
                <Login setUsername={setUsername} setRoom={setRoom} joinRoom={joinRoom} />
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default App;
