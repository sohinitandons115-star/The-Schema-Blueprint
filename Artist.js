import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: String,
  genre: String,
  bio: String
});

export default mongoose.model("Artist", artistSchema);
