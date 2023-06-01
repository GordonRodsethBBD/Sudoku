const sql = require('mssql');

const dbUtils = require('./dbUtils');

const config = {
  user: 'SudokuGame',
  password: 'BlackScreen#123',
  server: 'sudoku-game.database.windows.net',
  database: 'SudokuGame',
  options: {
    encrypt: true,
    trustServerCertificate: true, // Set this to true for self-signed certificates
  },
};



async function insertGame(username, levelId, isDone, duration, board) {
  try {
    const userIdQuery = `SELECT id FROM dbo.tblUsers WHERE username = '${username}'`;
    const userIdResult = await dbUtils.executeQuery(userIdQuery);

    if (!userIdResult || userIdResult.length === 0) {
      throw new Error(`User '${username}' not found.`);
    }

    const userId = userIdResult[0].id;

    const query = `INSERT INTO dbo.tblGames (userId, levelId, isDone, duration, board) 
                   VALUES (${userId}, ${levelId}, ${isDone}, ${duration}, '${board}')`;

    await dbUtils.executeQuery(query);
    return 'Game inserted successfully.';
  } catch (error) {
    console.log('There was an error: ' + error);
    return 'Failed to insert game.';
  }
}

async function getUserGame(username) {
  try {
    const userIdQuery = `SELECT id FROM dbo.tblUsers WHERE username = '${username}'`;
    const userIdResult = await dbUtils.executeQuery(userIdQuery);

    if (!userIdResult || userIdResult.length === 0) {
      throw new Error(`User '${username}' not found.`);
    }

    const userId = userIdResult[0].id;

    const query = `SELECT * FROM dbo.tblGames WHERE userId = ${userId}`;

    const userGameResult = await dbUtils.executeQuery(query);
    return userGameResult;
  } catch (error) {
    console.log('There was an error: ' + error);
    return 'Failed to fetch user game.';
  }
}

async function deleteGame(username) {
  try {
    const userIdQuery = `SELECT id FROM dbo.tblUsers WHERE username = '${username}'`;
    const userIdResult = await dbUtils.executeQuery(userIdQuery);

    if (!userIdResult || userIdResult.length === 0) {
      throw new Error(`User '${username}' not found.`);
    }

    const userId = userIdResult[0].id;

    const query = `DELETE FROM dbo.tblGames WHERE userId = ${userId}`;

    await dbUtils.executeQuery(query);
    return 'Game deleted successfully.';
  } catch (error) {
    console.log('There was an error: ' + error);
    return 'Failed to delete game.';
  }
}

async function fetchDifficulties() {
  try {
    const query = 'SELECT * FROM dbo.tblLevels';
    const difficulties = await dbUtils.executeQuery(query);
    return difficulties;
  } catch (error) {
    console.log('There was an error: ' + error);
    return 'Failed to fetch difficulties.';
  }
}

function formatDuration(duration) {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    const formattedSeconds = seconds % 60;
    const formattedMinutes = minutes % 60;
    const formattedHours = hours % 24;
  
    const formattedHoursStr = formattedHours < 10 ? `0${formattedHours}` : formattedHours;
    const formattedMinutesStr = formattedMinutes < 10 ? `0${formattedMinutes}` : formattedMinutes;
    const formattedSecondsStr = formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds;
  
    return `${formattedHoursStr}:${formattedMinutesStr}:${formattedSecondsStr}`;
}

async function getLeaderboard() {
    try {
      const query = `
        SELECT u.username, g.duration, l.title AS difficulty
        FROM dbo.tblGames AS g
        INNER JOIN dbo.tblUsers AS u ON g.userId = u.id
        INNER JOIN dbo.tblLevels AS l ON g.levelId = l.id
        WHERE g.isDone = 1
        ORDER BY g.duration ASC
      `;
  
      const result = await DB.executeQuery(query);
  
      const leaderboard = result.map((row) => ({
        username: row.username,
        duration: formatDuration(row.duration),
        difficulty: row.difficulty,
      }));
  
      return leaderboard;
    } catch (error) {
      console.log('There was an error: ' + error);
    }
}

async function getUsernameByEmail(email) {
    try {
      const query = `
        SELECT username
        FROM dbo.tblUsers
        WHERE email = '${email}'
      `;
  
      const result = await DB.executeQuery(query);
      if (result.length > 0) {
        return result[0].username;
      } else {
        return null; // Return null if no user is found with the provided email
      }
    } catch (error) {
      console.log('There was an error: ' + error);
    }
}

module.exports = { 
    insertGame, 
    getUserGame, 
    deleteGame, 
    fetchDifficulties, 
    formatDuration, 
    getLeaderboard, 
    getUsernameByEmail
};
