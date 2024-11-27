const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const router = require('./routes/router');
const Connection = require('./db');

const app = express();
app.use(express.json());
Connection();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// Socket.io handlers
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    require('./routes/socketHandler')(socket, io);

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

app.set('socketio', io);

// Use the router for HTTP endpoints
app.use('/api', router);

// Start the server
const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
