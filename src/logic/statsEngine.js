/**
 * statsEngine.js
 * Core AFL player + team rating system
 * Converts raw historical stats into simulation-ready ratings
 */

// -----------------------------
// ⚖️ WEIGHTS (tuneable balance layer)
// -----------------------------
const WEIGHTS = {
  marks: 1.25,        // MK
  disposals: 1.6,     // DI
  goals: 3.2,         // GL
  behinds: 0.8,       // BH
  hitouts: 1.9,       // HO
  tackles: 2.1,       // TK
  brownlow: 4.5       // BR (elite performance signal)
};

// scaling dampener so eras don’t explode ratings
const NORMALISATION_FACTOR = 1.0;

// -----------------------------
// 🧼 SAFE HELPERS
// -----------------------------
function safeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function safeDivide(a, b) {
  return b === 0 ? 0 : a / b;
}

// -----------------------------
// 🧬 PLAYER NORMALISATION
// Converts season totals → per game rates
// -----------------------------
export function normalizePlayerStats(player) {
  const games = Math.max(safeNumber(player.GM), 1);

  return {
    marks: safeDivide(safeNumber(player.MK), games),
    disposals: safeDivide(safeNumber(player.DI), games),
    goals: safeDivide(safeNumber(player.GL), games),
    behinds: safeDivide(safeNumber(player.BH), games),
    hitouts: safeDivide(safeNumber(player.HO), games),
    tackles: safeDivide(safeNumber(player.TK), games),
    brownlow: safeDivide(safeNumber(player.BR), games)
  };
}

// -----------------------------
// 🧠 PLAYER RATING ENGINE
// Single scalar value representing overall impact
// -----------------------------
export function calculatePlayerRating(stats) {
  const rating =
    stats.marks * WEIGHTS.marks +
    stats.disposals * WEIGHTS.disposals +
    stats.goals * WEIGHTS.goals +
    stats.behinds * WEIGHTS.behinds +
    stats.hitouts * WEIGHTS.hitouts +
    stats.tackles * WEIGHTS.tackles +
    stats.brownlow * WEIGHTS.brownlow;

  return rating * NORMALISATION_FACTOR;
}

// -----------------------------
// 🏉 FULL PLAYER PIPELINE
// raw player → rating
// -----------------------------
export function evaluatePlayer(player) {
  const normalized = normalizePlayerStats(player);
  const rating = calculatePlayerRating(normalized);

  return {
    name: player.Player,
    team: player.Team,
    year: player.Year,
    rating,
    perGame: normalized
  };
}

// -----------------------------
// 👥 TEAM AGGREGATION
// builds team strength from selected squad
// -----------------------------
export function calculateTeamRating(players = [], coach = null) {
  if (!players.length) return 0;

  const evaluated = players.map(evaluatePlayer);

  const total = evaluated.reduce((sum, p) => sum + p.rating, 0);
  const avgPlayerRating = total / evaluated.length;

  const coachRating = coach ? calculateCoachRating(coach) : 50;

  // coaching influence is intentionally smaller than player base
  const teamRating =
    avgPlayerRating * 0.82 +
    coachRating * 0.18;

  return {
    teamRating,
    avgPlayerRating,
    coachRating,
    playerBreakdown: evaluated
  };
}

// -----------------------------
// 👔 COACH RATING SYSTEM
// blends success + premiership weight
// -----------------------------
export function calculateCoachRating(coach) {
  if (!coach) return 50;

  const winRate = safeNumber(coach.Total_Pct);
  const wins = safeNumber(coach.Total_W);
  const losses = safeNumber(coach.Total_L);
  const draws = safeNumber(coach.Total_D);

  // stability factor (coaches who sustain high sample size matter more)
  const experienceFactor = Math.log10(wins + losses + draws + 1) * 5;

  // premiership multiplier (very important in AFL context)
  const premiershipBonus = safeNumber(coach.PR) * 12;

  // finals success signal
  const gfBonus = safeNumber(coach.GF) * 3;

  const rating =
    winRate +
    experienceFactor +
    premiershipBonus +
    gfBonus;

  return Math.max(0, Math.min(100, rating));
}

// -----------------------------
// 🎯 EXPORT SUMMARY (for debugging / UI)
// -----------------------------
export function debugTeamRating(players, coach) {
  const result = calculateTeamRating(players, coach);

  return {
    ...result,
    meta: {
      playerCount: players.length,
      coachName: coach?.Coach || "None"
    }
  };
}
