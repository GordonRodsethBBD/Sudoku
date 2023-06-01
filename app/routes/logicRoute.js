const express = require('express');
const router = express.Router();

const {
    insertGame,
    getUserGame,
    deleteGame,
    getDifficulties,
    formatDuration,
    getLeaderboard,
    getUsernameByEmail
} = require('../controllers/logicController.js');


router.get('/insertGame', insertGame);
router.get('/getUserGame', getUserGame);
router.get('/deleteGame', deleteGame);
router.get('/getDifficulties', getDifficulties);
router.get('/formatDuration', formatDuration);
router.get('/getLeaderboard', getLeaderboard);
router.get('/getUsernameByEmail', getUsernameByEmail);

router.post('/insertGame', insertGame);
router.post('/deleteGame', deleteGame);
router.post('/getDifficulties', getDifficulties);
router.post('/formatDuration', formatDuration);

module.exports = router;
