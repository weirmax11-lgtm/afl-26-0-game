export function calculateCoachRating(coach) {
  const totalGames = coach.Total_W + coach.Total_L + coach.Total_D;

  const winRate = coach.Total_W / totalGames;

  return (
    winRate * 50 +
    coach.Total_Pct * 0.3 +
    coach.PR * 10 +
    coach.GF * 5
  );
}
