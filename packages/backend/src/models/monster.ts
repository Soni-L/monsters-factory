const mongoose = require("mongoose");

// Define schema
const Schema = mongoose.Schema;

const MonsterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  type: {
    species: { type: String, required: true },
    sub_species: { type: String, required: true },
  },
  img: { type: String, required: true },
});

// Compile model from schema
module.exports = mongoose.model("Monster", MonsterSchema);
