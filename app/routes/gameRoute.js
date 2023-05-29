const express = require('express');
const router = express.Router();

const {
    gamePage,
    playCallback,
    deleteCallback,
    pauseCallback,
    resumeCallback,
    startCallback,
    continueCallback,
    newGameCallback
    } = require('../controllers/gameController');

router.get('/', gamePage);

router.post('/move', playCallback);
router.post('/delete', deleteCallback);
router.post('/pause', pauseCallback);
router.post('/resume', resumeCallback);
router.post('/start', startCallback);
router.post('/continue', continueCallback);
router.post('/new', newGameCallback);

module.exports = router;