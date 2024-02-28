import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  try {
    if (cached.conn) return cached.conn;
    if (!MONGO_URI) throw new Error("MONGODB_URI is missing");
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGO_URI, {
        dbName: "newton",
        bufferCommands: false,
      });
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    console.log(err);
    throw Error("Some error happend while connecting to db");
  }
};
