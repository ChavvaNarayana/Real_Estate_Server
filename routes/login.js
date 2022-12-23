const router = require('express').Router()

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.post('/', async (req, res) => {
    const { email, password } = req.body.data;
    if (!email || !password) {
        res.status(400).json({
            status: "Failed",
            message: "Email or Password is missing"
        })
    }
    try {
        const findQueryinDB = await User.findOne({ mail: email });
        
        if (findQueryinDB) {
            passwordValidation(
                findQueryinDB,
                password,
                findQueryinDB.password,
                res,
                email,
                findQueryinDB.id
            );
        } else {
            return res.status(403).json({
                status: "Error",
                message: "User isn't register"
            });
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: "invalid user",
            message: error

        })
    }
})



const passwordValidation = (findQueryinDB, passwordEnteredByUser, hash, res, email, id) => {
    bcrypt.compare(passwordEnteredByUser, hash, function (error, isMatch) {
        if (error) {
            res.status(400).json({
                message: error
            });
        } else if (!isMatch) {
            res.status(422).json({
                status: "Password Mismatch"
            }
            );
        } else {
            console.log("In else part");
            const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });
            res.status(200).json({
                
                token: token,
                username: findQueryinDB.name,
                ppdId: findQueryinDB.ppdId,
                email: findQueryinDB.mail,
                
            });
        }
    });
};


module.exports = router;