import React, {useEffect, useState} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
    // Messages States
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }

            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log('data: ', data)
            setMessageList((list) => [...list, data]);
        })
    }, [socket])

    return (
        <div className="container">
            <div className="chat-window">
                <div className="chat-header">
                    <p>JUST CHAT</p>
                </div>

                <div className="chat-room">
                    <p>Room - {room}</p>
                </div>

                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {
                            messageList.map((messageContent) => {
                                return (
                                    <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                        <div>
                                            <div className="message-author">
                                                <p id="author">{messageContent.author}</p>
                                            </div>
                                            <div className="message-content">
                                                <p>{messageContent.message}</p>
                                            </div>
                                            <div className="message-meta">
                                                <p id="time">{messageContent.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ScrollToBottom>
                </div>

                <div className="chat-footer">
                    <input
                        type="text"
                        placeholder="Type your message"
                        value={currentMessage}
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button onClick={sendMessage}>SEND</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;