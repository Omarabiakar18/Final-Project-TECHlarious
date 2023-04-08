const Promo = require("../models/promocodeModels");
const User = require("../models/userModels");


exports.getPromo = async (req, res) => {
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


        // 3- If everything is ok --> Buy the code --> Display the code
        const newPoint = (point - price);
        user.userPoints = newPoint;
        await user.save();

        const promo = await Promo.create({
            value: 50
        })

        const code = `${promo.code}`;

        //Display the promo code

        return res.status(200).json({ message: `Item redeemed. Your promo code is: ${code}` });

    } catch (error) {
        console.error(error);
    }

}
