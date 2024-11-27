const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true, // Subject is mandatory
        trim: true,     // Removes extra spaces
    },
    message: {
        type: String,
        required: true, // Message is mandatory
        trim: true,     // Removes extra spaces
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Notification', notificationSchema);
