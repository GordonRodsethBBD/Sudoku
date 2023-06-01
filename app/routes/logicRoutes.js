const express = require('express');
const router = express.Router();

const {
    insertGame,
    getUserGame,
    deleteGame,
    fetchDifficulties,
    formatDuration,
    getLeaderboard,
    getUsernameByEmail
} = require('../controllers/logicController.js');


router.get('/insertGame', insertGame);
router.get('/getUserGame', getUserGame);
router.get('/deleteGame', deleteGame);
router.get('/fetchDifficulties', fetchDifficulties);
router.get('/formatDuration', formatDuration);
router.get('/getLeaderboard', getLeaderboard);
router.get('/getUsernameByEmail', getUsernameByEmail);


module.exports = router;


const =