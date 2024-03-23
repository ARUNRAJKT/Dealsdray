const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const loginModel = require('../models/loginModel');
const regModel = require('../models/regModel');

router.post('/sign', async (req, res ,next) => {
    try {
        const user = await loginModel.findOne({ f_userName: req.body.f_userName });
        console.log(user)
        if (!user) {
            return res.status(404).json({ success: false, error: true, message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(req.body.f_Pwd, user.f_Pwd);
        if (passwordMatch) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "Login successful",
                details: user,
            });
        } else {
            return res.status(401).json({ success: false, error: true, message: "Incorrect password" });
        }
    } catch (error) {
        console.error("Error in login route:", error);
        return res.status(500).json({ success: false, error: true, message: "An error occurred" });
    }
});

router.post('/reg', async (req, res) => {
    try {
        const oldUser = await loginModel.findOne({ f_userName: req.body.f_userName });
        if (oldUser) {
            return res.status(400).json({ success: false, error: true, message: "User already exists" });
        }
        const oldEmail = await regModel.findOne({ f_email: req.body.f_email });
        if (oldEmail) {
            return res.status(400).json({ success: false, error: true, message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(req.body.f_Pwd, 12);

        let log = { f_userName: req.body.f_userName, f_Pwd: hashedPassword}

        const result = await loginModel(log).save()

        let reg = { f_company: req.body.f_company, f_email: req.body.f_email, loginId: result._id }
        const result2 = await regModel(reg).save()

        if (result2) {
            res.status(201).json({ success: true, error: false, message: "Registration completed", details: result2 });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Got to Login Routes but Something went wrong" });
        console.log(error);

    }
})
module.exports = router;
