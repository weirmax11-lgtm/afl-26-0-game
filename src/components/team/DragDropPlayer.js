import { useState } from "react";

export default function DragDropPlayer({
  player,
  onDrop
}) {
  const [isDragging, setIsDragging] = useState(false);

  function handleDragStart(e) {
    e.dataTransfer.setData(
      "player",
      JSON.stringify(player)
    );

    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        ...styles.card,
        opacity: isDragging ? 0.5 : 1
      }}
    >
      <div style={styles.name}>
        {player.Player || player.name}
      </div>

      <div style={styles.stats}>
        GM: {player.GM ?? "-"} | DI: {player.DI ?? "-"} | GL: {player.GL ?? "-"}
      </div>
    </div>
  );
}

// Drop zone helper (used by PositionSlot or Oval later)
export function DropZone({ position, onDropPlayer, children }) {
  function handleDrop(e) {
    e.preventDefault();

    const data = e.dataTransfer.getData("player");

    if (data) {
      const player = JSON.parse(data);
      if (onDropPlayer) {
        onDropPlayer(position, player);
      }
    }
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={allowDrop}
      style={styles.dropZone}
    >
      {children}
    </div>
  );
}

const styles = {
  card: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
    background: "#fff",
    cursor: "grab",
    marginBottom: 8,
    transition: "0.2s"
  },

  name: {
    fontWeight: "bold",
    fontSize: 14
  },

  stats: {
    fontSize: 12,
    opacity: 0.7
  },

  dropZone: {
    minHeight: 60,
    border: "2px dashed #aaa",
    borderRadius: 10,
    padding: 10,
    margin: 5
  }
};
