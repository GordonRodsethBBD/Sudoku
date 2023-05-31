const Request = require('tedious').Request;
// const { connection } = require('../services/dbConnection');
const {ErrorController, AsyncError} = require('../controllers/ErrorController');
const { TYPES } = require('tedious');
const path = require("path");

// endpoint => /game
// logged in user's information (user's name on screen). difficulties, all of them (display difficulty options). Games information for a certain user (Blur continue button).
const gamePage = (req, res) => {
    res.sendFile("game.html", { root: path.join(__dirname, "../pages/game") });
    console.log('Navigating to Game View')
  };

// endpoint => /game/play
// (run the Dusoku API and populate board (polish certain difficulty.)
// start timer on front-end (not done in this callback) (Take User's table, with games table, and join on user's ID  and where "isDone" is false)
// (polish) ensure only one game isDone=false at a time
const playCallback = (req, res) => {
    // TODO: Start a game, requires User session and start counting time in localStorage
    // TODO: params: {  }
    console.log("playCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => /game/delete
// delete game information from the database if it exists.
// Called when: If game.isDone is true, and user clicks on "newGame" button
const deleteCallback = (req, res) => {
    // TODO: Destroy the game from client localStorage
    // TODO: params: {gameID}
    console.log("deleteCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};
// Called when user exits game before pausing the game

// endpoint => /game/pause
// upload the time, set the isDone BIT to false (should be init to false)
const pauseCallback = (req, res) => {
    // TODO: Pause the time of the game object in client localStorage
    console.log("pauseCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => /game/resume
const resumeCallback = (req, res) => {
    // TODO: Restart static time counter controller in localStorage
    console.log("resumeCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => /game/start
const startCallback = (req, res) => {
    // TODO: Start static time counter controller in localStorage, and call 3rd Party API in localStorage
    console.log("startCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => /game/continue (Low Priority)
// pull user's current game from the server (isDone=false, and only 1 row is returned)
// 
const continueCallback = (req, res) => {
    // TODO: Start static time counter controller in localStorage and fetch game and gameboard data
    console.log("Callback continueFunction called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => /game/new
// Nothing needs to be logged to the database here.
const newGameCallback = (req, res) => {
    // TODO: starts counting time, and fetches session's User data and Level data
    console.log("Callback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};

// endpoint => /game/publish (High priority)
// Do not publish games with too high a tblGames.duration
// If game exists in database (select query, if rows=1), only Update the duration value, and the isDone value. (send Update Query)
// If game doesn't exist in database (select query, if rows=0), publish the full game info (send Insert Query)
// If game exists in database (select query, if rows>1), don't do anything. send error to promise
const publishGameCallback = (req, res) => {
    // TODO: Inserts a Game object, requires session's User and Level data
    console.log("publishCallback Function called")
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
    publishGameCallback,
    newGameCallback
};
