const Request = require("tedious").Request;
const {ErrorController, AsyncError} = require("../controllers/ErrorController");
const bcrypt = require("bcryptjs");
const path = require("path");
const { connection } = require("../services/dbConnection");


// endpoint => /register
const registerPage = (req, res) => {
  res.sendFile("register.html", { root: path.join(__dirname, "../pages/register") });
  console.log("Navigating to register page...");
};



// endpoint => /login
const loginPage = (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "../pages/login") });
  console.log("Navigating to login")
};

//endpoint => /auth/login?email={email}&password={password}
const loginCallback = AsyncError(async (req, res, next) => {
  // TODO: params email, password
  console.log("Login Callback Initiated - request.params =", req.params);
  console.log("Login Callback Initiated - request.body =", req.body);
  const { email, password } = req.body;

  if (!email || !password) return next(new ErrorController("Missing required fields.", 400));

  const querySelectUser = `SELECT * FROM tblUsers WHERE email = '${email}'`;  // TODO: Add Query Sanitization


  const requestAllUsers = new Request(
    querySelectUser,
    (err, rowCount, rows) => {
      if (err) return next(new ErrorController(err, 500));
      if (rowCount == 0) return next(loginPage);
    }
  );

  connection.execSql(
    requestAllUsers.on("doneInProc", async  (rowCount, more, rows) => {
        console.log(querySelectUser, ": \n",rows);
        if (rowCount >= 1) {
            const isPasswordMatched = await bcrypt.compare(
            password,
            rows[0][3].value
            );
            if (!isPasswordMatched) {
            return next(new ErrorController("Invalid Email or Password.", 401));
        }
      }
    }));

    session = req.session;
    session.email = email;

    res.sendFile("register.html", { root: path.join(__dirname, "../pages/register") });
    res.status(200).json({
      success: true,
      message: 'Login Successful',
    });

});


// endpoint => /auth/register?email={email}&username={username}&password={password}&confirm_password={confirm_password}
const registerCallback = async (req, res, next) => {
  const { name, email, password, password_confirm } = req.body;

  if (password != password_confirm) return next(new ErrorController("Please confirm your password.", 400));

  // const email_hash = await bcrypt.hash(email, 15);
  const password_hash = await bcrypt.hash(password, 15);
  const queryInsertUser = `INSERT INTO tblUsers (username, email, password) VALUES ( '${username}', '${email}', '${password_hash}')`;


  let requestInsertUser = new Request(queryInsertUser,  (err, rowCount, rows) => {
    if (err) return next(new ErrorController(err, 500));
    if (rowCount == 0) return next(new ErrorController());
  });

  connection.execSql(
    requestInsertUser.on("doneInProc", async  (rowCount, more, rows) => {
      if (rowCount == 0 ) return next(new ErrorController());
    })
  );

  res.status(200).json({
    success: true,
    message: "Register successful",
    redirectPath: "/login",
  });
};


module.exports = {
  registerPage,
  loginPage,
  registerCallback,
  loginCallback,
};
