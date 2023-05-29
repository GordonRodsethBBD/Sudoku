const app = require("./app");
const port = 8080;
const { connectToDatabase, connection } = require("./controllers/dbController");
const {tests} = require("./controllers/initDBController");
const {gamePage, playCallback} = require("./controllers/gameController");
const {loginPage} = require("./controllers/loginController");

// TODO: Go to login page first, then go to game page once user is loggedIn


process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err}`);
  process.exit(1);
});

connectToDatabase();

const server = app.listen(port, () => {
  console.log(`Server started on PORT: 8080 in ${process.env.NODE_ENV} environment`);
});

app.get('/', loginPage);
// app.get("/game", gamePage);
app.get("resetDB", tests)

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Promise Rejection: ${err}`);
  server.close(() => process.exit(1));
});

