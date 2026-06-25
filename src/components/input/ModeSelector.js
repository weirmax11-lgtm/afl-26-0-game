import { useState } from "react";

export default function ModeSelector({ onChange }) {
  const [mode, setMode] = useState("CLASSIC_22");

  function handleChange(newMode) {
    setMode(newMode);
    if (onChange) onChange(newMode);
  }

  return (
    <div style={styles.container}>
      <h3>🎮 Game Mode</h3>

      <div style={styles.options}>
        <button
          onClick={() => handleChange("CLASSIC_22")}
          style={{
            ...styles.button,
            background:
              mode === "CLASSIC_22" ? "#2e7d32" : "#eee",
            color: mode === "CLASSIC_22" ? "#fff" : "#000"
          }}
        >
          Classic 22
        </button>

        <button
          onClick={() => handleChange("CLASSIC_5")}
          style={{
            ...styles.button,
            background:
              mode === "CLASSIC_5" ? "#2e7d32" : "#eee",
            color: mode === "CLASSIC_5" ? "#fff" : "#000"
          }}
        >
          Classic 5
        </button>

        <button
          onClick={() => handleChange("IQ_22")}
          style={{
            ...styles.button,
            background:
              mode === "IQ_22" ? "#2e7d32" : "#eee",
            color: mode === "IQ_22" ? "#fff" : "#000"
          }}
        >
          Footy IQ 22
        </button>

        <button
          onClick={() => handleChange("IQ_5")}
          style={{
            ...styles.button,
            background:
              mode === "IQ_5" ? "#2e7d32" : "#eee",
            color: mode === "IQ_5" ? "#fff" : "#000"
          }}
        >
          Footy IQ 5
        </button>
      </div>

      <p style={styles.current}>
        Selected: <strong>{mode}</strong>
      </p>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    padding: 10
  },

  options: {
    display: "grid",
    gap: 10,
    marginTop: 10
  },

  button: {
    padding: 10,
    cursor: "pointer",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  },

  current: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.7
  }
};
