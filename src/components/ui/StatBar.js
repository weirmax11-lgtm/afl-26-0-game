export default function StatBar({
  label,
  value = 0,
  max = 100,
  hide = false
}) {
  if (hide) {
    return (
      <div style={styles.hidden}>
        {label}: ???
      </div>
    );
  }

  const percent = Math.max(
    0,
    Math.min(100, (value / max) * 100)
  );

  let color = "#2e7d32";

  if (percent < 40) color = "#c62828";
  else if (percent < 70) color = "#f9a825";

  return (
    <div style={styles.container}>
      <div style={styles.topRow}>
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div style={styles.barBg}>
        <div
          style={{
            ...styles.barFill,
            width: `${percent}%`,
            background: color
          }}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: 10,
    width: "100%"
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.85
  },

  barBg: {
    width: "100%",
    height: 8,
    background: "#e0e0e0",
    borderRadius: 6,
    overflow: "hidden"
  },

  barFill: {
    height: "100%",
    transition: "width 0.3s ease"
  },

  hidden: {
    fontSize: 12,
    opacity: 0.4,
    fontStyle: "italic"
  }
};
