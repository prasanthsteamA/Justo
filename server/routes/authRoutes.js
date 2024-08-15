const express = require('express');
const router = express.Router();
const {
  register,
  login,
  sendOneTimeLink,
  resetPassword,
  getTime,
  kickout,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/send-reset-link', sendOneTimeLink);
router.post('/reset/:token', resetPassword);
router.get('/time', getTime);
router.post('/kickout', kickout);

module.exports = router;
