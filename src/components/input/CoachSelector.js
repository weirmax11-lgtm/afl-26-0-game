import { useState } from "react";

// You will later import your JSON properly
// import coachesData from "../../data/afl_coaches_database.json";

export default function CoachSelector({
  coaches = [],
  team,
  onSelect
}) {
  const [selectedCoach, setSelectedCoach] = useState(null);

  // Filter coaches by team if provided
  const filteredCoaches = team
    ? coaches.filter((c) =>
        c.Team_Slug?.toLowerCase?.() === team.toLowerCase()
      )
    : coaches;

  function handleSelect(coach) {
    setSelectedCoach(coach);
    if (onSelect) onSelect(coach);
  }

  return (
    <div style={styles.container}>
      <h3>🧑‍🏫 Select Coach</h3>

      <div style={styles.list}>
        {filteredCoaches.length === 0 && (
          <p style={{ opacity: 0.6 }}>No coaches found</p>
        )}

        {filteredCoaches.map((coach, index) => {
          const isSelected =
            selectedCoach?.Coach === coach.Coach;

          return (
            <div
              key={index}
              onClick={() => handleSelect(coach)}
              style={{
                ...styles.card,
                border: isSelected
                  ? "2px solid green"
                  : "1px solid #ccc"
              }}
            >
              <div style={styles.name}>{coach.Coach}</div>

              <div style={styles.stats}>
                Wins: {coach.Total_W} | Losses: {coach.Total_L}
              </div>

              <div style={styles.meta}>
                Win %: {coach.Total_Pct}% | Premierships: {coach.PR}
              </div>
            </div>
          );
        })}
      </div>

      {selectedCoach && (
        <div style={styles.selected}>
          Selected: <strong>{selectedCoach.Coach}</strong>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    padding: 10
  },

  list: {
    display: "grid",
    gap: 10,
    marginTop: 10
  },

  card: {
    padding: 10,
    borderRadius: 8,
    cursor: "pointer",
    background: "#fff",
    transition: "0.2s"
  },

  name: {
    fontWeight: "bold",
    fontSize: 14
  },

  stats: {
    fontSize: 12,
    opacity: 0.8
  },

  meta: {
    fontSize: 11,
    opacity: 0.6
  },

  selected: {
    marginTop: 15,
    fontSize: 14
  }
};
