const mongoose = require('mongoose')

const { Schema } = mongoose;

const propertySchema = new Schema({
    PPID: {
        type: String,
        unique: true
    },
    basiInfo: {
        propertyType: {
            required: true,
            type: String,
        },
        propertyAge: {
            type: Number,
            required: true,
        }
    },
    generalInfo: {
        mobile: {
            required: true,
            type: Number,
        },
    },
    locationInfo: {
        lat: {
            type: Number
        },
        long: {
            type: Number
        }
    },
    propertyDetail: {
        area: {
            required: true,
            type: Number,
        },
    }


})

const Property = mongoose.model('property', propertySchema);

module.exports = Property;