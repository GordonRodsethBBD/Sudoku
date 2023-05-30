const app = require("./app");
const port = 8080;

const { connectToDatabase, connection } = require("./controllers/dbController");

// const {tests} = require("./controllers/initDBController");

const authRoutes = require("./routes/authRoute");
const gameRoutes = require("./routes/gameRoute");


process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err}`);
  process.exit(1);
});

connectToDatabase();


// don't put any routes after this point
app.get('*', function(req, res){
  res.send('Error 404: Invalid URL.');
});

const server = app.listen(port, () => {
  console.log(`Server started on PORT: 8080 in ${process.env.NODE_ENV} environment`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Promise Rejection: ${err}`);
  server.close(() => process.exit(1));
});

