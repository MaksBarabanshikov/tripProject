import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";
export const createBooking = async (req, res, next) => {
    const data = {
        user: req.user.id,
        ...req.body
    }
    const newBooking = new Booking(data);
    await Tour.findByIdAndUpdate(
        data.tour,
        { $inc: {remainingPlaces: -data.countPeople} },
        {new: true}
    );

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        next(err);
    }
};

export const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find().populate('user').populate('tour')

        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

export const getBookingsByIdUser = async (req, res, next) => {
    try {
        const bookings = await Booking.find({user: req.user.id}).populate('user').populate('tour')

        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

export const updateBooking = async (req, res, next) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.body._id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedBooking);
    } catch (err) {
        next(err);
    }
};
