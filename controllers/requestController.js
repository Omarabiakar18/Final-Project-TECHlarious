const User = require("../models/userModels");
const sendMail = require('../utils/sendMail');

exports.request = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "This user doesn't exist" });
        }

        const requestString = req.body.request;
        if (!requestString) {
            return res.status(404).json({ message: "Enter your Requested Celebrity." });
        }


        //3- Send the token via email

        //3.1- Ceate this URL

        const userRequest = user.userRequest;//To test use: req.body.request

        const request = `${userRequest}`;
        const email = `${user.email}`;
        const msg = `Request from: ${email} is "${request}"`;
        try {
            await sendMail({
                from: "abiakaromar18@outlook.com",
                to: "abiakaromar18@outlook.com",
                subject: "Request from website!!",
                text: msg
            });

            res.status(200).json({ status: "success", message: "The email you sent is successful. Your Request is recorded!!" })

        } catch (err) {
            console.log(err);
            await user.save({ validateBeforeSave: false });

            res.status(500).json({
                message: "An error occured while sending the email, please try again in a moment.",
            });
        }



    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error" })
    }
}