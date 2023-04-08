const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const activitiesController = require("../controllers/activitiesController");
const promoController = require("../controllers/promoController");
const feedbackController = require("../controllers/feedbackController");
const badgeController = require("../controllers/badgeController");
const requestController = require("../controllers/requestController");



router.get("/QNA", activitiesController.getQNA);

router.post("/sendresults", activitiesController.savePoints);
//router.post("/sendresults", userController.protect, activitiesController.savePoints);

router.post("/promoCode", promoController.getPromo);

router.post("/userFeedback", feedbackController.feedback);

router.post("/badgeSystem", badgeController.badgeSystem);

router.post("/userRequest", requestController.request);


module.exports = router;