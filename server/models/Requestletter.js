const mongoose = require('mongoose')

const LetterSchema = new mongoose.Schema({
    employeeID: String,
    letterType: String,
    generatedDate: Date,
    approvalStatus: Number
})

const LetterModel = mongoose.model("requestletter",LetterSchema)
module.exports = LetterModel