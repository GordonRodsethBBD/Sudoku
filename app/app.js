const express = require("express");
const app = express();
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const setNoSniffHeader = require('./middleware/expressAddons');
const mime = require('mime');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const authRoutes = require("./routes/authRoute");
const gameRoutes = require("./routes/gameRoute");
const dbInitRoutes = require("./routes/dbInitRoute");
const dbRoutes = require("./routes/dbRoute");
const logicRoutes = require("./routes/logicRoute");

// const { ErrorController, AsyncError } = require('./controllers/ErrorController');


app.use(express.static("static"));
// app.use(setNoSniffHeader)
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: "424242424242424242424242424242",
    saveUninitialized:true,
    cookie: { maxAge: 259200000 }, // 3 days
    resave: false
}));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('app/static'))



app.use('/', authRoutes);
app.use('/game', gameRoutes);
app.use('/db', dbRoutes);
app.use('/admin', dbInitRoutes);
app.use('/logic', logicRoutes);

// app.use(ErrorController);

module.exports = app;
