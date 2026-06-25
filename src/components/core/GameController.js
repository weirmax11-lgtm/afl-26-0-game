import { useState } from "react";
import { spin } from "../input/Wheel";

// You will plug these in later
import { calculateTeamStrength } from "../../logic/statsEngine";
import { calculateCoachRating } from "../../logic/coachRating";
import { simulateSeason } from "../../logic/simulation";

export default function GameController() {
  // 🎯 Core game state
  const [team, setTeam] = useState(null);
  const [era, setEra] = useState(null);

  const [players, setPlayers] = useState([]);
  const [coach, setCoach] = useState(null);

  const [teamStrength, setTeamStrength] = useState(null);
  const [coachRating, setCoachRating] = useState(null);

  const [seasonResult, setSeasonResult] = useState(null);

  // 🎰 Step 1: Spin wheel (team + era)
  function handleSpin() {
    const result = spin();
    setTeam(result.team);
    setEra(result.era);

    // reset downstream state
    setPlayers([]);
    setCoach(null);
    setSeasonResult(null);
  }

  // 🧑‍🤝‍🧑 Step 2: receive players from selector
  function handlePlayersSelected(selectedPlayers) {
    setPlayers(selectedPlayers);
  }

  // 🧑‍🏫 Step 3: receive coach
  function handleCoachSelected(selectedCoach) {
    setCoach(selectedCoach);
  }

  // 🧮 Step 4: calculate ratings
  function calculateRatings() {
    if (!players.length || !coach) return;

    const tStrength = calculateTeamStrength(players, 0); // placeholder coach influence
    const cRating = calculateCoachRating(coach);

    setTeamStrength(tStrength);
    setCoachRating(cRating);
  }

  // 🏆 Step 5: simulate season
  function runSeason() {
    if (!teamStrength || !coachRating) return;

    const result = simulateSeason(teamStrength + coachRating);
    setSeasonResult(result);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>26-0 AFL Controller</h1>

      {/* 🎰 Spin Section */}
      <button onClick={handleSpin} style={{ padding: 10 }}>
        Spin Team + Era 🎡
      </button>

      {team && era && (
        <h2>
          Selected: {team} ({era})
        </h2>
      )}

      {/* 🧠 Placeholder hooks for future UI */}
      <div style={{ marginTop: 20 }}>
        <button onClick={calculateRatings} disabled={!players.length || !coach}>
          Calculate Ratings 🧮
        </button>

        <button
          onClick={runSeason}
          disabled={!teamStrength || !coachRating}
          style={{ marginLeft: 10 }}
        >
          Simulate Season 🏆
        </button>
      </div>

      {/* 📊 Results */}
      {seasonResult && (
        <div style={{ marginTop: 20 }}>
          <h2>Season Result</h2>
          <p>Wins: {seasonResult.wins}</p>
          <p>Losses: {seasonResult.losses}</p>
          <p>
            {seasonResult.perfectSeason
              ? "🏆 26–0 PERFECT SEASON!"
              : "Season complete"}
          </p>
        </div>
      )}
    </div>
  );
}
