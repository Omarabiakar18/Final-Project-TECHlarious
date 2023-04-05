const jwt = require("jsonwebtoken");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REDEEM_SECRET, { expiresIn: process.env.JWT_REDEEM_EXPIRES_IN, });
};

// 2- Create a function that will send the redeem code to the user
const createRedeem = (user, statusCode, res, msg) => {
    const redeemCode = signToken(user._id);

    res.status(statusCode).json({
        status: "Success",
        token,
        data: { message: msg, user },
    });
};
exports.redeemPoints = async (req, res) => {
    try {
        // 1- Make sure the user is valid
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "This email doesn't exist" });
        }

        // 2- Get the points from the database and make sure the points are enough

        const point = user.userPoints;
        const price = req.body.priceItem;

        if (!price) {
            return res.status(404).json({ message: "Give the price" });
        }

        if (price > point) {
            return res.status(404).json({ message: "You dont have enough points to redeem this item." });
        }

        // 3- Make sure available promo code is not expired
        // let msg = ""
        // createRedeem(user, 201, res, msg)

        // 4- If everything is ok .... Send the code
        const newPoint = (point - price);
        user.userPoints = newPoint;
        await user.save();
        return res.status(200).json({ message: "Item redeemed." });

    } catch (error) {
        console.error(error);
    }

}
