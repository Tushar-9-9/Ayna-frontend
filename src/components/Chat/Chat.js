
import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import Logout from '../Logout';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        
        socketRef.current = new WebSocket('ws://localhost:8080');

        socketRef.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socketRef.current.onmessage = (event) => {
            const message = event.data;
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'server' }]);
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const handleSendMessage = () => {
        if (input.trim()) {
            socketRef.current.send(input);
            setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <img src="../../img/getayna_logo.jpeg" className="profile-image" />
                <h2>Server</h2>
                <Logout className="logout-button" />
            </div>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === 'user' ? 'message-user' : 'message-server'}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleSendMessage}>Send</button>
                <button onClick={() => {
                    setMessages([]);
                    socketRef.current.send("new_session"); // Inform server about new session
                }}>New Session</button>
            </div>
        </div>
    );
};

export default Chat;
