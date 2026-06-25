export default function PositionSlot({
  position,
  player,
  onSelect,
  onRemove
}) {
  return (
    <div style={styles.slot}>
      <div style={styles.label}>{position}</div>

      {player ? (
        <div style={styles.playerBox}>
          <div style={styles.name}>{player.name}</div>

          <div style={styles.stats}>
            MK: {player.MK ?? "-"} | DI: {player.DI ?? "-"}
          </div>

          <button
            onClick={() => onRemove && onRemove(position)}
            style={styles.removeBtn}
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          onClick={() => onSelect && onSelect(position)}
          style={styles.emptyBtn}
        >
          + Add Player
        </button>
      )}
    </div>
  );
}

const styles = {
  slot: {
    border: "1px solid #999",
    borderRadius: 10,
    padding: 10,
    minHeight: 90,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  label: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 5
  },

  playerBox: {
    display: "flex",
    flexDirection: "column",
    gap: 4
  },

  name: {
    fontWeight: "bold",
    fontSize: 14
  },

  stats: {
    fontSize: 12,
    opacity: 0.7
  },

  emptyBtn: {
    padding: 8,
    fontSize: 12,
    cursor: "pointer",
    borderRadius: 6,
    border: "1px dashed #888",
    background: "transparent"
  },

  removeBtn: {
    marginTop: 6,
    padding: 5,
    fontSize: 11,
    cursor: "pointer",
    borderRadius: 6
  }
};
