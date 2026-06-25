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
