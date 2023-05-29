const express = require("express");
const app = express();
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const setNoSniffHeader = require('./middleware/expressAddons');
const mime = require('mime');


const authRoutes = require("./routes/authRoute");
const gameRoutes = require("./routes/gameRoute");

const { ErrorController, AsyncError } = require('./controllers/ErrorController');


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
app.use(express.static("app/static"))



app.use("/", authRoutes);
app.use("/", gameRoutes);


// app.use(ErrorController);

module.exports = app;
