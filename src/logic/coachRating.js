/**
 * coachRating.js
 * Comprehensive AFL coach evaluation system
 * Converts historical coaching data into simulation-ready ratings
 */

// -----------------------------
// 🧼 SAFE UTILITIES
// -----------------------------
function safeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// -----------------------------
// ⚖️ CORE WEIGHT CONFIG
// (tuneable for game balance)
// -----------------------------
const COACH_WEIGHTS = {
  winRate: 0.55,        // consistency across season
  experience: 0.15,     // longevity & sample size
  premierships: 0.20,   // ultimate success marker
  finals: 0.10          // GF appearances / big stage presence
};

// max scaling caps (prevents stat inflation from long careers)
const CAPS = {
  maxWinRateImpact: 60,
  maxExperienceImpact: 15,
  maxPremiershipImpact: 25,
  maxFinalsImpact: 15
};

// -----------------------------
// 📊 RAW METRICS EXTRACTOR
// -----------------------------
function extractCoachMetrics(coach) {
  const wins = safeNumber(coach.Total_W);
  const losses = safeNumber(coach.Total_L);
  const draws = safeNumber(coach.Total_D);

  const totalGames = Math.max(wins + losses + draws, 1);

  const winRate = safeNumber(coach.Total_Pct) || (wins / totalGames) * 100;

  return {
    wins,
    losses,
    draws,
    totalGames,
    winRate,
    premierships: safeNumber(coach.PR),
    grandFinals: safeNumber(coach.GF)
  };
}

// -----------------------------
// 🧠 EXPERIENCE SCORING
// rewards longevity but with diminishing returns
// -----------------------------
function calculateExperienceScore(totalGames) {
  // logarithmic scaling avoids punishing short careers too harshly
  const raw = Math.log10(totalGames + 1) * 10;

  return clamp(raw, 0, CAPS.maxExperienceImpact);
}

// -----------------------------
// 🏆 PREMIERSHIP IMPACT
// strongest single factor in AFL coaching legacy
// -----------------------------
function calculatePremiershipScore(pr) {
  const raw = pr * 18; // each premiership is massive

  return clamp(raw, 0, CAPS.maxPremiershipImpact);
}

// -----------------------------
// 🥇 FINALS / GRAND FINAL PRESENCE
// measures big-stage consistency
// -----------------------------
function calculateFinalsScore(gfAppearances) {
  const raw = gfAppearances * 6;

  return clamp(raw, 0, CAPS.maxFinalsImpact);
}

// -----------------------------
// 📈 WIN RATE SCORING
// normalized performance metric
// -----------------------------
function calculateWinRateScore(winRate) {
  // curve reward: 50% = baseline, 70%+ becomes elite
  const adjusted = (winRate - 40) * 1.2;

  return clamp(adjusted, 0, CAPS.maxWinRateImpact);
}

// -----------------------------
// 👔 MAIN COACH RATING FUNCTION
// -----------------------------
export function calculateCoachRating(coach) {
  if (!coach) return 50;

  const metrics = extractCoachMetrics(coach);

  const winRateScore = calculateWinRateScore(metrics.winRate);
  const experienceScore = calculateExperienceScore(metrics.totalGames);
  const premiershipScore = calculatePremiershipScore(metrics.premierships);
  const finalsScore = calculateFinalsScore(metrics.grandFinals);

  const rawRating =
    winRateScore * COACH_WEIGHTS.winRate +
    experienceScore * COACH_WEIGHTS.experience +
    premiershipScore * COACH_WEIGHTS.premierships +
    finalsScore * COACH_WEIGHTS.finals;

  // normalize to 0–100 scale
  return clamp(rawRating, 0, 100);
}

// -----------------------------
// 🧪 COACH PROFILE DEBUGGER
// useful for UI tooltips / dev inspection
// -----------------------------
export function evaluateCoach(coach) {
  const metrics = extractCoachMetrics(coach);
  const rating = calculateCoachRating(coach);

  return {
    name: coach.Coach,
    team: coach.Team_Slug,
    rating,
    breakdown: {
      winRate: metrics.winRate,
      wins: metrics.wins,
      losses: metrics.losses,
      draws: metrics.draws,
      premierships: metrics.premierships,
      grandFinals: metrics.grandFinals,
      totalGames: metrics.totalGames
    }
  };
}

// -----------------------------
// ⚖️ TEAM COACH COMPARISON HELPERS
// (future-proof for AI matchups / ladder simulation)
// -----------------------------
export function compareCoaches(coachA, coachB) {
  const ratingA = calculateCoachRating(coachA);
  const ratingB = calculateCoachRating(coachB);

  return {
    coachA: coachA?.Coach,
    coachB: coachB?.Coach,
    ratingA,
    ratingB,
    advantage: ratingA === ratingB ? "even" : ratingA > ratingB ? "A" : "B"
  };
}

// -----------------------------
// 📦 DEFAULT EXPORT (optional usage style)
// -----------------------------
export default {
  calculateCoachRating,
  evaluateCoach,
  compareCoaches
};
