const express = require('express');
const router = express.Router();

const { registerPage, loginPage, loginCallback, registerCallback } = require('../controllers/loginController.js');

router.get('/', loginPage);
router.get('/login', loginPage);
router.get('/register', registerPage);

router.post('/login', loginCallback);
router.post('/register', registerCallback);

module.exports = router;