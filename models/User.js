import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  booking: {type: Array}
}); // схема пользователя в бд

export default mongoose.model('User', User);