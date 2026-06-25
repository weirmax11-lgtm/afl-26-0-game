export default function Header({
  team,
  era,
  mode,
  onReset
}) {
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h2 style={styles.title}>🏉 26–0 AFL Simulator</h2>
        <div style={styles.meta}>
          <span>Team: <strong>{team || "Not selected"}</strong></span>
          <span>Era: <strong>{era || "Not selected"}</strong></span>
          <span>Mode: <strong>{mode || "CLASSIC_22"}</strong></span>
        </div>
      </div>

      <div style={styles.right}>
        <button onClick={onReset} style={styles.button}>
          Reset Season 🔄
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderBottom: "2px solid #ddd",
    background: "#fafafa"
  },

  left: {
    display: "flex",
    flexDirection: "column"
  },

  title: {
    margin: 0,
    fontSize: 20
  },

  meta: {
    display: "flex",
    gap: 15,
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
    flexWrap: "wrap"
  },

  right: {
    display: "flex",
    alignItems: "center"
  },

  button: {
    padding: "6px 10px",
    fontSize: 12,
    cursor: "pointer",
    borderRadius: 6,
    border: "1px solid #ccc",
    background: "#fff"
  }
};
