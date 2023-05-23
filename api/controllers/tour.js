import translate from "translate";
import Tour from "../models/Tour.js";

const fieldsToTranslate = {
  name: '',
  city: '',
  address: '',
  desc: '',
}

export const createTour = async (req, res, next) => {
  const tourRu = req.body;

  let tourWithTranslate = {};

  for (const field in tourRu) {
    if (tourRu.hasOwnProperty(field) && fieldsToTranslate.hasOwnProperty(field)) {
      const translatedText = await translate(tourRu[field], { from: 'ru', to: 'en' });
      tourWithTranslate[field] = {ru: tourRu[field], en: translatedText };
    }
  }

  const data = {
    ...tourRu,
    ...tourWithTranslate,
    remainingPlaces: tourRu.places
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
