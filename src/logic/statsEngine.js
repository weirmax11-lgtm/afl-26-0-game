export function calculatePlayerAverages(player) {
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
export const weights = {
  marks: 1.0,
  disposals: 1.2,
  goals: 4.0,
  behinds: 1.5,
  hitouts: 1.3,
  tackles: 2.0,
  brownlow: 3.0
};
export function calculatePlayerRating(avgStats) {
  return (
    avgStats.marks * 1.0 +
    avgStats.disposals * 1.2 +
    avgStats.goals * 4.0 +
    avgStats.behinds * 1.5 +
    avgStats.hitouts * 1.3 +
    avgStats.tackles * 2.0 +
    avgStats.brownlow * 3.0
  );
}
