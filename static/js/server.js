const express = require('express');
const app = express();
const port = 3000;

// Placeholder data for the leaderboards
const leaderboardData = {
  easy: [
    { name: 'Player 1', time: '01:23' },
    { name: 'Player 2', time: '02:15' },
    { name: 'Player 3', time: '00:58' },
  ],
  intermediate: [
    { name: 'Player 4', time: '01:45' },
    { name: 'Player 5', time: '02:30' },
    { name: 'Player 6', time: '01:15' },
  ],
  expert: [
    { name: 'Player 7', time: '02:50' },
    { name: 'Player 8', time: '03:10' },
    { name: 'Player 9', time: '02:25' },
  ],
};

// Route to fetch the leaderboard for Easy level
app.get('/leaderboard/easy', (req, res) => {
  const leaderboard = leaderboardData.easy;
  res.json(leaderboard);
});

// Route to fetch the leaderboard for Intermediate level
app.get('/leaderboard/intermediate', (req, res) => {
  const leaderboard = leaderboardData.intermediate;
  res.json(leaderboard);
});

// Route to fetch the leaderboard for Expert level
app.get('/leaderboard/expert', (req, res) => {
  const leaderboard = leaderboardData.expert;
  res.json(leaderboard);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
