import StatBar from "../field/StatBar";

export default function PlayerCard({ player, onSelect }) {
  if (!player) return null;

  const name = player.Player || player.name;

  return (
    <div style={styles.card} onClick={() => onSelect && onSelect(player)}>
      <div style={styles.header}>
        <div style={styles.name}>{name}</div>
        <div style={styles.meta}>
          {player.Team || "Unknown Team"} | {player.Year || ""}
        </div>
      </div>

      <div style={styles.stats}>
        <StatBar label="Disposals" value={player.DI ?? 0} max={40} />
        <StatBar label="Marks" value={player.MK ?? 0} max={15} />
        <StatBar label="Goals" value={player.GL ?? 0} max={6} />
        <StatBar label="Tackles" value={player.TK ?? 0} max={10} />
      </div>

      <div style={styles.footer}>
        <span>GM: {player.GM ?? "-"}</span>
        <span>HO: {player.HO ?? "-"}</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 12,
    background: "#fff",
    cursor: "pointer",
    transition: "0.2s",
    marginBottom: 10
  },

  header: {
    marginBottom: 10
  },

  name: {
    fontWeight: "bold",
    fontSize: 15
  },

  meta: {
    fontSize: 12,
    opacity: 0.6
  },

  stats: {
    marginTop: 10
  },

  footer: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.7,
    display: "flex",
    justifyContent: "space-between"
  }
};
