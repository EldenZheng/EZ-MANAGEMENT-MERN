const mongoose = require('mongoose')

const LayoffSchema = new mongoose.Schema({
    profilePicture: String
})

const LayoffModel = mongoose.model("layoff",LayoffSchema)
module.exports = LayoffModel