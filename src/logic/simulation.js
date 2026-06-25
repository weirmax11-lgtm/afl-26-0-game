export function calculateTeamStrength(players, coachRating) {
  const playerTotal = players.reduce((sum, player) => sum + player.rating, 0);

  return playerTotal * (1 + coachRating / 100);
}
export function simulateSeason(teamStrength) {
  let wins = 0;

  for (let i = 0; i < 26; i++) {
    const opponentStrength = Math.random() * 1000;

    const winChance = teamStrength / (teamStrength + opponentStrength);

    if (Math.random() < winChance) {
      wins++;
    }
  }

  return {
    wins,
    losses: 26 - wins,
    perfectSeason: wins === 26
  };
}
