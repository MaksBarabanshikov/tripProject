import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser"

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import toursRoute from "./routes/tours.js";
import bookingsRoute from "./routes/bookings.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const whitelist = ['http://localhost:5173', /** other domains if any */ ]
const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


//middlewares
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/tours", toursRoute);
app.use("/api/bookings", bookingsRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log("Connected to backend to port", process.env.PORT);
});
