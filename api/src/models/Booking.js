import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true,
    },
    countPeople: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 1,
    }
});

export default mongoose.model("Booking", BookingSchema)