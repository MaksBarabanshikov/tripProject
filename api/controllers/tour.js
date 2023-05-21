import Tour from "../models/Tour.js";

export const createTour = async (req, res, next) => {
  const data = {
    ...req.body,
    time: new Date(req.body.time).toLocaleString('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
    remainingPlaces: req.body.places
  }
  const newTour = new Tour(data);

  try {
    const savedTour = await newTour.save();
    res.status(200).json(savedTour);
  } catch (err) {
    next(err);
  }
};
export const updateTour = async (req, res, next) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTour);
  } catch (err) {
    next(err);
  }
};
export const deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json("Tour has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json(tour);
  } catch (err) {
    next(err);
  }
};
export const getTours = async (req, res, next) => {
  try {
    const tours = await Tour.find().limit(20);
    res.status(200).json(tours);
  } catch (err) {
    next(err);
  }
};
