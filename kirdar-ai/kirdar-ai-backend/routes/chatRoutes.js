// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { handleChat, evaluateChat, getMentorSuggestions } = require('../controllers/chatController');

// Debug middleware
const debugMiddleware = (req, res, next) => {
  console.log('Chat request:', {
    type: req.body.type,
    hasHistory: !!req.body.conversationHistory,
    messageLength: req.body.message?.length
  });
  next();
};

// Apply middleware
router.use(protect);
router.use(debugMiddleware);

// Chat routes
router.post('/', handleChat);
router.post('/evaluate', evaluateChat);
router.post('/mentor', getMentorSuggestions);

module.exports = router;