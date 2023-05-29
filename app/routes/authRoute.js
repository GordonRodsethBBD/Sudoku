const express = require('express');
const router = express.Router();

const { registerPage, loginPage, loginCallback, registerCallback } = require('../controllers/loginController.js');

router.get('/login', loginPage);
router.get('/register', registerPage);
router.post('/login/auth', loginCallback);
router.post('/register/auth', registerCallback);

module.exports = router;