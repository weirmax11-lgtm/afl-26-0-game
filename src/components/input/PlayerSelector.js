import { useState, useMemo } from "react";

export default function PlayerSelector({
  players = [],
  team,
  era,
  onChange
}) {
  const [selected, setSelected] = useState([]);

  // Filter players by team + era
  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const teamMatch = team
        ? p.Team?.toLowerCase() === team.toLowerCase()
        : true;

      const eraMatch = era
        ? String(p.Year).startsWith(era.slice(0, 3)) // simple decade match
        : true;

      return teamMatch && eraMatch;
    });
  }, [players, team, era]);

  function togglePlayer(player) {
    let updated;

    const exists = selected.find(
      (p) => p.Player === player.Player
    );

    if (exists) {
      updated = selected.filter(
        (p) => p.Player !== player.Player
      );
    } else {
      updated = [...selected, player];
    }

    setSelected(updated);

    if (onChange) {
      onChange(updated);
    }
  }

  return (
    <div style={styles.container}>
      <h3>🧑‍🤝‍🧑 Select Players</h3>

      <p style={styles.meta}>
        Team: <strong>{team || "Any"}</strong> | Era:{" "}
        <strong>{era || "Any"}</strong>
      </p>

      <div style={styles.list}>
        {filteredPlayers.length === 0 && (
          <p style={{ opacity: 0.6 }}>
            No players found for selection
          </p>
        )}

        {filteredPlayers.map((player, index) => {
          const isSelected = selected.find(
            (p) => p.Player === player.Player
          );

          return (
            <div
              key={index}
              onClick={() => togglePlayer(player)}
              style={{
                ...styles.card,
                border: isSelected
                  ? "2px solid green"
                  : "1px solid #ccc",
                background: isSelected ? "#e8f5e9" : "#fff"
              }}
            >
              <div style={styles.name}>
                {player.Player}
              </div>

              <div style={styles.stats}>
                GM: {player.GM} | DI: {player.DI} | GL:{" "}
                {player.GL}
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.footer}>
        Selected: {selected.length} players
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

  list: {
    display: "grid",
    gap: 8,
    marginTop: 10,
    maxHeight: 300,
    overflowY: "auto",
    border: "1px solid #eee",
    padding: 10,
    borderRadius: 8
  },

  card: {
    padding: 10,
    borderRadius: 6,
    cursor: "pointer",
    transition: "0.2s"
  },

  name: {
    fontWeight: "bold"
  },

  stats: {
    fontSize: 12,
    opacity: 0.7
  },

  footer: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.8
  }
};
