const express = require('express');
const router = express.Router();

const { auth } = require('../controllers/userController');
const messageController = require('../controllers/messageController');
const { messageValidator } = require('../validations/messagesValidator');

router.post('/:username', messageValidator, messageController.createMessage);
router.get('/', auth, messageController.getAllMessages);


module.exports=router