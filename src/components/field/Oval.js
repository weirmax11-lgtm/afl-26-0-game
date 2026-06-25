import { useState } from "react";

export default function Oval({ players = [], mode = "CLASSIC_22" }) {
  // Simple mapping of AFL structure
  const positionsClassic22 = [
    "FWD_LINE",
    "HALF_FWD",
    "CENTRE",
    "HALF_BACK",
    "BACK_LINE",
    "RUCK",
    "BENCH"
  ];

  const positionsClassic5 = [
    "DEF",
    "MID",
    "RUCK",
    "FWD",
    "UTIL"
  ];

  const positions =
    mode === "CLASSIC_5" || mode === "IQ_5"
      ? positionsClassic5
      : positionsClassic22;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏟️ Team Oval</h2>

      <div style={styles.oval}>
        {positions.map((pos, index) => {
          const player = players[index]; // simple placeholder assignment

          return (
            <div key={pos} style={styles.positionBox}>
              <div style={styles.positionLabel}>{pos}</div>

              {player ? (
                <div style={styles.playerCard}>
                  <strong>{player.name}</strong>
                  <div style={styles.stats}>
                    MK: {player.MK ?? "-"} | DI: {player.DI ?? "-"}
                  </div>
                </div>
              ) : (
                <div style={styles.emptySlot}>Empty</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    textAlign: "center"
  },
  title: {
    marginBottom: 10
  },
  oval: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    padding: 20,
    border: "2px solid green",
    borderRadius: 20,
    background: "#e8f5e9"
  },
  positionBox: {
    border: "1px solid #999",
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
    background: "white"
  },
  positionLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 5
  },
  playerCard: {
    fontSize: 14
  },
  stats: {
    fontSize: 12,
    opacity: 0.7
  },
  emptySlot: {
    fontSize: 12,
    opacity: 0.4
  }
};
