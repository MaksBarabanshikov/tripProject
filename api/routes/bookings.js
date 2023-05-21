import express from "express";
import {createBooking, getBookings, getBookingsByIdUser, updateBooking} from "../controllers/booking.js";
import {verifyUser, verifyAdmin} from "../middleware/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createBooking);
//GET ALL
router.get("/", verifyUser, getBookings);
//GET ALL BY ID USER
router.get("/user", verifyUser, getBookingsByIdUser);
// PUT
router.put("/", verifyAdmin, updateBooking);


export default router;