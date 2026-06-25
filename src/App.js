import { useState } from "react";

const teams = [
  "Adelaide", "Brisbane Lions", "Brisbane Bears", "Carlton", "Collingwood",
  "Essendon", "Fitzroy", "Fremantle", "Geelong",
  "Hawthorn", "Melbourne", "North Melbourne",
  "Richmond", "St Kilda", "Sydney", "West Coast",
  "Western Bulldogs"
];

const eras = ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];

function spin() {
  const team = teams[Math.floor(Math.random() * teams.length)];
  const era = eras[Math.floor(Math.random() * eras.length)];
  return { team, era };
}

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>26-0 AFL Simulator</h1>

      <button
        onClick={() => setResult(spin())}
        style={{ fontSize: 18, padding: 10 }}
      >
        Spin 🎰
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Result:</h2>
          <p>Team: {result.team}</p>
          <p>Era: {result.era}</p>
        </div>
      )}
    </div>
  );
}
