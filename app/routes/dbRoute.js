const express = require('express');
const router = express.Router();

const {
    addUser,
    addGame,
    updateLeaderboard,
    getLeaderboard,
    LeaderboardInsert,
    UserGetAll,
    UserGetSingle,
    UserUpdate,
    UserInsert,
    GameGetAll,
    GameGetSingle,
    gameUpdate,
    gameInsert
} = require('../utils/requests');


router.get( '/leaderboard' , getLeaderboard)
router.post( '/addUser', addUser)
router.post( '/addGame', addGame)
router.get( '/allUsers' , UserGetAll)
router.get( '/singleUser/:ID', UserGetSingle)
router.put( '/updateUser/:ID', UserUpdate)
router.post('/newUser' , UserInsert)
router.get( '/allGames', GameGetAll)
router.get( '/singleGame/:ID', GameGetSingle)
router.put( '/updateGame', gameUpdate)
router.post('/newGame' , gameInsert)

module.exports = (
    router
)

