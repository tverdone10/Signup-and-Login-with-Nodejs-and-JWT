const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    
    // Hobbies will just be an example for some user data
    hobbies: Array,
    
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },

    joined: {type: Date, default: Date.now}
})

module.exports = mongoose.model("User", userSchema)
