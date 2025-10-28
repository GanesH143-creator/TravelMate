import mongoose from "mongoose";

const factSchema = new mongoose.Schema({
  country: { type: String, required: true },
  fact: { type: String, required: true },
  image_url: { type: String },
  tags: [String],
  popularity: { type: Number, default: 0 },
});

export default mongoose.model("Fact", factSchema);
