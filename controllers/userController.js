const Modals = require("../Models/index");
const bcrypt = require("bcrypt")

module.exports = {
    Login: async (req, res) => {
        try {
            const records = req.body;

            if (!records.email || !records.password) {
                return res.send({ status: 400, success: false, message: "Please provide email and password" });
            }

            const user = await Modals.user.findOne({ email: records.email });

            if (!user) {
                return res.send({ status: 404, success: false, message: "User Not Found" });
            }

            if (records.password !== user.password) {
                return res.send({ status: 401, success: false, message: "Invalid Credentials" });
            }

            return res.send({ status: 200, success: true, message: "Login successful", user });

        } catch (error) {
            console.error("Error during login:", error);
            return res.send({ status: 500, success: false, message: "Internal Server Error" });
        }
    },

}
