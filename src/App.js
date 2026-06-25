import { useState } from "react";

import Header from "./components/ui/Header";
import ModeSelector from "./components/ui/ModeSelector";
import SettingsPanel from "./components/ui/SettingsPanel";

import Wheel, { spin } from "./components/input/Wheel";
import PlayerSelector from "./components/input/PlayerSelector";

import CoachBadge from "./components/team/CoachBadge";
import RosterBuilder from "./components/team/RosterBuilder";

import { simulateSeason } from "./logic/simulation";

import ResultsPanel from "./components/results/ResultsPanel";
import SeasonSummary from "./components/results/SeasonSummary";
import TeamRatingMeter from "./components/results/TeamRatingMeter";

import { calculateCoachRating } from "./logic/coachRating";
import { calculateTeamStrength } from "./logic/statsEngine";

function App() {
  const [team, setTeam] = useState(null);
  const [era, setEra] = useState(null);

  const [mode, setMode] = useState("CLASSIC_22");
  const [settings, setSettings] = useState({
    showStats: true,
    difficulty: "NORMAL"
  });

  const [players, setPlayers] = useState([]);
  const [coach, setCoach] = useState(null);

  const [result, setResult] = useState(null);
  const [seasonResult, setSeasonResult] = useState(null);

  // 🎡 Spin wheel
  function handleSpin() {
    const res = spin();
    setTeam(res.team);
    setEra(res.era);
  }

  // 🧑‍🤝‍🧑 Update squad
  function handleRosterUpdate(updatedPlayers) {
    setPlayers(updatedPlayers);
  }

  // 🧑‍🏫 Select coach (placeholder hook)
  function handleCoachSelect(selectedCoach) {
    setCoach(selectedCoach);
  }

  // ⚙️ Run simulation
  function handleSimulate() {
    const season = simulateSeason({
      players,
      coach,
      difficulty: settings.difficulty
    });

    setSeasonResult(season);
    setResult(season);
  }

  const coachRating = calculateCoachRating(coach);

  const teamStrength = calculateTeamStrength({
    players,
    roles: players.map(() => "UTIL"),
    era: era || "2000s"
  });

  return (
    <div>
      {/* 🧭 Header */}
      <Header
        team={team}
        era={era}
        mode={mode}
        onReset={() => {
          setTeam(null);
          setEra(null);
          setPlayers([]);
          setCoach(null);
          setResult(null);
        }}
      />

      {/* ⚙️ Settings */}
      <SettingsPanel onSettingsChange={setSettings} />

      {/* 🎮 Mode */}
      <ModeSelector onChange={setMode} />

      {/* 🎡 Wheel */}
      <Wheel onSpin={handleSpin} />

      {/* 🧑‍🏫 Coach */}
      {coach && <CoachBadge coach={coach} />}

      {/* 🧑‍🤝‍🧑 Players */}
      <PlayerSelector
        players={[]} // plug JSON here later
        team={team}
        era={era}
        onChange={handleRosterUpdate}
      />

      {/* 🧾 Roster */}
      <RosterBuilder
        players={players}
        mode={mode}
        onUpdate={handleRosterUpdate}
      />

      {/* 🏉 Team Rating */}
      <TeamRatingMeter
        rating={teamStrength + coachRating}
      />

      {/* ⚙️ Simulate */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button onClick={handleSimulate}>
          Run Season Simulation 🏆
        </button>
      </div>

      {/* 🏆 Results */}
      {result && (
        <>
          <ResultsPanel result={result} />

          <SeasonSummary
            result={seasonResult}
            team={team}
            era={era}
            mode={mode}
          />
        </>
      )}
    </div>
  );
}

export default App;
