const populateDB = `INSERT INTO tblGame (userId, duration, levelId)
VALUES
  (1, 30, 1),
  (2, 45, 1),
  (3, 60, 2),
  (4, 35, 2),
  (1, 50, 3),
  (2, 55, 3),
  (3, 40, 1),
  (4, 65, 2),
  (1, 70, 2),
  (2, 25, 3);


INSERT INTO tblLeaderboard (gameId, levelId, userId)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 3),
  (4, 2, 4),
  (5, 3, 1),
  (6, 3, 2),
  (7, 1, 3),
  (8, 2, 4),
  (9, 2, 1),
  (10, 3, 2);

INSERT INTO tblLeaderboard (gameId, levelId, userId)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 3),
  (4, 2, 4),
  (5, 3, 1),
  (6, 3, 2),
  (7, 1, 3),
  (8, 2, 4),
  (9, 2, 1),
  (10, 3, 2);

INSERT INTO tblLeaderboard (gameId, levelId, userId)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 3),
  (4, 2, 4),
  (5, 3, 1),
  (6, 3, 2),
  (7, 1, 3),
  (8, 2, 4),
  (9, 2, 1),
  (10, 3, 2);
`
const queryCreateTables = `CREATE TABLE tblGame (
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
`

module.exports = [
  queryCreateTables,
  populateDB
]