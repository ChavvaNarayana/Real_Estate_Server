const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    password: {
        type: String,
        required: true
    },
    ppid: String,
    mail: {
        type: String,
        required: true
    },
    properties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
})

const User = mongoose.model('user', userSchema);

module.exports = User;