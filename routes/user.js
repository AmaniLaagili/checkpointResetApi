const express = require("express");
const router = express.Router();
const User = require("../models/User");
/*router.get("/test", (req, res) => {
    res.send("this is test");
});*/

router.post("/", async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email) {
            return res.status(400).send("name and email are required");
        }
        const newUser = await User.findOne({ email });

        if (newUser) {
            return res.status(400).send("user is already exist");
        }
        const user = new User({ name, email, phone });
        await user.save();
        res.status(200).send({ msg: "user added", user });
    } catch (error) {
        res.status(500).send("impossible to add user");
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ msg: "all users", users });
    } catch (error) {
        res.status(500).send("impossible to get users");
    }
});
router.put("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { $set: { ...req.body } }
        );
        res.status(200).send({ msg: "contact edited", user });
    } catch (error) {
        res.status(500).send("impossible to edited users");
    }
});
router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;

        const users = await User.findByIdAndDelete(id);
        res.status(200).send({ msg: "user deleted", users });
    } catch (error) {
        res.status(500).send("impossible to deleted users");
    }
});
module.exports = router;
