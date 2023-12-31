const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const verifyUser = require("../Middleware/verify");

router.get("/getUser", verifyUser, userController.getUser);
router.get("/allUsers", userController.gitAllUsers);
router.get("/gitAdmin", userController.gitAdmin);
router.get("/allUsersBySub/:id", userController.gitAllUsersBySubject);
router.get("/getUserSubjects/:id", userController.getUserSubjects);
router.get("/commonUsers/:id", userController.commonUsers);
router.get("/allUsersInSub", userController.gitAllUsersBySub);
router.post("/addUser", userController.addUser);
router.post("/log", userController.Login);
router.post("/newSubToST/:StdId/:SubID", userController.newSubToST);
router.patch("/deleteUser/:id", userController.deleteUser);
router.patch("/returnUser/:id", userController.returnUser);
router.patch("/updateUser/:id", userController.updateUser);

module.exports = router;
