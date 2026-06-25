export function calculateTeamRating(players, coach) {
  const playerRatings = players.map(p =>
    calculatePlayerRating(normalizePlayerStats(p))
  );

  const avgPlayerRating =
    playerRatings.reduce((a, b) => a + b, 0) / playerRatings.length;

  const coachRating = calculateCoachRating(coach);

  return (avgPlayerRating * 0.8) + (coachRating * 0.2);
}
