const speciesArray = [
  "Dragon",
  "Golem",
  "Vampire",
  "Troll",
  "Griffin",
  "Fiend",
  "Serpent",
  "Elemental",
  "Giant",
  "Bird",
  "Hydra",
  "Gargoyle",
  "Behemoth",
  "Steed",
  "Wraith",
  "Fairy",
  "Undead",
  "Rat",
  "Panther",
  "Elf",
  "Assassin",
  "Walker",
  "Spider",
  "Ghost",
  "Imp",
  "Slime",
  "Sorcerer",
  "Wolf",
  "Centaur",
  "Lich",
  "Harpy",
  "Manticore",
  "Cyclops",
  "Chimera",
  "Zombie",
  "Orc",
  "Goblin",
  "Ogre",
  "Djinn",
  "Witch",
];

const subspeciesArray = [
  "Fire",
  "Ice",
  "Lord",
  "Forest",
  "Thunder",
  "Shadow",
  "Water",
  "Earth",
  "Storm",
  "Swamp",
  "Stone",
  "Lava",
  "Nightmare",
  "Sand",
  "Crystal",
  "Golden",
  "Necromancer",
  "Plague",
  "Frost",
  "Jungle",
  "Cave",
  "Lightning",
  "Mountain",
  "Sea",
  "Desert",
  "Spirit",
  "Venomous",
  "Pirate",
  "Blazing",
  "Toxic",
  "Iron",
  "Arcane",
  "Dire",
  "Feral",
  "Blood",
  "Poison",
  "Mystic",
  "Ancient",
  "Dark",
  "Light",
];

export default function generateRandomMonster() {
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomSpecies = getRandomElement(speciesArray);
  const randomSubspecies = getRandomElement(subspeciesArray);
  const randomPowerLevel = Math.floor(Math.random() * 20) + 1;

  return [randomSpecies, randomSubspecies, randomPowerLevel];
}