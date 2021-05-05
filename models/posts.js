const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    email: {type: String, required: true},
    post: {type: String, required: true}
})

module.exports = mongoose.model("Post", postSchema)