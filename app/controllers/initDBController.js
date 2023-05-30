const { Connection, Request, TYPES } = require('tedious');
const {connection, connectToDatabase} = require('./dbController');


const queryCreateTables =
`
    CREATE TABLE tblUser (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        emailHash VARCHAR(150) NOT NULL,
        passwordHash VARCHAR(255) NOT NULL
    );

    CREATE TABLE tblLevel (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        hiddenSquares INT NOT NULL,
        title VARCHAR(30) NOT NULL
      );

    CREATE TABLE tblGame (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        userId INT NOT NULL,
        levelId INT NOT NULL,
        isDone BOOL NOT NULL,
        duration INT NOT NULL,
        FOREIGN KEY (levelId) REFERENCES tblLevel(id),
        FOREIGN KEY (userId) REFERENCES tblUser(id)
    );

  CREATE TABLE tblLeaderboard (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        gameId INT,
        levelId INT,
        userId INT,
        FOREIGN KEY (gameId) REFERENCES tblGame(id),
        FOREIGN KEY (levelId) REFERENCES tblLevel(id),
        FOREIGN KEY (userId) REFERENCES tblUser(id)
  );
  `

const queryPopulateDB =
`
INSERT INTO tblUsers (username, emailHash, passwordHash)
VALUES
    ('rudolph', 'adfafasdfsdfa', 'sfaddafdafdaf'),
    ('thabang', 'adfafasdfsdfa', 'sfaddafdafdaf'),
    ('lucky', 'adfafasdfsdfa', 'sfaddafdafdaf');

INSERT INTO tblLevels (title, hiddenSquares)
VALUES
    ('Easy', 29),
    ('Medium', 38),
    ('Hard', 47),
    ('Very hard', 56),
    ('Insane', 65),
    ('Inhuman', 74);

INSERT INTO tblGame (userId, levelId, isDone, duration )
VALUES
    (1, 2, true, 5000),
    (2, 1, false, 5000),
    (2, 1, true, 5555);
`

const queryDropTables = `
USE SudokuGame;

IF OBJECT_ID('dbo.tblUsers', 'U') IS NOT NULL
    DROP TABLE dbo.tblUsers;

IF OBJECT_ID('dbo.tblGame', 'U') IS NOT NULL
    DROP TABLE dbo.tblGame;

IF OBJECT_ID('dbo.tblLevel', 'U') IS NOT NULL
    DROP TABLE dbo.tblLevel;

`

function createTables(){
    return new Promise( (resolve, reject) => {
        const request = new Request(
            queryCreateTables,
            (err, rowCount) => {
                if(err) reject(err);
                else resolve(rowCount);
            }
        );

        connection.execSql(request);

    });
};

function populateTables(){
    return new Promise( (resolve, reject) => {
        const request = new Request(
            queryPopulateDB,
            (err, rowCount) => {
                if(err) reject(err);
                else resolve(rowCount);
            }
        );

        connection.execSql(request);

    });
};

function dropTables(){
    return new Promise( (resolve, reject) => {
        const request = new Request(
            queryDropTables,
            (err, rowCount) => {
                if(err) reject(err);
                else resolve(rowCount);
            }
        );

        connection.execSql(request);

    });
};

function populate() {
    try {
        dropTables();
    } catch(e) {
        console.log(e.message);
    }
    createTables();
    populateTables();
};

module.exports = {
    populate
}

