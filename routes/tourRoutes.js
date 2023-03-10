const express = require("express");

const tourController = require("../controllers/tourController");
//Tour Routes
const router = express.Router();

//We are getting total number of tours details
router.get("/", tourController.getAllTours);

//Getting tour by id
router.get("/:id", tourController.getToursById);

//creating tour apis
router.post("/", tourController.CreateNewTour);

//updating data
router.patch("/:id", tourController.updateTour);

//deleting the data
router.delete("/:id", tourController.deletTourById);

module.exports = router;
