const socket = new WebSocket('wss://blessed-desk-ccf349152c.strapiapp.com:8080');

const setupWebSocket = (onMessageCallback) => {
    socket.onopen = () => {
        console.log('Connected to WebSocket server');
        
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
        
    };

    return {
        send: (message) => {
            socket.send(message);
        }
    };
};

export default setupWebSocket;
