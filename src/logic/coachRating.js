export function calculateCoachRating(coach) {
  if (!coach) return 50; // neutral fallback

  const wins = coach.Total_W || 0;
  const losses = coach.Total_L || 0;
  const draws = coach.Total_D || 0;

  const games = wins + losses + draws;

  // Avoid divide-by-zero
  const winRate = games > 0 ? wins / games : 0;

  const winRateScore = winRate * 100;

  // Premiership impact (big multiplier)
  const premiershipBonus = (coach.PR || 0) * 8;

  // Grand Final consistency bonus
  const gfBonus = (coach.GF || 0) * 2;

  // Stability factor (penalise losing records slightly)
  const stabilityPenalty =
    losses > wins ? (losses - wins) * 0.5 : 0;

  // Raw composite score
  let rating =
    winRateScore +
    premiershipBonus +
    gfBonus -
    stabilityPenalty;

  // Clamp to 0–100 range
  rating = Math.max(0, Math.min(100, rating));

  return Math.round(rating);
}

// Optional helper for tiering
export function getCoachTier(rating) {
  if (rating >= 80) return "Elite Tactical Mind";
  if (rating >= 65) return "Strong Game Planner";
  if (rating >= 50) return "Solid Coach";
  if (rating >= 35) return "Developing Coach";
  return "Struggling Coach";
}

// Optional helper for simulation influence
export function getCoachInfluence(rating) {
  // returns multiplier for simulation engine
  // 1.0 = neutral, >1 = boosts team, <1 = weakens team
  return 0.85 + rating / 200;
}
