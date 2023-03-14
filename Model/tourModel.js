const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a Group Size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difiiculty"],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, //this will remove white space from summary
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String], //this will create an array of strings
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date], //this will create an array of different dates
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
