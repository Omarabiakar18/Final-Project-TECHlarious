const User = require("../models/userModels");
const metadata = require('../QNA');


exports.getQNA = (req, res) => { // This function sends the questions to the user --React will dispaly the questions and answers
    return res.status(200).json(metadata);
}

exports.savePoints = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "This user doesn't exist" });
        }

        const point = req.body.userPoints;
        if (!point) {
            return res.status(404).json({ message: "The value is NAN" });
        }

        user.userPoints = point;
        await user.save();
        return res.status(200).json({ message: "Points are saved!!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error" })
    }
}
