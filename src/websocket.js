const socket = new WebSocket('ws://localhost:8080'); // Ensure this matches your server address

const setupWebSocket = (onMessageCallback) => {
    socket.onopen = () => {
        console.log('Connected to WebSocket server');
        // Optionally send a message to test
        socket.send('Hello Server');
    };

    socket.onmessage = (event) => {
        console.log('Message from server:', event.data);
        if (onMessageCallback) {
            onMessageCallback(event.data);
        }
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
        // Optionally, you might want to attempt to reconnect here
    };

    return {
        send: (message) => {
            socket.send(message);
        }
    };
};

export default setupWebSocket;
