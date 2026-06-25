import { calculateCoachRating, getCoachInfluence } from "./coachRating";

/**
 * Calculate a basic player power score
 * (temporary version — later replace with statsEngine.js)
 */
function getPlayerPower(player) {
  if (!player) return 0;

  const di = player.DI || 0;
  const mk = player.MK || 0;
  const gl = player.GL || 0;
  const tk = player.TK || 0;
  const ho = player.HO || 0;

  // Weighted contribution model
  return (
    di * 0.25 +
    mk * 0.2 +
    gl * 2.5 +
    tk * 0.5 +
    ho * 0.3
  );
}

/**
 * Calculate team strength from squad
 */
function getTeamStrength(players = []) {
  if (players.length === 0) return 0;

  const total = players.reduce((sum, p) => {
    return sum + getPlayerPower(p);
  }, 0);

  return total / players.length;
}

/**
 * Run full season simulation (26 games)
 */
export function simulateSeason({
  players = [],
  coach = null,
  difficulty = "NORMAL"
}) {
  const coachRating = calculateCoachRating(coach);
  const coachMultiplier = getCoachInfluence(coachRating);

  const baseTeamStrength = getTeamStrength(players);

  // Difficulty scaling
  let difficultyMultiplier = 1;

  switch (difficulty) {
    case "EASY":
      difficultyMultiplier = 0.85;
      break;
    case "HARD":
      difficultyMultiplier = 1.15;
      break;
    case "LEGENDARY":
      difficultyMultiplier = 1.3;
      break;
    default:
      difficultyMultiplier = 1;
  }

  const adjustedStrength =
    baseTeamStrength * coachMultiplier * difficultyMultiplier;

  let wins = 0;
  let losses = 0;
  let draws = 0;

  const gameLog = [];

  for (let round = 1; round <= 26; round++) {
    // Opponent strength is semi-random but stable range
    const opponentStrength =
      60 + Math.random() * 40; // 60–100 range

    const noise =
      (Math.random() - 0.5) * 10; // randomness factor

    const finalTeamScore = adjustedStrength + noise;
    const finalOpponentScore = opponentStrength;

    let result = "LOSS";

    if (finalTeamScore > finalOpponentScore + 5) {
      result = "WIN";
      wins++;
    } else if (finalTeamScore < finalOpponentScore - 5) {
      result = "LOSS";
      losses++;
    } else {
      result = "DRAW";
      draws++;
    }

    gameLog.push({
      round,
      teamScore: Math.round(finalTeamScore),
      opponentScore: Math.round(finalOpponentScore),
      result
    });
  }

  const perfectSeason = wins === 26;

  return {
    wins,
    losses,
    draws,
    perfectSeason,
    gameLog,
    rating: adjustedStrength
  };
}
