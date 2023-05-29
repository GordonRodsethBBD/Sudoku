const Request = require('tedious').Request;
const { connection } = require('../services/connection');
const {ErrorController, AsyncError} = require('../controllers/ErrorController');
const { TYPES } = require('tedious');
const path = require("path");

//Get user intolerances
exports.getAllIntolerances = AsyncError(async (req, res, next) => {
    const { email } = req.body;

    let queryStoredProc = "sp_GetAllIntolerances"

    const request = new Request(queryStoredProc, function(err) {
        if(err) {
            return next(new ErrorController());
        }
    });

    connection.callProcedure(request);

    request.on('doneInProc', (rowCount, more, rows) => {
        intolerancesReceived = false;

        if(rows.length >= 1) {
            intolerancesReceived = true;
        }

        if(!intolerancesReceived) {
            return next(new ErrorController('Unable to fetch difficulties', 401));
        }

        res.status(200).json({
            success: true,
            message: 'Intolerances obtained',
            user_intolerances: rows
        });
    });
});

//Get user intolerances
exports.getIntolerances = AsyncError(async (req, res, next) => {
    //const { email } = req.body;
    const email = 'test';

    let sql = 'spIntolerances_GetByUserEmail';

    const request = new Request(sql, function(err, rowCount, rows) {
        if(err) {
            return next(new ErrorController('Internal Server Error', 500));
        }

        if(rows.length >= 1) {
            return next(new ErrorController('Invalid Email', 401));
        }
    });

    request.addParameter('email', TYPES.NVarChar, email);

    connection.callProcedure(request);

    request.on('doneInProc', (rowCount, more, rows) => {
        intolerancesReceived = false;

        if(rows.length >= 1) {
            intolerancesReceived = true;
        }

        if(!intolerancesReceived) {
            return next(new ErrorController('Unable to obtain intolerances', 401));
        }

        res.status(200).json({
            success: true,
            message: 'Intolerances obtained',
            user_intolerances: rows
        });
    });
});

exports.addIntolerance = AsyncError(async (req, res, next) => {
    const { intolerance } = req.body;
    //const email = req.session.email;
    let email = 'test@test.com'

    let sql = 'spIntolerances_InsertUserIntolerance';

    const request = new Request(sql, function(err, rowCount, rows) {
        if(err) {
            return next(new ErrorController('Internal Server Error', 500));
        }
    });

    request.addParameter('user_intolerance', TYPES.VarChar, intolerance);
    request.addParameter('user_email', TYPES.NVarChar, email);

    connection.callProcedure(request);

    request.on('requestCompleted', () => {
        res.status(200).json({
            success: true,
            message: 'Intolerance added'
        });
    });
});

// endpoint => /game
const gamePage = (req, res) => {
    try
    {res.sendFile("game.html", { root: path.join(__dirname, "../pages/game") });}
    catch (e) {
        console.log(e);
    }
    console.log("Render Game Page Callback Function called '/game' endpoint")
    // console.log("Request: " + req.json);
    // console.log("Response: " + res.json);
  };

const playCallback = (req, res) => {
    console.log("playCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};
const deleteCallback = (req, res) => {
    console.log("deleteCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};
const pauseCallback = (req, res) => {
    console.log("pauseCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};
const resumeCallback = (req, res) => {
    console.log("resumeCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};
const startCallback = (req, res) => {
    console.log("startCallback Function called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};
const continueCallback = (req, res) => {
    console.log("Callback continueFunction called")
    console.log("Request: " + req.json);
    console.log("Response: " + res.json);
};
const newGameCallback = (req, res) => {
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
