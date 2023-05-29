const express = require("express");
const app = express();
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const setNoSniffHeader = require('./middleware/expressAddons');
const mime = require('mime');


const errorController = require('./controllers/ErrorController');
const { loginView } = require('./controllers/loginController');

app.use(express.static("static"));
app.use(setNoSniffHeader)
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: "80000000000000000000085",
    saveUninitialized:true,
    cookie: { maxAge: 259200000 }, // 3 days
    resave: false
}));
app.use(cookieParser())


const gamePage = require("./routes/authRoute");
const errorPage = require("./routes/gameRoute");

app.use("/", gamePage);

app.use("/error", errorPage);

module.exports = app;
