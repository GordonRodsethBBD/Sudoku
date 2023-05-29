const Request = require("tedious").Request;
const {ErrorController, AsyncError} = require("../controllers/ErrorController");
const bcrypt = require("bcryptjs");
const path = require("path");
// const { connection } = require("../config/connectDatabase");

// endpoint => /register
const registerPage = (req, res) => {
  res.sendFile("register.html", { root: path.join(__dirname, "../pages/register") });
};

// endpoint => /login
const loginPage = (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "../pages/login") });
  console.log("Navigating to login")
};

//endpoint => /auth/login
const loginCallback = AsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorController("Required fields missing.", 400));
  }

  const querySelectUser = `SELECT * FROM users WHERE email = '${email}'`;  // TODO: Add Query Sanitization

  const requestAllUsers = new Request( querySelectUser,
    (err, rowCount, rows) => {
      if (err) return next(new ErrorController());
      if (rowCount === 0) return next(new ErrorController("Invalid Credentails.", 401));
    }
  );

  connection.execSql(
    requestAllUsers.on("doneInProc", async function (rowCount, more, rows) {
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
    session.email = email

    res.status(200).json({
      success: true,
      message: 'Login Successfully',
      redirectPath: "/start",
    });
});


// endpoint => /auth/register
// TODO: Add the script for each page here, they'll execute when the user is navigated to to the respective page 
const registerCallback = async (req, res, next) => {
  const { email, username, password, confirm_password } = req.body;

  if (password != confirm_password) {
    return next(new ErrorController("Passwords don't match.", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const queryInsertUser = `INSERT INTO users (username, email, password) VALUES ( '${username}', '${email}', '${hashedPassword}')`;

  let requestInsertUser = new Request(queryInsertUser, function (err, rowCount, rows) {
    if (err) {
      return next(new ErrorController());
    }

    if (rowCount === 0 || rowCount === undefined) {
      return next(new ErrorController("Incorrect Details Supplied", 401));
    }
  });

  connection.execSql(
    requestInsertUser.on("doneInProc", async function (rowCount, more, rows) {
      //TODO: Figure out how to catch duplicate error problem
      if (rowCount === 0 || rowCount === undefined) {
        return next(new ErrorController("Incorrect Details Supplied", 401));
      }
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
