export default function TeamRatingMeter({ rating = 0 }) {
  // Clamp rating between 0 and 100
  const clamped = Math.max(0, Math.min(100, rating));

  let label = "Developing";
  let color = "#999";

  if (clamped >= 80) {
    label = "Elite";
    color = "#2e7d32";
  } else if (clamped >= 60) {
    label = "Strong";
    color = "#1976d2";
  } else if (clamped >= 40) {
    label = "Average";
    color = "#f9a825";
  } else {
    label = "Weak";
    color = "#c62828";
  }

  return (
    <div style={styles.container}>
      <h3>🏉 Team Rating</h3>

      <div style={styles.meterBackground}>
        <div
          style={{
            ...styles.meterFill,
            width: `${clamped}%`,
            background: color
          }}
        />
      </div>

      <div style={styles.footer}>
        <strong>{clamped}</strong> / 100 — {label}
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
    background: "#fff",
    textAlign: "center"
  },

  meterBackground: {
    width: "100%",
    height: 14,
    background: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10
  },

  meterFill: {
    height: "100%",
    transition: "width 0.3s ease"
  },

  footer: {
    marginTop: 10,
    fontSize: 14,
    opacity: 0.8
  }
};
