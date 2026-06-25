export default function RosterBuilder({
  players = [],
  mode = "CLASSIC_22",
  onUpdate
}) {
  const squadSize =
    mode === "CLASSIC_5" || mode === "IQ_5" ? 5 : 22;

  const trimmedPlayers = players.slice(0, squadSize);

  const emptySlots = squadSize - trimmedPlayers.length;

  function handleRemove(index) {
    const updated = [...trimmedPlayers];
    updated.splice(index, 1);

    if (onUpdate) {
      onUpdate(updated);
    }
  }

  return (
    <div style={styles.container}>
      <h3>🧾 Roster Builder</h3>

      <p style={styles.meta}>
        Mode: <strong>{mode}</strong> | Squad Size:{" "}
        <strong>{squadSize}</strong>
      </p>

      <div style={styles.grid}>
        {trimmedPlayers.map((p, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.name}>
              {p.Player || p.name}
            </div>

            <div style={styles.stats}>
              DI: {p.DI ?? "-"} | MK: {p.MK ?? "-"}
            </div>

            <button
              onClick={() => handleRemove(index)}
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        ))}

        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} style={styles.empty}>
            Empty Slot
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    padding: 10
  },

  meta: {
    fontSize: 12,
    opacity: 0.7
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 10,
    marginTop: 10
  },

  card: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
    background: "#fff"
  },

  name: {
    fontWeight: "bold",
    fontSize: 13
  },

  stats: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 5
  },

  removeBtn: {
    marginTop: 8,
    fontSize: 11,
    cursor: "pointer"
  },

  empty: {
    padding: 10,
    border: "1px dashed #aaa",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 12,
    opacity: 0.5
  }
};
