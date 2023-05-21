import mongoose from "mongoose";
const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  places: {
    type: Number,
    required: true,
  },
  remainingPlaces: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true
  }
});

export default mongoose.model("Tour", TourSchema)