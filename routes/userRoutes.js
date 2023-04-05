const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const activitiesController = require("../controllers/activitiesController");
const redeemController = require("../controllers/redeemController");
const feedbackController = require("../controllers/feedbackController");
const badgeController = require("../controllers/badgeController");


router.get("/QNA", activitiesController.getQNA);

router.post("/sendresults", activitiesController.savePoints);
//router.post("/sendresults", userController.protect, activitiesController.savePoints);

router.post("/redeemItems", redeemController.redeemPoints);

router.post("/userFeedback", feedbackController.feedback);

router.post("/badgeSystem", badgeController.badgeSystem);


module.exports = router;