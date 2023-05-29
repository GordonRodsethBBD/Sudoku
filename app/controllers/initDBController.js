const { Connection, Request, TYPES } = require('tedious');
const {connection, connectToDatabase} = require('./dbController');
const config = {
    server: 'sudoku-game.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'SudokuGame',
            password: 'BlackScreen#123',
        },
    },
    options: {
        database: 'SudokuGame',
        encrypt: true,
        port: 1433,
    },
};


const queryCreateTables = `CREATE TABLE tblGame (
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    userId INT NOT NULL,
    duration INT NOT NULL,
    levelId INT NOT NULL,
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
  `

const queryPopulateDB = `INSERT INTO tblGame (userId, duration, levelId)
VALUES
  (1, 30, 1),
  (2, 45, 1),
  (3, 60, 2),
  (4, 35, 2),
  (1, 50, 3),
  (2, 55, 3),
  (3, 40, 1),
  (4, 65, 2),
  (1, 70, 2),
  (2, 25, 3);


INSERT INTO tblLeaderboard (gameId, levelId, userId)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 3),
  (4, 2, 4),
  (5, 3, 1),
  (6, 3, 2),
  (7, 1, 3),
  (8, 2, 4),
  (9, 2, 1),
  (10, 3, 2);

INSERT INTO tblLeaderboard (gameId, levelId, userId)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 3),
  (4, 2, 4),
  (5, 3, 1),
  (6, 3, 2),
  (7, 1, 3),
  (8, 2, 4),
  (9, 2, 1),
  (10, 3, 2);

INSERT INTO tblLeaderboard (gameId, levelId, userId)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 3),
  (4, 2, 4),
  (5, 3, 1),
  (6, 3, 2),
  (7, 1, 3),
  (8, 2, 4),
  (9, 2, 1),
  (10, 3, 2);
`

const queryDropTables = `DECLARE @tableName NVARCHAR(128)
DECLARE @dropTableSQL NVARCHAR(MAX) = ''


DECLARE tableCursor CURSOR FOR
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'


OPEN tableCursor
FETCH NEXT FROM tableCursor INTO @tableName
WHILE @@FETCH_STATUS = 0
BEGIN
    SET @dropTableSQL = @dropTableSQL + 'DROP TABLE ' + QUOTENAME(@tableName) + ';'

    FETCH NEXT FROM tableCursor INTO @tableName
END

CLOSE tableCursor
DEALLOCATE tableCursor


EXECUTE sp_executesql @dropTableSQL;

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

function tests() {
    try {
        dropTables();
    } catch(e) {
        console.log(e.message);
    }
    createTables();
    populateTables();
    UserFetchAll();
    UserFetchSingle('user1');
    GameFetchAll()
};

module.exports = {
    tests
}

