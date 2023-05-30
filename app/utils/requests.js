const { Connection, Request, TYPES } = require('tedious');

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

const connection = new Connection(config);


const connectToDatabase = () => {
    connection.on('connect', (err) => err ? console.log('Error: ', err) : console.log('Connected to the Database') );
    connection.connect();
}


function getLeaderboardData(difficulty) {
    connection.on('connect', (err) => {
        if (err) {
          console.error(err.message);
        } else {

          const query = `SELECT * FROM tblLeaderboard WHERE difficulty = '${difficulty}' ORDER BY time ASC LIMIT 10`;

          const request = new Request(query, (error, rowCount, rows) => {
            if (error) {
              console.error(error.message);
            } else {
              console.log(`${rowCount} row(s) returned`);
              console.log(rows);
            }
          });

          connection.execSql(request);
        }
      });
}


function addUser(username, email) {

    connection.on('connect', (error) => {
      if (error) {
        console.error('Error connecting to the database:', error.message);
        return;
      }

      console.log('Connected to the database.');


      const insertQuery = "INSERT INTO tblUser (username, email) VALUES (@username, @email)";


      const request = new Request(insertQuery, (err, rowCount) => {
        if (err) {
          console.error('Error executing the query:', err.message);
        } else {
          console.log(`Inserted ${rowCount} row(s) into tblUser`);
        }


        connection.close();
      });

      // Bind parameter values to the placeholders
      request.addParameter('username', TYPES.NVarChar, username);
      request.addParameter('email', TYPES.NVarChar, email);

      // Execute the query
      connection.execSql(request);
    });

    // Event handler for the connection 'error' event
    connection.on('error', (err) => {
      console.error('Database connection error:', err.message);
    });

    // Start the connection
    connection.connect();
  }


function addGame(gameID, username) {

    // Event handler for the connection 'connect' event
    connection.on('connect', (error) => {
      if (error) {
        console.error('Error connecting to the database:', error.message);
        return;
      }

      console.log('Connected to the database.');

      // Create the INSERT statement
      const insertQuery = "INSERT INTO tblGame (GameID, username) VALUES (@gameID, @username)";

      // Create a new Request object
      const request = new Request(insertQuery, (err, rowCount) => {
        if (err) {
          console.error('Error executing the query:', err.message);
        } else {
          console.log(`Inserted ${rowCount} row(s) into tblGame`);
        }

        // Close the connection
        connection.close();
      });

      // Bind parameter values to the placeholders
      request.addParameter('gameID', TYPES.Int, gameID);
      request.addParameter('username', TYPES.NVarChar, username);

      // Execute the query
      connection.execSql(request);
    });

    // Event handler for the connection 'error' event
    connection.on('error', (err) => {
      console.error('Database connection error:', err.message);
    });

    // Start the connection
    connection.connect();
  }


function updateLeaderboard(gameID, difficulty, time) {


const connection = new Connection(config);

// Event handler for the connection 'connect' event
connection.on('connect', (error) => {
    if (error) {
    console.error('Error connecting to the database:', error.message);
    return;
    }

    console.log('Connected to the database.');

    // Create the UPDATE statement
    const updateQuery = "UPDATE tblLeaderboard SET time = @time WHERE GameID = @gameID AND difficulty = @difficulty";

    // Create a new Request object
    const request = new Request(updateQuery, (err, rowCount) => {
    if (err) {
        console.error('Error executing the query:', err.message);
    } else {
        console.log(`Updated ${rowCount} row(s) in tblLeaderboard`);
    }

    // Close the connection
    connection.close();
    });

    // Bind parameter values to the placeholders
    request.addParameter('gameID', TYPES.Int, gameID);
    request.addParameter('difficulty', TYPES.NVarChar, difficulty);
    request.addParameter('time', TYPES.Int, time);

    // Execute the query
    connection.execSql(request);
});

// Event handler for the connection 'error' event
connection.on('error', (err) => {
    console.error('Database connection error:', err.message);
});

// Start the connection
connection.connect();
}


function getLeaderboard () {
return new Promise((resolve, reject) => {
    const leaderboardData = [];

    connection.on('connect', (err) => {
    if (err) reject(err);
    else {
        const request = new Request('SELECT * FROM tblLeaderboard', (err, rowCount) => {
            if (err) reject(err);
            else resolve(leaderboardData);
        });

        request.on('row', (columns) => {
        const rowData = {};
        columns.forEach((column) => {
            rowData[column.metadata.colName] = column.value;
        });
        leaderboardData.push(rowData);
        });

        connection.execSql(request);
    }
    });

    connection.on('error', (err) => {
    reject(err);
    });
});
};


function LeaderboardInsert(gameID, difficulty, time) {
return new Promise(
    function (resolve, reject) {
    connection.on('connect', function (err) {
    if (err) reject(err);
    else {
        var request = new Request(
        `INSERT INTO tblLeaderboard (GameID, Difficulty, Time) VALUES (${gameID}, '${difficulty}', ${time});`,
        (err, rowCount) => {
            if (err) reject(err);
            else resolve(rowCount);
        }
        );

        connection.execSql(request);
    }
    });

    connection.on('error', (err) => reject(err));
});
}


