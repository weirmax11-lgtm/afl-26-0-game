import fs from "fs";

// import your engine
import { runFullSimulation } from "./src/logic/simulation.js";

// load sample data
import players2000s from "./src/data/2000s.json" assert { type: "json" };
import coaches from "./src/data/coaches.json" assert { type: "json" };

// pick 2 sample teams
const adelaideCoach = coaches.find(c => c.Team_Slug === "adelaide");

const adelaidePlayers = players2000s.filter(p => p.Team === "Adelaide");
const carltonPlayers = players2000s.filter(p => p.Team === "Carlton");

const teamInputs = [
  {
    name: "Adelaide",
    players: adelaidePlayers,
    coach: adelaideCoach
  },
  {
    name: "Carlton",
    players: carltonPlayers,
    coach: coaches.find(c => c.Team_Slug === "carlton")
  }
];

const result = runFullSimulation(teamInputs);

console.log("🏆 CHAMPION:", result.champion);
console.log("🔥 UNDEFEATED:", result.streak);
console.log("📊 LADDER TOP 3:", result.season.ladder.slice(0, 3));
