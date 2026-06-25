export default function SimulationRunner({
  teamStrength,
  coachRating,
  onResult
}) {
  function runSimulation() {
    if (!teamStrength && teamStrength !== 0) return;
    if (!coachRating && coachRating !== 0) return;

    // Combine influences (you can refine this later)
    const totalPower = teamStrength + coachRating;

    const games = 26;
    let wins = 0;

    for (let i = 0; i < games; i++) {
      // Opponent strength is random for now
      const opponent = Math.random() * 1000;

      const winChance = totalPower / (totalPower + opponent);

      if (Math.random() < winChance) {
        wins++;
      }
    }

    const result = {
      wins,
      losses: games - wins,
      perfectSeason: wins === 26
    };

    if (onResult) {
      onResult(result);
    }
  }

  return (
    <div style={styles.container}>
      <button
        onClick={runSimulation}
        style={styles.button}
        disabled={teamStrength == null || coachRating == null}
      >
        🏆 Simulate Season (26 Games)
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    textAlign: "center"
  },
  button: {
    fontSize: 18,
    padding: "12px 20px",
    cursor: "pointer"
  }
};
