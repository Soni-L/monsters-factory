import { Schema, model, Document } from "mongoose";


const MonsterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  type: {
    species: { type: String, required: true },
    sub_species: { type: String, required: true },
  },
});

// Compile model from schema
const Monster = model("Monster", MonsterSchema);

export default Monster;
