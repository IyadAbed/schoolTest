const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const verifyUser = require("../Middleware/verify");

router.get("/getUser", verifyUser, userController.getUser);
router.get("/allUsers", userController.gitAllUsers);
router.post("/addUser", userController.addUser);
router.post("/log", userController.Login);

module.exports = router;
