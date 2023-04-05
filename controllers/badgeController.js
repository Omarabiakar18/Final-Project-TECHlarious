const User = require("../models/userModels");

exports.badgeSystem = async (req, res) => {
    try {
        // 1- Make sure the user is valid
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "This email doesn't exist" });
        }

        // 2- Get the points from the database and give the badge accordingly

        const point = user.userPoints;
        let msg;

        if (!point) {
            return res.status(404).json({ message: "Give the points" });
        }

        if (25 > point) {
            msg = "You don't have any badges!!";
        }
        if (50 > point && point >= 25) {
            msg = "You have a Bronze badge!!";
        }
        if (75 > point && point >= 50) {
            msg = "You have a Silver badge!!";
        }
        if (100 > point && point >= 75) {
            msg = "You have a Gold badge!!";
        }
        if (100 < point) {
            msg = "You have a Platinum badge!!";
        }

        // 3- When done send the bagde status
        user.userBadge = msg;
        await user.save();
        return res.status(200).json({ message: msg });

    } catch (error) {
        console.error(error);
    }

}
