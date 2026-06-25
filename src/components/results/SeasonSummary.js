export default function SeasonSummary({ result, team, era, mode }) {
  if (!result) return null;

  const { wins, losses, perfectSeason } = result;

  return (
    <div style={styles.container}>
      <h1>🏉 Season Summary</h1>

      <div style={styles.card}>
        <h2>{team || "Unknown Team"}</h2>
        <p>Era: {era || "Unknown Era"}</p>
        <p>Mode: {mode || "CLASSIC_22"}</p>
      </div>

      <div style={styles.statsBox}>
        <div style={styles.stat}>
          <span>Wins</span>
          <strong>{wins}</strong>
        </div>

        <div style={styles.stat}>
          <span>Losses</span>
          <strong>{losses}</strong>
        </div>
      </div>

      <div style={styles.result}>
        {perfectSeason ? (
          <h2 style={styles.perfect}>
            🔥 26–0 PERFECT SEASON 🔥
          </h2>
        ) : (
          <h2>Season Complete</h2>
        )}
      </div>

      <div style={styles.footer}>
        {perfectSeason ? (
          <p>
            History was rewritten. This team is untouchable.
          </p>
        ) : (
          <p>
            Close, but not immortal. Try again.
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    padding: 20,
    textAlign: "center",
    borderRadius: 12,
    background: "#f5f5f5"
  },

  card: {
    marginTop: 10,
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fff"
  },

  statsBox: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
    marginTop: 20
  },

  stat: {
    fontSize: 16
  },

  result: {
    marginTop: 20
  },

  perfect: {
    color: "green"
  },

  footer: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.7
  }
};
