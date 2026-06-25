const teams = [
  "Adelaide", "Brisbane Lions", "Brisbane Bears", "Carlton",
  "Collingwood", "Essendon", "Fitzroy", "Fremantle",
  "Geelong", "GWS", "Hawthorn", "Melbourne",
  "North Melbourne", "Port Adelaide", "Richmond",
  "St Kilda", "Sydney", "West Coast", "Western Bulldogs"
];

const eras = [
  "1960s", "1970s", "1980s", "1990s",
  "2000s", "2010s", "2020s"
];

export function spinWheel() {
  const team = teams[Math.floor(Math.random() * teams.length)];
  const era = eras[Math.floor(Math.random() * eras.length)];

  return { team, era };
}
