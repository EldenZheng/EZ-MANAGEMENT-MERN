const mongoose = require('mongoose')

const ShiftSchema = new mongoose.Schema({
    employeeID: String,
    letterType: String,
    generatedDate: Date,
    approvalStatus: Number
})

const ShiftModel = mongoose.model("shift",ShiftSchema)
module.exports = ShiftModel