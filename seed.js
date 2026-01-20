import dotenv from "dotenv";
import mongoose from "mongoose";

import Artist from "../models/Artist.js";
import Album from "../models/Album.js";
import Song from "../models/Song.js";
import User from "../models/User.js";
import Playlist from "../models/Playlist.js";

dotenv.config();

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");

    // Clear existing data
    await Artist.deleteMany({});
    await Album.deleteMany({});
    await Song.deleteMany({});
    await User.deleteMany({});
    await Playlist.deleteMany({});

    // Artist
    const artist = await Artist.create({
      name: "Daft Punk",
      genre: "Electronic",
      bio: "French electronic music duo"
    });

    // Album
    const album = await Album.create({
      title: "Discovery",
      releaseYear: 2001,
      artist: artist._id,
      coverImage: "https://example.com/cover.jpg"
    });

    // Song
    const song = await Song.create({
      title: "One More Time",
      duration: 320,
      album: album._id,
      artist: artist._id
    });

    // User
    const user = await User.create({
      username: "music_fan_01",
      email: "fan@example.com",
      password: "hashed_password_123"
    });

    // Playlist
    const playlist = await Playlist.create({
        name: "Gym Jams",
        owner: user._id,
        songs: [song._id],
        description: "High energy tracks"
    });


    console.log("✅ Seeding Complete!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
}

seed();
