export function calculateCoachRating(coach) {
  const winRate = coach.Total_Pct || 50;

  const premiershipBonus = (coach.PR || 0) * 15;

  return winRate + premiershipBonus;
}