function UserGetAll() {
return new Promise( (resolve, reject) => {
    connection.on('connect',  (err) => {
    if (err) reject(err);
    else {
        var request = new Request(
        'SELECT * FROM tblUser',  (err, rowCount, rows) => {
            if (err) reject(err);
            else {
            var users = rows.map( (rowData) => {
                return {
                username: rowData[0].value,
                email_hashed: rowData[1].value
                };
            });
            resolve(users);
            }
        }
        );

        var users = [];
        request.on('row', (columns) => users.push(columns) );

        request.on( 'done', () => resolve(users));

        connection.execSql(request);
    }
    });

    connection.on('error', (err) => reject(err) );
});
}


function UserGetSingle(username) {
return new Promise(  (resolve, reject) => {
    connection.on('connect',  (err) => {
    if (err) {
        reject(err);
    } else {
        var request = new Request(
            'SELECT * FROM tblUser WHERE username = @username',
            (err, rowCount, rows) => {
                if (err) reject(err);
                else if (rowCount === 0) resolve(null);
                else {
                    var user = {
                    username: rows[0][0].value,
                    email_hashed: rows[0][1].value
                    };
                    resolve(user);
                }
        });

        request.addParameter('username', TYPES.VarChar, username);

        connection.execSql(request);
    }
    });

    connection.on('error', (err) => reject(err) );
});
}


function UserUpdate(username, emailHashed) {
return new Promise( (resolve, reject) => {
    connection.on('connect',  (err) => {
        if (err) reject(err);
        else {
            var request = new Request(
                'UPDATE tblUser SET email_hashed = @email_hashed WHERE username = @username',
                (err, rowCount) => {
                    if (err) reject(err);
                    else if (rowCount === 0) resolve(false); // User not found
                    else resolve(true); // User updated successfully
            });

            request.addParameter('username', TYPES.VarChar, username);
            request.addParameter('email_hashed', TYPES.VarChar, emailHashed);

            connection.execSql(request);
        }
    });

    connection.on('error', (err) => reject(err) );
});
}


function UserInsert(username, emailHashed) {
return new Promise( (resolve, reject) => {
    connection.on('connect',  (err) => {
    if (err) reject(err);
    else {
        var request = new Request(
            'INSERT INTO tblUser (username, email_hashed) VALUES (@username, @email_hashed)',
            (err, rowCount) => {
                if (err) reject(err);
                else resolve(true); // User inserted successfully
            }
        );

        request.addParameter('username', TYPES.VarChar, username);
        request.addParameter('email_hashed', TYPES.VarChar, emailHashed);

        connection.execSql(request);
    }
    });

    connection.on('error',  (err) => reject(err) );
});
}


function GameGetAll() {
return new Promise(  (resolve, reject) => {
    connection.on('connect',  (err) => {
    if (err) reject(err);
    else {
        var request = new Request('SELECT * FROM tblGame',  (err, rowCount, rows) => {
        if (err) reject(err);
        else {
            var games = [];

            rows.forEach(  (columns) => {
                var game = {
                    gameID: columns[0].value,
                    username: columns[1].value
                };

                games.push(game);
            });

            resolve(games);
        }
        });

        connection.execSql(request);
    }
    });

    connection.on('error',   (err) => reject(err) );
});
}


function GameGetSingle(gameID) {
return new Promise( (resolve, reject) => {
    connection.on('connect', (err) => {
    if (err) reject(err);
    else {
        var request = new Request('SELECT * FROM tblGame WHERE GameID = @gameID',  (err, rowCount, rows) => {
        if (err) reject(err);
        else {
            if (rowCount === 0) resolve(null); // No game found
            else {
                var columns = rows[0];

                var game = {
                    gameID: columns[0].value,
                    username: columns[1].value
                };

                resolve(game);
            }
        }
        });

        request.addParameter('gameID', TYPES.Int, gameID);

        connection.execSql(request);
    }
    });

    connection.on('error',  (err) => reject(err) );
});
}


function gameUpdate(gameID, username, newDifficulty) {
return new Promise((resolve, reject) => {
    const request = new Request(
        `UPDATE tblGame SET difficulty = @newDifficulty WHERE gameID = @gameID AND username = @username`,
        (err, rowCount) => {
            if (err) reject(err);
            else resolve(rowCount);
        }
    );

    request.addParameter('newDifficulty', TYPES.VarChar, newDifficulty);
    request.addParameter('gameID', TYPES.Int, gameID);
    request.addParameter('username', TYPES.VarChar, username);

    connection.execSql(request);
});
}


function gameInsert(username, difficulty, time) {
return new Promise((resolve, reject) => {
    const request = new Request(
        `INSERT INTO tblGame (username, difficulty, time) VALUES (@username, @difficulty, @time)`,
        (err, rowCount) => {
            if (err) reject(err);
            else resolve(rowCount);
        }
    );

    request.addParameter('username', TYPES.VarChar, username);
    request.addParameter('difficulty', TYPES.VarChar, difficulty);
    request.addParameter('time', TYPES.BigInt, time);

    connection.execSql(request);
});
}


module.exports = {
getLeaderboardData,
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
};
