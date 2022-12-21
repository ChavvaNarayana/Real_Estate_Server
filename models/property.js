const mongoose = require('mongoose')

const { Schema } = mongoose;

const propertySchema = new Schema({
    
    //added more models by chavva
    propertyType: { required: true, type: String },
    negotiable: { type: String },
    price: { type: String },
    ownership: { type: String },
    propertyAge: { type: String },
    propertyApproved: { type: String },
    propertyAge: { type: String },
    propertyDescription: { type: String },
    bankLoan: { type: String },
    length: { required: true, type: String },
    breath: { required: true, type: String },
    totalArea: { required: true, type: Number },
    areaUnit: { type: String },
    noOfBHK: { type: String },
    noOfFloor: { type: String },
    attached: { type: String },
    western: { type: String },
    furnished: { type: String },
    carParking: { type: String },
    lift: { type: String },
    electricity: { type: String },
    facing: { type: String },

    name: { type: String },
    mobile: { required: true, type: String },
    postedBy: { type: String },
    saleType: { type: String },
    featuredPackage: { type: String },
    ppdPackage: { type: String },

    email: { required: true, type: String },
    city: { type: String },
    area: { type: String },
    pincode: { type: String },
    address: { type: String },
    landmark: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    PPDId: { required: true, type: String },
    Views: { required: true, type: String },
    DaysLeft: { required: true, type: String },

    image: { type: String },
    status: { type: String, default: "Unsold" },
    userid: { type: String },

})

const Property = mongoose.model('property', propertySchema);

module.exports = Property;