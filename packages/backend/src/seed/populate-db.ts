// Import the mongoose module
import mongoose from "mongoose";
import Monster from "../models/monster";

const monsters = [
  {
    name: "Fire Dragon",
    level: 10,
    type: {
      species: "Dragon",
      sub_species: "Fire",
    },
  },
  {
    name: "Ice Golem",
    level: 7,
    type: {
      species: "Golem",
      sub_species: "Ice",
    },
  },
  {
    name: "Vampire Lord",
    level: 12,
    type: {
      species: "Vampire",
      sub_species: "Lord",
    },
  },
  {
    name: "Forest Troll",
    level: 5,
    type: {
      species: "Troll",
      sub_species: "Forest",
    },
  },
  {
    name: "Thunder Griffin",
    level: 9,
    type: {
      species: "Griffin",
      sub_species: "Thunder",
    },
  },
  {
    name: "Shadow Fiend",
    level: 8,
    type: {
      species: "Fiend",
      sub_species: "Shadow",
    },
  },
  {
    name: "Water Serpent",
    level: 6,
    type: {
      species: "Serpent",
      sub_species: "Water",
    },
  },
  {
    name: "Earth Elemental",
    level: 11,
    type: {
      species: "Elemental",
      sub_species: "Earth",
    },
  },
  {
    name: "Storm Giant",
    level: 13,
    type: {
      species: "Giant",
      sub_species: "Storm",
    },
  },
  {
    name: "Phoenix",
    level: 14,
    type: {
      species: "Bird",
      sub_species: "Fire",
    },
  },
  {
    name: "Swamp Hydra",
    level: 10,
    type: {
      species: "Hydra",
      sub_species: "Swamp",
    },
  },
  {
    name: "Stone Gargoyle",
    level: 6,
    type: {
      species: "Gargoyle",
      sub_species: "Stone",
    },
  },
  {
    name: "Lava Behemoth",
    level: 15,
    type: {
      species: "Behemoth",
      sub_species: "Lava",
    },
  },
  {
    name: "Nightmare Steed",
    level: 9,
    type: {
      species: "Steed",
      sub_species: "Nightmare",
    },
  },
  {
    name: "Sand Wraith",
    level: 8,
    type: {
      species: "Wraith",
      sub_species: "Sand",
    },
  },
  {
    name: "Crystal Fairy",
    level: 4,
    type: {
      species: "Fairy",
      sub_species: "Crystal",
    },
  },
  {
    name: "Golden Griffin",
    level: 11,
    type: {
      species: "Griffin",
      sub_species: "Golden",
    },
  },
  {
    name: "Necromancer",
    level: 12,
    type: {
      species: "Undead",
      sub_species: "Necromancer",
    },
  },
  {
    name: "Plague Rat",
    level: 3,
    type: {
      species: "Rat",
      sub_species: "Plague",
    },
  },
  {
    name: "Frost Giant",
    level: 14,
    type: {
      species: "Giant",
      sub_species: "Frost",
    },
  },
  {
    name: "Jungle Panther",
    level: 7,
    type: {
      species: "Panther",
      sub_species: "Jungle",
    },
  },
  {
    name: "Dark Elf",
    level: 10,
    type: {
      species: "Elf",
      sub_species: "Dark",
    },
  },
  {
    name: "Cave Troll",
    level: 5,
    type: {
      species: "Troll",
      sub_species: "Cave",
    },
  },
  {
    name: "Lightning Phoenix",
    level: 13,
    type: {
      species: "Bird",
      sub_species: "Lightning",
    },
  },
  {
    name: "Shadow Assassin",
    level: 11,
    type: {
      species: "Assassin",
      sub_species: "Shadow",
    },
  },
  {
    name: "Mountain Giant",
    level: 12,
    type: {
      species: "Giant",
      sub_species: "Mountain",
    },
  },
  {
    name: "Sea Serpent",
    level: 9,
    type: {
      species: "Serpent",
      sub_species: "Sea",
    },
  },
  {
    name: "Desert Scorpion",
    level: 6,
    type: {
      species: "Scorpion",
      sub_species: "Desert",
    },
  },
  {
    name: "Spirit Walker",
    level: 7,
    type: {
      species: "Walker",
      sub_species: "Spirit",
    },
  },
  {
    name: "Venomous Spider",
    level: 5,
    type: {
      species: "Spider",
      sub_species: "Venomous",
    },
  },
  {
    name: "Ghost Pirate",
    level: 8,
    type: {
      species: "Ghost",
      sub_species: "Pirate",
    },
  },
  {
    name: "Blazing Imp",
    level: 6,
    type: {
      species: "Imp",
      sub_species: "Blazing",
    },
  },
  {
    name: "Toxic Slime",
    level: 4,
    type: {
      species: "Slime",
      sub_species: "Toxic",
    },
  },
  {
    name: "Iron Golem",
    level: 12,
    type: {
      species: "Golem",
      sub_species: "Iron",
    },
  },
  {
    name: "Arcane Sorcerer",
    level: 14,
    type: {
      species: "Sorcerer",
      sub_species: "Arcane",
    },
  },
  {
    name: "Dire Wolf",
    level: 9,
    type: {
      species: "Wolf",
      sub_species: "Dire",
    },
  },
  {
    name: "Feral Centaur",
    level: 7,
    type: {
      species: "Centaur",
      sub_species: "Feral",
    },
  },
  {
    name: "Frost Lich",
    level: 13,
    type: {
      species: "Lich",
      sub_species: "Frost",
    },
  },
];


async function insertMonsters() {
  try {
    await mongoose.connect(
      "mongodb+srv://acdsoni:TWPuQcc1SJPqDoDz@cluster0.a6eqwgt.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    await Monster.insertMany(monsters);
    console.log("Monsters inserted successfully");
  } catch (error) {
    console.error("Error inserting monsters:", error);
  } finally {
    await mongoose.disconnect();
  }
}

insertMonsters();
