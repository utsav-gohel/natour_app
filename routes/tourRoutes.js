const express = require("express");

const tourController = require("../controllers/tourController");
//Tour Routes
const router = express.Router();

//This is local middleware we can say as it only perform for only tour routes and not works for user routes.
router.param("id", tourController.checkID);

//We are getting total number of tours details
router.get("/", tourController.getAllTours);

//Getting tour by id
router.get("/:id", tourController.getToursById);

//creating tour apis
router.post("/", tourController.checkBody, tourController.CreateNewTour);

//updating data
router.patch("/:id", tourController.updateTour);

//deleting the data
router.delete("/:id", tourController.deletTourById);

module.exports = router;
