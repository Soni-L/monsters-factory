// Import the mongoose module
import mongoose from "mongoose";
import Monster from "../models/monster";

function createImageUrl(species: string, level: number): string {
  const formattedSpecies = encodeURIComponent(species);
  function stringToColor(text: string) {
    // Generate a hash code from the input text
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash code to hex
    const color =
      ((hash >> 16) & 0xff).toString(16).padStart(2, "0") +
      ((hash >> 8) & 0xff).toString(16).padStart(2, "0") +
      (hash & 0xff).toString(16).padStart(2, "0");

    return color.toUpperCase();
  }
  const generatedColor = stringToColor(species);
  return `https://via.placeholder.com/500x300/${generatedColor}/FFFFFF?text=${formattedSpecies}+${level}`;
}

const monsters = [
  {
    name: "Fire Dragon",
    level: 10,
    type: {
      species: "Dragon",
      sub_species: "Fire",
    },
    img: createImageUrl("Fire Dragon", 10),
  },
  {
    name: "Ice Golem",
    level: 7,
    type: {
      species: "Golem",
      sub_species: "Ice",
    },
    img: createImageUrl("Ice Golem", 7),
  },
  {
    name: "Vampire Lord",
    level: 12,
    type: {
      species: "Vampire",
      sub_species: "Lord",
    },
    img: createImageUrl("Vampire Lord", 12),
  },
  {
    name: "Forest Troll",
    level: 5,
    type: {
      species: "Troll",
      sub_species: "Forest",
    },
    img: createImageUrl("Forest Troll", 5),
  },
  {
    name: "Thunder Griffin",
    level: 9,
    type: {
      species: "Griffin",
      sub_species: "Thunder",
    },
    img: createImageUrl("Thunder Griffin", 9),
  },
  {
    name: "Shadow Fiend",
    level: 8,
    type: {
      species: "Fiend",
      sub_species: "Shadow",
    },
    img: createImageUrl("Shadow Fiend", 8),
  },
  {
    name: "Water Serpent",
    level: 6,
    type: {
      species: "Serpent",
      sub_species: "Water",
    },
    img: createImageUrl("Water Serpent", 6),
  },
  {
    name: "Earth Elemental",
    level: 11,
    type: {
      species: "Elemental",
      sub_species: "Earth",
    },
    img: createImageUrl("Earth Elemental", 11),
  },
  {
    name: "Storm Giant",
    level: 13,
    type: {
      species: "Giant",
      sub_species: "Storm",
    },
    img: createImageUrl("Storm Giant", 13),
  },
  {
    name: "Phoenix",
    level: 14,
    type: {
      species: "Bird",
      sub_species: "Fire",
    },
    img: createImageUrl("Phoenix", 14),
  },
  {
    name: "Swamp Hydra",
    level: 10,
    type: {
      species: "Hydra",
      sub_species: "Swamp",
    },
    img: createImageUrl("Swamp Hydra", 10),
  },
  {
    name: "Stone Gargoyle",
    level: 6,
    type: {
      species: "Gargoyle",
      sub_species: "Stone",
    },
    img: createImageUrl("Stone Gargoyle", 6),
  },
  {
    name: "Lava Behemoth",
    level: 15,
    type: {
      species: "Behemoth",
      sub_species: "Lava",
    },
    img: createImageUrl("Lava Behemoth", 15),
  },
  {
    name: "Nightmare Steed",
    level: 9,
    type: {
      species: "Steed",
      sub_species: "Nightmare",
    },
    img: createImageUrl("Nightmare Steed", 9),
  },
  {
    name: "Sand Wraith",
    level: 8,
    type: {
      species: "Wraith",
      sub_species: "Sand",
    },
    img: createImageUrl("Sand Wraith", 8),
  },
  {
    name: "Crystal Fairy",
    level: 4,
    type: {
      species: "Fairy",
      sub_species: "Crystal",
    },
    img: createImageUrl("Crystal Fairy", 4),
  },
  {
    name: "Golden Griffin",
    level: 11,
    type: {
      species: "Griffin",
      sub_species: "Golden",
    },
    img: createImageUrl("Golden Griffin", 11),
  },
  {
    name: "Necromancer",
    level: 12,
    type: {
      species: "Undead",
      sub_species: "Necromancer",
    },
    img: createImageUrl("Necromancer", 12),
  },
  {
    name: "Plague Rat",
    level: 3,
    type: {
      species: "Rat",
      sub_species: "Plague",
    },
    img: createImageUrl("Plague Rat", 3),
  },
  {
    name: "Frost Giant",
    level: 14,
    type: {
      species: "Giant",
      sub_species: "Frost",
    },
    img: createImageUrl("Frost Giant", 14),
  },
  {
    name: "Jungle Panther",
    level: 7,
    type: {
      species: "Panther",
      sub_species: "Jungle",
    },
    img: createImageUrl("Jungle Panther", 7),
  },
  {
    name: "Dark Elf",
    level: 10,
    type: {
      species: "Elf",
      sub_species: "Dark",
    },
    img: createImageUrl("Dark Elf", 10),
  },
  {
    name: "Cave Troll",
    level: 5,
    type: {
      species: "Troll",
      sub_species: "Cave",
    },
    img: createImageUrl("Cave Troll", 5),
  },
  {
    name: "Lightning Phoenix",
    level: 13,
    type: {
      species: "Bird",
      sub_species: "Lightning",
    },
    img: createImageUrl("Lightning Phoenix", 13),
  },
  {
    name: "Shadow Assassin",
    level: 11,
    type: {
      species: "Assassin",
      sub_species: "Shadow",
    },
    img: createImageUrl("Shadow Assassin", 11),
  },
  {
    name: "Mountain Giant",
    level: 12,
    type: {
      species: "Giant",
      sub_species: "Mountain",
    },
    img: createImageUrl("Mountain Giant", 12),
  },
  {
    name: "Sea Serpent",
    level: 9,
    type: {
      species: "Serpent",
      sub_species: "Sea",
    },
    img: createImageUrl("Sea Serpent", 9),
  },
  {
    name: "Desert Scorpion",
    level: 6,
    type: {
      species: "Scorpion",
      sub_species: "Desert",
    },
    img: createImageUrl("Desert Scorpion", 6),
  },
  {
    name: "Spirit Walker",
    level: 7,
    type: {
      species: "Walker",
      sub_species: "Spirit",
    },
    img: createImageUrl("Spirit Walker", 7),
  },
  {
    name: "Venomous Spider",
    level: 5,
    type: {
      species: "Spider",
      sub_species: "Venomous",
    },
    img: createImageUrl("Venomous Spider", 5),
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
