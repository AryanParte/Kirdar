// routes/guestRoutes.js
const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const { validateGuestCode } = require('../middleware/guestMiddleware');

// Guest code validation
router.post('/validate-code', guestController.validateCode);

// Guest chat - use validateGuestCode middleware
router.post('/chat', validateGuestCode, guestController.handleChat);

module.exports = router;