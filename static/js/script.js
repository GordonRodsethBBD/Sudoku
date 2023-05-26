// Function to fetch leaderboard data and update the HTML elements
function fetchLeaderboardData(difficulty, elementId) {
  fetch(`/leaderboard/${difficulty}`)
    .then(response => response.json())
    .then(data => {
      const leaderboardElement = document.getElementById(elementId);
      leaderboardElement.innerHTML = '';

      data.forEach(entry => {
        const row = document.createElement('div');
        row.textContent = `Player: ${entry.name}, Time: ${entry.time}`;
        leaderboardElement.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching leaderboard data:', error);
    });
}

// Fetch the leaderboard data for each difficulty level
fetchLeaderboardData('easy', 'easy-leaderboard');
fetchLeaderboardData('intermediate', 'intermediate-leaderboard');
fetchLeaderboardData('expert', 'expert-leaderboard');
