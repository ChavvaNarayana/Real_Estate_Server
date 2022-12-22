const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    password: {
        type: String,
        required: true
    },
    ppdId: String,
    mail: {
        type: String,
        required: true
    },
    properties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'property'
        }
    ]
})

const User = mongoose.model('user', userSchema);

module.exports = User;