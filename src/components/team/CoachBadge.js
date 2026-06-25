export default function CoachBadge({ coach }) {
  if (!coach) return null;

  const winRate = coach.Total_Pct ?? 0;

  let tier = "Developing";
  let color = "#999";

  if (winRate >= 70) {
    tier = "Elite Coach";
    color = "#2e7d32";
  } else if (winRate >= 55) {
    tier = "Strong Coach";
    color = "#1976d2";
  } else if (winRate >= 40) {
    tier = "Average Coach";
    color = "#f9a825";
  } else {
    tier = "Struggling Coach";
    color = "#c62828";
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>🧑‍🏫 Coach Profile</div>

      <div style={styles.name}>
        {coach.Coach}
      </div>

      <div style={styles.stats}>
        <div>Wins: {coach.Total_W}</div>
        <div>Losses: {coach.Total_L}</div>
        <div>Win %: {winRate}%</div>
        <div>Premierships: {coach.PR}</div>
      </div>

      <div
        style={{
          ...styles.badge,
          borderColor: color,
          color: color
        }}
      >
        {tier}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fff",
    marginTop: 10,
    textAlign: "center"
  },

  header: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 5
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },

  stats: {
    fontSize: 12,
    opacity: 0.8,
    display: "grid",
    gap: 2,
    marginBottom: 10
  },

  badge: {
    marginTop: 5,
    padding: "5px 10px",
    border: "1px solid",
    borderRadius: 20,
    display: "inline-block",
    fontSize: 12,
    fontWeight: "bold"
  }
};
