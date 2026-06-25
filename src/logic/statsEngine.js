
/**
 * Normalize a stat to 0–1 range based on expected AFL ranges
 */
function normalize(value, max) {
  if (!value || value < 0) return 0;
  return Math.min(value / max, 1);
}

/**
 * Calculate player role weights based on mode or future position system
 */
function getRoleWeights() {
  return {
    DEF: {
      DI: 0.3,
      MK: 0.25,
      TK: 0.35,
      GL: 0.05,
      HO: 0.05
    },
    MID: {
      DI: 0.4,
      MK: 0.2,
      TK: 0.3,
      GL: 0.05,
      HO: 0.05
    },
    FWD: {
      DI: 0.2,
      MK: 0.2,
      TK: 0.1,
      GL: 0.4,
      HO: 0.1
    },
    RUCK: {
      DI: 0.2,
      MK: 0.1,
      TK: 0.1,
      GL: 0.05,
      HO: 0.55
    },
    UTIL: {
      DI: 0.25,
      MK: 0.25,
      TK: 0.25,
      GL: 0.15,
      HO: 0.1
    }
  };
}

/**
 * Calculate player rating based on role + stats
 */
export function calculatePlayerRating(player, role = "UTIL", eraMultiplier = 1) {
  if (!player) return 0;

  const weights = getRoleWeights()[role] || getRoleWeights().UTIL;

  const di = normalize(player.DI, 35);
  const mk = normalize(player.MK, 12);
  const tk = normalize(player.TK, 8);
  const gl = normalize(player.GL, 6);
  const ho = normalize(player.HO, 25);

  let rating =
    di * weights.DI +
    mk * weights.MK +
    tk * weights.TK +
    gl * weights.GL +
    ho * weights.HO;

  // Era adjustment (older eras = lower overall stat inflation)
  rating *= eraMultiplier;

  // Scale to 0–100
  return Math.round(rating * 100);
}

/**
 * Calculate team chemistry bonus
 * (simple version: encourages balanced squads)
 */
export function calculateTeamChemistry(players = []) {
  if (players.length === 0) return 1;

  let variance = 0;
  let avg = 0;

  const ratings = players.map(p =>
    calculatePlayerRating(p, "UTIL", 1)
  );

  avg =
    ratings.reduce((sum, r) => sum + r, 0) / ratings.length;

  ratings.forEach(r => {
    variance += Math.abs(r - avg);
  });

  const imbalance = variance / ratings.length;

  // Lower imbalance = higher chemistry
  let chemistry = 1 - imbalance / 100;

  return Math.max(0.75, Math.min(1.1, chemistry));
}

/**
 * Determine era multiplier
 */
export function getEraMultiplier(era) {
  switch (era) {
    case "1960s":
      return 0.85;
    case "1970s":
      return 0.9;
    case "1980s":
      return 0.95;
    case "1990s":
      return 1;
    case "2000s":
      return 1.05;
    case "2010s":
      return 1.1;
    case "2020s":
      return 1.15;
    default:
      return 1;
  }
}

/**
 * Full team strength engine (USED BY simulation.js)
 */
export function calculateTeamStrength({
  players = [],
  roles = [],
  era = "2000s"
}) {
  if (players.length === 0) return 0;

  const eraMultiplier = getEraMultiplier(era);
  const chemistry = calculateTeamChemistry(players);

  let total = 0;

  players.forEach((player, index) => {
    const role = roles[index] || "UTIL";

    const rating = calculatePlayerRating(
      player,
      role,
      eraMultiplier
    );

    total += rating;
  });

  const average = total / players.length;

  return average * chemistry;
}
