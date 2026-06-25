export default function ResultsPanel({ result }) {
  if (!result) return null;

  const { wins, losses, perfectSeason } = result;

  return (
    <div style={styles.container}>
      <h2>🏆 Season Results</h2>

      <div style={styles.box}>
        <div style={styles.row}>
          <span>Wins</span>
          <strong>{wins}</strong>
        </div>

        <div style={styles.row}>
          <span>Losses</span>
          <strong>{losses}</strong>
        </div>
      </div>

      <div style={styles.highlight}>
        {perfectSeason ? (
          <h3>🔥 26–0 PERFECT SEASON 🔥</h3>
        ) : (
          <h3>Season Complete</h3>
        )}
      </div>

      {perfectSeason && (
        <p style={styles.celebration}>
          You didn’t just win. You erased failure from existence.
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    padding: 20,
    border: "2px solid #ccc",
    borderRadius: 10,
    background: "#fafafa",
    textAlign: "center"
  },

  box: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-around"
  },

  row: {
    fontSize: 16
  },

  highlight: {
    marginTop: 20
  },

  celebration: {
    marginTop: 10,
    fontSize: 14,
    opacity: 0.8,
    fontStyle: "italic"
  }
};
