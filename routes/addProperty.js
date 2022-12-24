const router = require('express').Router()
const Property = require('../models/property')
const User = require('../models/user')

router.post('/', async (req, res) => {
    
    try {
        const ppd_id = "PPD" + Math.floor((Math.random() * 9999) + 999);
        const views = parseInt(Math.random() * 30);
        const daysLeft = parseInt(Math.random() * 50);

        let user = await User.findOne({ mail: req.body.email });
        const add_property = await Property.create({
            ppdId: ppd_id, 
            
            ...req.body,
            views: views,
            daysLeft: daysLeft,
            userId:user._id
        });
    
        // Adding the property into user properties
        user.properties.push(add_property)
        await user.save()
        console.log(add_property)
        res.status(200).json({
            status: "Success",
            property:add_property
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }

});

module.exports = router;