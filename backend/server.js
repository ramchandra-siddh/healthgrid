import express from "express";
import cors from "cors";
import "dotenv/config";
import connetDB from "./config/mongodb.js";
import connectCloudnary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
//app config
const app = express();
const port = process.env.PORT || 4000;
connetDB();
connectCloudnary();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// app.listen(port, () => {
//   console.log("Server started", port);
// });

// start server after DB and Cloudinary connection
const startServer = async () => {
  try {
    await connetDB();
    await connectCloudnary(); // If it's not async, it’s still safe to use await

    app.listen(port, () => {
      console.log("Server started on port", port);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};
startServer();
