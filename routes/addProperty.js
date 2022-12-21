const router = require('express').Router()
const Property = require('../models/property')
const User = require('../models/user')

router.post('/', async (req, res) => {
    // res.send('post')
    // logic for adding property

    try {
        console.log("this is req.body" + req.body + "Checkthis")
        const ppd_id = "PPD" + Math.floor((Math.random() * 9999) + 999);
        const views = parseInt(Math.random() * 30);
        const daysLeft = parseInt(Math.random() * 50);

        console.log(req.body);
        const add_property = await Property.create({
            ppdId: ppd_id, 
            image: '',
            propertyType: req.body.property, 
            mobile: req.body.mobile,
            area: req.body.area, 
            views: views,
            daysLeft: daysLeft
        });
        // adding the propery into user properties
        let user = await User.findOne({ mail: req.body.email });
        console.log(user);
        user.properties.push(add_property)
        await user.save()

        res.status(200).json({
            status: "Success",
            add_property
        })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }

});

module.exports = router;