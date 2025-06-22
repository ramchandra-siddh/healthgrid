import mongoose from "mongoose";
const connetDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/healthgrid`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connetDB;
