const Request = require('tedious').Request;
const { connection } = require('../services/connection');
const {ErrorController, AsyncError} = require('../controllers/ErrorController');
const { TYPES } = require('tedious');
const path = require("path");

// endpoint => /game
const gamePage = (req, res) => {
    // TODO: Get user information from logged in user
    // TODO: params, user_id, levels, games,
    try
    {res.sendFile("game.html", { root: path.join(__dirname, "../pages/game") });}
    catch (e) {
        console.log(e);
    }
    console.log("Render Game Page Callback Function called '/game' endpoint")
    // console.log("Request: " + req.json);
    // console.log("Response: " + res.json);
  };

// endpoint => /game/play
const playCallback = (req, res) => {
    // TODO: Start a game, requires User session and start counting time in localStorage
    // TODO: params: {  }
    console.log("playCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => /game/delete
const deleteCallback = (req, res) => {
    // TODO: Destroy the game from client localStorage
    // TODO: params: {gameID}
    console.log("deleteCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => game/pause
const pauseCallback = (req, res) => {
    // TODO: Pause the time of the game object in client localStorage
    console.log("pauseCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => game/resume
const resumeCallback = (req, res) => {
    // TODO: Restart static time counter controller in localStorage
    console.log("resumeCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => game/start
const startCallback = (req, res) => {
    // TODO: Start static time counter controller in localStorage, and call 3rd Party API in localStorage
    console.log("startCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => gamentinue
const continueCallback = (req, res) => {
    // TODO: Start static time counter controller in localStorage and fetch game and gameboard data
    console.log("Callback continueFunction called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => gameewGame
const newGameCallback = (req, res) => {
    // TODO: starts counting time, and fetches session's User data and Level data
    console.log("newGameCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};
const publishGameCallback = (req, res) => {
    // TODO: Inserts a Game object, requires session's User and Level data
    console.log("newGameCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};


module.exports = {
    gamePage,
    playCallback,
    deleteCallback,
    pauseCallback,
    resumeCallback,
    startCallback,
    continueCallback,
    newGameCallback
};
