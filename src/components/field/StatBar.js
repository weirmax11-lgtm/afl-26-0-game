export default function StatBar({
  label,
  value,
  max = 100
}) {
  // Normalize value into percentage (0–100)
  const percent = Math.min(100, (value / max) * 100);

  return (
    <div style={styles.container}>
      <div style={styles.labelRow}>
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div style={styles.barBackground}>
        <div
          style={{
            ...styles.barFill,
            width: `${percent}%`
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

  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.8
  },

  barBackground: {
    width: "100%",
    height: 8,
    background: "#ddd",
    borderRadius: 5,
    overflow: "hidden"
  },

  barFill: {
    height: "100%",
    background: "green",
    borderRadius: 5
  }
};
