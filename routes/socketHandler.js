const Chat = require('../models/Chat');

module.exports = (socket, io) => {
    // Handle real-time message loading
    socket.on('loadMessages', async () => {
        try {
            const messages = await Chat.find().sort({ timestamp: 1 }).exec();
            socket.emit('chat', messages); // Emit to the requesting client
        } catch (err) {
            console.error('Failed to load messages:', err);
        }
    });

    // Handle real-time message saving
    socket.on('newMessage', async (msg) => {
        const { username, message, avatar, chatId } = msg;

        try {
            const newMessage = new Chat({ username, message, avatar, chatId });
            await newMessage.save();

            io.emit('message', { username, message, avatar, chatId }); // Broadcast to all clients
        } catch (err) {
            console.error('Failed to save message:', err);
        }
    });
};

