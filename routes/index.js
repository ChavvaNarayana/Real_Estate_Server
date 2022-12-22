const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res) => {

    try {
        const userProperties = await User.findOne({ mail: req.headers.email }).populate('properties').sort({ createdAt: -1 });
        res.json({
            status: "Sucess",
            properties: userProperties.properties,
        })
    } catch (err) {
        res.status(404).json({
            status: "Error",
            message: err.message
        })
    }
})

module.exports = router;