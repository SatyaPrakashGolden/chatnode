const mongoose = require('mongoose');

const Connection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

module.exports = Connection;
