import mongoose from "mongoose";

export const connectDB = async () => {
  let uri: string = String(process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error?.message}`);
    process.exit(1);
  }
};
