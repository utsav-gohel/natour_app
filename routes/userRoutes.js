const express = require("express");

const userController = require("../controllers/userController");

//User Routes
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.CreateUser);
router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
