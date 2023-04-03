const express = require('express');
const router = express.Router();

//const fetchController = require("../controllers/fetchUsersController");
const userController = require("../controllers/userController");
router.get("/QNA", userController.getQNA);
router.post("/sendresults", userController.savePoints);
//router.post("/sendresults", userController.protect, userController.savePoints);



//router.get("/fetchusers", userController.protect, fetchController.getAllUsers);

module.exports = router;