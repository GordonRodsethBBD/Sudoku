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

module.exports = {
    connectToDatabase,
    connection}