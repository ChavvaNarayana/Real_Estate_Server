const router = require('express').Router()
const User = require('../models/user')
router.get('/',async  (req, res) => {
    const { email, ppdId, token, username } = req.body;
    // if (!email || !ppdId || !token || !username) {
    //     res.status(400).json({
    //         status: "Please log in or sign up"
    //     })
    // }
    try {

        const userProperties = await User.findOne({ mail: email }).populate('properties').sort({createdAt: -1});
        res.json({
            status: "Sucess",
            properties: userProperties.properties,
            
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: err.message
        })
    }

})

module.exports = router;