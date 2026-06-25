import { useState } from "react";

export default function GameStartScreen({ onStart }) {
  const [mode, setMode] = useState("CLASSIC_22");

  function handleStart() {
    if (onStart) {
      onStart(mode);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏉 26–0 AFL Simulator</h1>

      <p style={styles.subtitle}>
        Build your ultimate team and chase perfection.
      </p>

      <div style={styles.modeBox}>
        <h3>Select Game Mode</h3>

        <label>
          <input
            type="radio"
            value="CLASSIC_22"
            checked={mode === "CLASSIC_22"}
            onChange={(e) => setMode(e.target.value)}
          />
          Classic 22 (stats visible)
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="CLASSIC_5"
            checked={mode === "CLASSIC_5"}
            onChange={(e) => setMode(e.target.value)}
          />
          Classic 5 (simplified squad)
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="IQ_22"
            checked={mode === "IQ_22"}
            onChange={(e) => setMode(e.target.value)}
          />
          Footy IQ 22 (hidden stats)
        </label>

        <br />

        <label>
          <input
            type="radio"
            value="IQ_5"
            checked={mode === "IQ_5"}
            onChange={(e) => setMode(e.target.value)}
          />
          Footy IQ 5 (hidden + simplified)
        </label>
      </div>

      <button onClick={handleStart} style={styles.button}>
        Start Season 🚀
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    fontFamily: "Arial",
    textAlign: "center"
  },
  title: {
    fontSize: 36,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30
  },
  modeBox: {
    textAlign: "left",
    display: "inline-block",
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
    marginBottom: 20
  },
  button: {
    fontSize: 18,
    padding: "10px 20px",
    cursor: "pointer"
  }
};
