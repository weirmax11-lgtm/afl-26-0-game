export function normalizePlayerStats(player) {
  const games = player.GM || 1;

  return {
    marks: player.MK / games,
    disposals: player.DI / games,
    goals: player.GL / games,
    behinds: player.BH / games,
    hitouts: player.HO / games,
    tackles: player.TK / games,
    brownlow: player.BR / games
  };
}
const WEIGHTS = {
  marks: 1.2,
  disposals: 1.5,
  goals: 3.0,
  behinds: 0.8,
  hitouts: 1.8,
  tackles: 2.0,
  brownlow: 4.0
};
export function calculatePlayerRating(stats) {
  return (
    stats.marks * WEIGHTS.marks +
    stats.disposals * WEIGHTS.disposals +
    stats.goals * WEIGHTS.goals +
    stats.behinds * WEIGHTS.behinds +
    stats.hitouts * WEIGHTS.hitouts +
    stats.tackles * WEIGHTS.tackles +
    stats.brownlow * WEIGHTS.brownlow
  );
}
