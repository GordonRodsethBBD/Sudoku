const { Connection, Request, TYPES } = require('tedious');
const {connection, connectToDatabase} = require('../services/dbConnection');
const {ErrorController, AsyncError} = require('../controllers/ErrorController');



const queryGetAllTables = `
    USE SudokuGame;
    SELECT *
    FROM tblUsers;
`;

const queryCreateTables =
`
USE SudokuGame;

    CREATE TABLE tblUsers (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email CHAR(150) NOT NULL,
        passwordHash VARCHAR(255) NOT NULL
    );

    CREATE TABLE tblLevels (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        hiddenSquares INT NOT NULL,
        title VARCHAR(30) NOT NULL
      );

    CREATE TABLE tblGames (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        userId INT NOT NULL,
        levelId INT NOT NULL,
        isDone BIT NOT NULL,
        duration INT NOT NULL,
        FOREIGN KEY (levelId) REFERENCES tblLevels(id),
        FOREIGN KEY (userId) REFERENCES tblUsers(id)
    );

  CREATE TABLE tblLeaderboards (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        gameId INT,
        levelId INT,
        userId INT,
        FOREIGN KEY (gameId) REFERENCES tblGames(id),
        FOREIGN KEY (levelId) REFERENCES tblLevels(id),
        FOREIGN KEY (userId) REFERENCES tblUsers(id)
  );
  `

const queryPopulateDB =
`
USE SudokuGame;
INSERT INTO tblUsers (username, email, passwordHash)
VALUES
    ('rudolph', 'shagan@bbz.co.za', 'saddafdafdaf'),
    ('thabang', 'shagan@bbz.co.za', 'sfaddafdafdaf'),
    ('lucky', 'shagan@bbz.co.za', 'sfadafdafdaf');

INSERT INTO tblLevels (title, hiddenSquares)
VALUES
    ('Easy', 29),
    ('Medium', 38),
    ('Hard', 47),
    ('Very hard', 56),
    ('Insane', 65),
    ('Inhuman', 74);

INSERT INTO tblGames (userId, levelId, isDone, duration )
VALUES
    (1, 2, 1, 5000),
    (2, 1, 0, 5001),
    (2, 1, 1, 5555);
`

const queryDropTables = `
USE SudokuGame;

IF OBJECT_ID('dbo.tblUsers', 'U') IS NOT NULL
    DROP TABLE dbo.tblUsers;

IF OBJECT_ID('dbo.tblGames', 'U') IS NOT NULL
    DROP TABLE dbo.tblGames;

IF OBJECT_ID('dbo.tblLevels', 'U') IS NOT NULL
    DROP TABLE dbo.tblLevels;

IF OBJECT_ID('dbo.tblLeaderboards', 'U') IS NOT NULL
DROP TABLE dbo.tblLeaderboards;

`


const createTables = AsyncError( async (req, res, next) => {
    // console.log("Session Object: ", req.session);
    // console.log("Create Tables Callback Initiated - request.params =", req.params);
    // console.log("Create Tables Callback Initiated - request.body =", req.body);

    const request = new Request(
        queryCreateTables,
        (err, rowCount, rows) => {
            if (err) return next(new ErrorController(err, 500)); // TODO: Handle errors using next( new ErrorController(errorMessage, statusCode))
            if (rowCount === 0) return next(new ErrorController("No results received.", 404));
            // if (rowCount === 1) return next(new ErrorController("More than 1 user with given email", 401));
        }
    );

    connection.execSql(
        request.on("doneInProc", async (rowCount, more, rows) => {
            console.log("Query: ", queryCreateTables, ": \nResult: ",rows);
        }
    ));

    res.status(200).json({
    success: true,
    message: 'Query Successful',
    redirectPath: "/login",
    });
});




const populateTables = AsyncError( async (req, res, next) => {
    console.log("Session Object: ", req.session);
    console.log("populateTables Callback Initiated - request.params =", req.params);
    console.log("populateTables Callback Initiated - request.body =", req.body);

    const request = new Request(
        queryPopulateDB,
        (err, rowCount, rows) => {
            if (err) return next(new ErrorController(err, 500)); // TODO: Handle errors using next( new ErrorController(errorMessage, statusCode))
            if (rowCount === 0) return next(new ErrorController("No results received.", 404));
            // if (rowCount === 1) return next(new ErrorController("More than 1 user with given email", 401));
        }
    );

    connection.execSql(
        request.on("doneInProc", async (rowCount, more, rows) => {
            console.log("Query: ", queryPopulateDB, ": \nResult: ",rows);
            console.log("Response RowCount: ", rowCount, ": \nMore: ",more);
        }
        ));

    console.log(req.body);
    // res.status(200).json({
    // success: true,
    // message: 'Query Successful',
    // redirectPath: "/",
    // });
});



const dropTables = AsyncError( async (req, res, next) => {
    // console.log("Session Object: ", req.session);
    // console.log("dropTables Callback Initiated - request.params =", req.params);
    // console.log("dropTables Callback Initiated - request.body =", req.body);

    const request = new Request(
        queryDropTables,
        (err, rowCount, rows) => {
            if (err) return next(new ErrorController(err, 500)); // TODO: Handle errors using next( new ErrorController(errorMessage, statusCode))
            if (rowCount === 0) return next(new ErrorController("No results received.", 404));
            // if (rowCount === 1) return next(new ErrorController("More than 1 user with given email", 401));
        }
    );

    connection.execSql(
        request.on("doneInProc", async (rowCount, more, rows) => {
            console.log("Query: ", queryDropTables, ": \nResult: ",rows);
        }
    ));

    res.status(200).json({
    success: true,
    message: 'Query Successful',
    redirectPath: "/login",
    });
});



const getTables = AsyncError( async (req, res, next) => {
    // console.log( "Session Object: ", req.session);
    // console.log("getTables Callback Initiated - request.params =", req.params);
    // console.log("getTables Callback Initiated - request.body =", req.body);

    const request = new Request(
        queryGetAllTables,
        (err, rowCount, rows) => {
            if (err) return next(new ErrorController(err, 500)); // TODO: Handle errors using next( new ErrorController(errorMessage, statusCode))
            if (rowCount === 0) return next(new ErrorController("No results received.", 404));
            // if (rowCount === 1) return next(new ErrorController("More than 1 user with given email", 401));
        }
    );

    connection.execSql(
        request.on("doneInProc", async (rowCount, more, rows) => {
            console.log("Query: ", queryGetAllTables, ": \nResult: ",rows);
        }
    ));

    res.status(200).json({
    success: true,
    message: 'Query Successful',
    redirectPath: "/login",
    });
});





// const populate = AsyncError( async (req, res, next) => {
//     try {
//         dropTables();
//     } catch(e) {
//         console.log(e.message);
//         // return next( new ErrorController(e.message, e.status));
//     }
//     createTables();
//     populateTables();
// });

module.exports = {
    populateTables,
    createTables,
    dropTables,
    getTables
}

