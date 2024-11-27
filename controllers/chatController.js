const Chat = require('../models/Chat');
const Notification=require('../models/Notification')


const pushNotification = async (req, res, io) => {
    try {
        const { subject, message } = req.body;
        if (!subject || !message) {
            return res.status(400).json({ error: 'Subject and message are required' });
        }
        const newNotification = new Notification({
            subject,
            message
        });
        await newNotification.save();
        io.emit('newNotification', {
            subject: newNotification.subject,
            message: newNotification.message
        });
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'An error occurred while sending the notification' });
    }
};


const getMessages = async (req, res) => {
    try {
        const messages = await Chat.find().sort({ timestamp: 1 }).exec();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to load messages' });
        console.error(err);
    }
};

const addMessage = async (req, res) => {
    const { username, message, avatar, chatId } = req.body;

    try {
        const newMessage = new Chat({ username, message, avatar, chatId });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save message' });
        console.error(err);
    }
};



module.exports = {
    getMessages,
    addMessage,
    pushNotification
};
