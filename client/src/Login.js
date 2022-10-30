import React from 'react';

const Login = ({ setUsername, setRoom, joinRoom }) => {
    return (
        <div className="container">
            <div className="joinChatContainer">
                <h3>JUST CHAT</h3>
                <p>Hello, This is a simple chat.</p>
                <input
                    type="text"
                    placeholder="Nickname..."
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Room Number..."
                    onChange={(event) => {
                        setRoom(event.target.value);
                    }}
                />
                <button onClick={joinRoom}>Join</button>
            </div>
        </div>
    );
};

export default Login;