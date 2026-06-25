import { useState } from "react";

export default function SettingsPanel({
  onSettingsChange
}) {
  const [settings, setSettings] = useState({
    showStats: true,
    difficulty: "NORMAL",
    simulationSpeed: "NORMAL"
  });

  function updateSetting(key, value) {
    const updated = {
      ...settings,
      [key]: value
    };

    setSettings(updated);

    if (onSettingsChange) {
      onSettingsChange(updated);
    }
  }

  return (
    <div style={styles.container}>
      <h3>⚙️ Settings Panel</h3>

      {/* Stats visibility */}
      <div style={styles.row}>
        <label>
          <input
            type="checkbox"
            checked={settings.showStats}
            onChange={(e) =>
              updateSetting("showStats", e.target.checked)
            }
          />
          Show Player Stats
        </label>
      </div>

      {/* Difficulty */}
      <div style={styles.row}>
        <label>Difficulty:</label>
        <select
          value={settings.difficulty}
          onChange={(e) =>
            updateSetting("difficulty", e.target.value)
          }
        >
          <option value="EASY">Easy</option>
          <option value="NORMAL">Normal</option>
          <option value="HARD">Hard</option>
          <option value="LEGENDARY">Legendary</option>
        </select>
      </div>

      {/* Simulation speed */}
      <div style={styles.row}>
        <label>Simulation Speed:</label>
        <select
          value={settings.simulationSpeed}
          onChange={(e) =>
            updateSetting("simulationSpeed", e.target.value)
          }
        >
          <option value="SLOW">Slow</option>
          <option value="NORMAL">Normal</option>
          <option value="FAST">Fast</option>
        </select>
      </div>

      {/* Live preview */}
      <div style={styles.preview}>
        <strong>Current Settings:</strong>
        <pre style={styles.code}>
{JSON.stringify(settings, null, 2)}
        </pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fafafa"
  },

  row: {
    marginTop: 10,
    fontSize: 14,
    display: "flex",
    gap: 10,
    alignItems: "center"
  },

  preview: {
    marginTop: 15,
    fontSize: 12,
    opacity: 0.8
  },

  code: {
    background: "#fff",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #eee"
  }
};
