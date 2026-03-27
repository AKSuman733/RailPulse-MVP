import mongoose from "mongoose";

export async function connectDB() {
    try {
    await mongoose.connect(process.env.MongoDB_String);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}