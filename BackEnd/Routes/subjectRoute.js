const express = require("express");
const router = express.Router();
const subjectController = require("../Controller/subjectController");

router.post("/addNewSubject", subjectController.addSubject);
router.get("/allSubject", subjectController.gitAllSubject);

// router.get("/getUser", verifyUser, userController.getUser);
// router.get("/allUsers", userController.gitAllUsers);
// router.post("/addUser", userController.addUser);
// router.post("/log", userController.Login);
// router.patch("/deleteUser/:id", userController.deleteUser);
// router.patch("/returnUser/:id", userController.returnUser);
// router.patch("/updateUser/:id", userController.updateUser);

module.exports = router;
