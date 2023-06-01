const sql = require('mssql');

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

// Create a connection pool with the specified configuration
const pool = new sql.ConnectionPool(config);

async function executeQuery(sqlQuery) {
  try {
    let result = undefined;
    // Check if the connection pool is already connected
    if (!pool.connected)
      await pool.connect();

    result = await pool.request().query(sqlQuery);
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error(err);
  }
}

function checkPoolStatus(){
  console.log(pool.connected);
  return pool.connected;
}

function closeConnection(){
  if (pool.connected)
    pool.close();
}

module.exports = { executeQuery,checkPoolStatus,closeConnection };
