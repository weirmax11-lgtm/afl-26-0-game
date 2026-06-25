const teams = [
  "Adelaide",
  "Brisbane Lions",
  "Brisbane Bears",
  "Carlton",
  "Collingwood",
  "Essendon",
  "Fitzroy",
  "Fremantle",
  "Geelong",
  "Hawthorn",
  "Melbourne",
  "North Melbourne",
  "Port Adelaide",
  "Richmond",
  "St Kilda",
  "Sydney",
  "West Coast",
  "Western Bulldogs"
];

const eras = [
  "1960s",
  "1970s",
  "1980s",
  "1990s",
  "2000s",
  "2010s",
  "2020s"
];

// 🎰 core spin function
export function spin() {
  const team =
    teams[Math.floor(Math.random() * teams.length)];

  const era =
    eras[Math.floor(Math.random() * eras.length)];

  return { team, era };
}

// 🎡 UI component (optional button version)
export default function Wheel({ onSpin }) {
  function handleSpin() {
    const result = spin();
    if (onSpin) onSpin(result);
  }

  return (
    <div style={styles.container}>
      <h3>🎡 Spin the Wheel</h3>

      <button onClick={handleSpin} style={styles.button}>
        SPIN 🎰
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    textAlign: "center"
  },

  button: {
    fontSize: 18,
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: 8,
    border: "1px solid #ccc",
    background: "#fff"
  }
};
