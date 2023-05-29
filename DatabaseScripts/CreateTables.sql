CREATE TABLE tblGame (
  id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  userId INT NOT NULL,
  duration INT NOT NULL,
  levelId INT NOT NULL,
  FOREIGN KEY (levelId) REFERENCES tblLevel(id),
  FOREIGN KEY (userId) REFERENCES tblUser(id)
);

CREATE TABLE tblLeaderboard (
  id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  gameId INT,
  levelId INT,
  userId INT,
  FOREIGN KEY (gameId) REFERENCES tblGame(id),
  FOREIGN KEY (levelId) REFERENCES tblLevel(id),
  FOREIGN KEY (userId) REFERENCES tblUser(id)
);

CREATE TABLE tblUser (
  id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  emailHash VARCHAR(150) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL
);

CREATE TABLE tblLevel (
  id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  hiddenSquares INT NOT NULL,
  title VARCHAR(30) NOT NULL
);
