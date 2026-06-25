/**
 * simulation.js
 * AFL Season Simulation Engine
 * Converts team ratings into a full season + finals outcome
 */

import { calculateTeamRating } from "./statsEngine";

// -----------------------------
// 🧼 UTILITIES
// -----------------------------
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function safeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

// -----------------------------
// ⚔️ MATCH SIMULATION CORE
// -----------------------------
function simulateMatch(teamA, teamB) {
  const ratingA = teamA.rating;
  const ratingB = teamB.rating;

  // home advantage + unpredictability factor
  const homeAdvantage = randomRange(-2.5, 2.5);
  const varianceA = randomRange(-8, 8);
  const varianceB = randomRange(-8, 8);

  const adjustedA = ratingA + homeAdvantage + varianceA;
  const adjustedB = ratingB + varianceB;

  const margin = adjustedA - adjustedB;

  return {
    winner: margin === 0 ? "draw" : margin > 0 ? teamA.name : teamB.name,
    margin: Math.round(margin),
    scoreA: Math.round(adjustedA),
    scoreB: Math.round(adjustedB)
  };
}

// -----------------------------
// 🏉 TEAM WRAPPER
// -----------------------------
function buildTeam(name, players, coach) {
  const ratingData = calculateTeamRating(players, coach);

  return {
    name,
    rating: ratingData.teamRating,
    players,
    coach,
    breakdown: ratingData
  };
}

// -----------------------------
// 📅 SEASON GENERATION (23 rounds)
// -----------------------------
function generateFixture(teams) {
  const fixture = [];

  for (let round = 1; round <= 23; round++) {
    const roundMatches = [];

    const shuffled = [...teams].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffled.length; i += 2) {
      if (shuffled[i + 1]) {
        roundMatches.push({
          home: shuffled[i],
          away: shuffled[i + 1]
        });
      }
    }

    fixture.push({
      round,
      matches: roundMatches
    });
  }

  return fixture;
}

// -----------------------------
// 📊 LADDER SYSTEM
// -----------------------------
function createLadder(teams) {
  const ladder = {};

  teams.forEach(team => {
    ladder[team.name] = {
      team: team.name,
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0,
      for: 0,
      against: 0
    };
  });

  return ladder;
}

function updateLadder(ladder, match) {
  const { home, away, result } = match;

  const homeData = ladder[home.name];
  const awayData = ladder[away.name];

  homeData.for += result.scoreA;
  homeData.against += result.scoreB;

  awayData.for += result.scoreB;
  awayData.against += result.scoreA;

  if (result.winner === home.name) {
    homeData.wins++;
    awayData.losses++;
    homeData.points += 4;
  } else if (result.winner === away.name) {
    awayData.wins++;
    homeData.losses++;
    awayData.points += 4;
  } else {
    homeData.draws++;
    awayData.draws++;
    homeData.points += 2;
    awayData.points += 2;
  }
}

// -----------------------------
// 🏟️ FULL SEASON SIMULATION
// -----------------------------
export function simulateSeason(teamInputs) {
  const teams = teamInputs.map(t =>
    buildTeam(t.name, t.players, t.coach)
  );

  const ladder = createLadder(teams);
  const fixture = generateFixture(teams);

  const matchHistory = [];

  fixture.forEach(round => {
    round.matches.forEach(match => {
      const result = simulateMatch(match.home, match.away);

      const fullMatch = {
        round: round.round,
        home: match.home,
        away: match.away,
        result
      };

      updateLadder(ladder, fullMatch);
      matchHistory.push(fullMatch);
    });
  });

  const finalLadder = Object.values(ladder).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const percentA = a.for - a.against;
    const percentB = b.for - b.against;
    return percentB - percentA;
  });

  return {
    ladder: finalLadder,
    matches: matchHistory,
    minorPremiers: finalLadder[0],
    undefeated: finalLadder.filter(t => t.losses === 0)
  };
}

// -----------------------------
// 🏆 FINALS SIMULATION (Top 8 system)
// -----------------------------
export function simulateFinals(ladder) {
  const top8 = ladder.slice(0, 8);

  const qf1 = simulateMatch(top8[0], top8[3]);
  const qf2 = simulateMatch(top8[1], top8[2]);
  const qf3 = simulateMatch(top8[4], top8[7]);
  const qf4 = simulateMatch(top8[5], top8[6]);

  const winners = [
    qf1.winner === top8[0].name ? top8[0] : top8[3],
    qf2.winner === top8[1].name ? top8[1] : top8[2],
    qf3.winner === top8[4].name ? top8[4] : top8[7],
    qf4.winner === top8[5].name ? top8[5] : top8[6]
  ];

  const sf1 = simulateMatch(winners[0], winners[1]);
  const sf2 = simulateMatch(winners[2], winners[3]);

  const gf = simulateMatch(
    sf1.winner === winners[0].name ? winners[0] : winners[1],
    sf2.winner === winners[2].name ? winners[2] : winners[3]
  );

  return {
    quarterFinals: [qf1, qf2, qf3, qf4],
    semiFinals: [sf1, sf2],
    grandFinal: gf,
    premier: gf.winner
  };
}

// -----------------------------
// 🎯 SPECIAL MODE: 26–0 CHECK
// -----------------------------
export function checkUndefeatedSeason(seasonResult) {
  const undefeated = seasonResult.undefeated || [];

  return {
    isPerfectSeason: undefeated.length === 1,
    teams: undefeated.map(t => t.team),
    achieved26_0: undefeated.length === 1
  };
}

// -----------------------------
// 🎮 FULL SIMULATION WRAPPER
// -----------------------------
export function runFullSimulation(teamInputs) {
  const season = simulateSeason(teamInputs);
  const finals = simulateFinals(season.ladder);
  const streak = checkUndefeatedSeason(season);

  return {
    season,
    finals,
    streak,
    champion: finals.premier
  };
}
