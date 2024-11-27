const express = require('express');
const { getMessages, addMessage,pushNotification } = require('../controllers/chatController');

const router = express.Router();

router.get('/messages', getMessages);
router.post('/messages', addMessage);

router.post('/pushNotification', (req, res) => {
    const io = req.app.get('socketio'); 
    pushNotification(req, res, io); 
});
module.exports = router;
