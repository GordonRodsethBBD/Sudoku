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

router.get('/game', gamePage);

router.post('/game/move', playCallback);
router.post('/game/delete', deleteCallback);
router.post('/game/pause', pauseCallback);
router.post('/game/resume', resumeCallback);
router.post('/game/start', startCallback);
router.post('/game/continue', continueCallback);
router.post('/game/new', newGameCallback);

module.exports = router;