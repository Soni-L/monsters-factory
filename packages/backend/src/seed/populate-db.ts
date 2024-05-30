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
    img: "https://example.com/fire-dragon.jpg",
  },
  {
    name: "Ice Golem",
    level: 7,
    type: {
      species: "Golem",
      sub_species: "Ice",
    },
    img: "https://example.com/ice-golem.jpg",
  },
  {
    name: "Vampire Lord",
    level: 12,
    type: {
      species: "Vampire",
      sub_species: "Lord",
    },
    img: "https://example.com/vampire-lord.jpg",
  },
  {
    name: "Forest Troll",
    level: 5,
    type: {
      species: "Troll",
      sub_species: "Forest",
    },
    img: "https://example.com/forest-troll.jpg",
  },
  {
    name: "Thunder Griffin",
    level: 9,
    type: {
      species: "Griffin",
      sub_species: "Thunder",
    },
    img: "https://example.com/thunder-griffin.jpg",
  },
  {
    name: "Shadow Fiend",
    level: 8,
    type: {
      species: "Fiend",
      sub_species: "Shadow",
    },
    img: "https://example.com/shadow-fiend.jpg",
  },
  {
    name: "Water Serpent",
    level: 6,
    type: {
      species: "Serpent",
      sub_species: "Water",
    },
    img: "https://example.com/water-serpent.jpg",
  },
  {
    name: "Earth Elemental",
    level: 11,
    type: {
      species: "Elemental",
      sub_species: "Earth",
    },
    img: "https://example.com/earth-elemental.jpg",
  },
  {
    name: "Storm Giant",
    level: 13,
    type: {
      species: "Giant",
      sub_species: "Storm",
    },
    img: "https://example.com/storm-giant.jpg",
  },
  {
    name: "Phoenix",
    level: 14,
    type: {
      species: "Bird",
      sub_species: "Fire",
    },
    img: "https://example.com/phoenix.jpg",
  },
  {
    name: "Swamp Hydra",
    level: 10,
    type: {
      species: "Hydra",
      sub_species: "Swamp",
    },
    img: "https://example.com/swamp-hydra.jpg",
  },
  {
    name: "Stone Gargoyle",
    level: 6,
    type: {
      species: "Gargoyle",
      sub_species: "Stone",
    },
    img: "https://example.com/stone-gargoyle.jpg",
  },
  {
    name: "Lava Behemoth",
    level: 15,
    type: {
      species: "Behemoth",
      sub_species: "Lava",
    },
    img: "https://example.com/lava-behemoth.jpg",
  },
  {
    name: "Nightmare Steed",
    level: 9,
    type: {
      species: "Steed",
      sub_species: "Nightmare",
    },
    img: "https://example.com/nightmare-steed.jpg",
  },
  {
    name: "Sand Wraith",
    level: 8,
    type: {
      species: "Wraith",
      sub_species: "Sand",
    },
    img: "https://example.com/sand-wraith.jpg",
  },
  {
    name: "Crystal Fairy",
    level: 4,
    type: {
      species: "Fairy",
      sub_species: "Crystal",
    },
    img: "https://example.com/crystal-fairy.jpg",
  },
  {
    name: "Golden Griffin",
    level: 11,
    type: {
      species: "Griffin",
      sub_species: "Golden",
    },
    img: "https://example.com/golden-griffin.jpg",
  },
  {
    name: "Necromancer",
    level: 12,
    type: {
      species: "Undead",
      sub_species: "Necromancer",
    },
    img: "https://example.com/necromancer.jpg",
  },
  {
    name: "Plague Rat",
    level: 3,
    type: {
      species: "Rat",
      sub_species: "Plague",
    },
    img: "https://example.com/plague-rat.jpg",
  },
  {
    name: "Frost Giant",
    level: 14,
    type: {
      species: "Giant",
      sub_species: "Frost",
    },
    img: "https://example.com/frost-giant.jpg",
  },
  {
    name: "Jungle Panther",
    level: 7,
    type: {
      species: "Panther",
      sub_species: "Jungle",
    },
    img: "https://example.com/jungle-panther.jpg",
  },
  {
    name: "Dark Elf",
    level: 10,
    type: {
      species: "Elf",
      sub_species: "Dark",
    },
    img: "https://example.com/dark-elf.jpg",
  },
  {
    name: "Cave Troll",
    level: 5,
    type: {
      species: "Troll",
      sub_species: "Cave",
    },
    img: "https://example.com/cave-troll.jpg",
  },
  {
    name: "Lightning Phoenix",
    level: 13,
    type: {
      species: "Bird",
      sub_species: "Lightning",
    },
    img: "https://example.com/lightning-phoenix.jpg",
  },
  {
    name: "Shadow Assassin",
    level: 11,
    type: {
      species: "Assassin",
      sub_species: "Shadow",
    },
    img: "https://example.com/shadow-assassin.jpg",
  },
  {
    name: "Mountain Giant",
    level: 12,
    type: {
      species: "Giant",
      sub_species: "Mountain",
    },
    img: "https://example.com/mountain-giant.jpg",
  },
  {
    name: "Sea Serpent",
    level: 9,
    type: {
      species: "Serpent",
      sub_species: "Sea",
    },
    img: "https://example.com/sea-serpent.jpg",
  },
  {
    name: "Desert Scorpion",
    level: 6,
    type: {
      species: "Scorpion",
      sub_species: "Desert",
    },
    img: "https://example.com/desert-scorpion.jpg",
  },
  {
    name: "Spirit Walker",
    level: 7,
    type: {
      species: "Walker",
      sub_species: "Spirit",
    },
    img: "https://example.com/spirit-walker.jpg",
  },
  {
    name: "Venomous Spider",
    level: 5,
    type: {
      species: "Spider",
      sub_species: "Venomous",
    },
    img: "https://example.com/venomous-spider.jpg",
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