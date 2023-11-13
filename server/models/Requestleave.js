const mongoose = require('mongoose')

const LeaveSchema = new mongoose.Schema({
    employeeID: String,
    leaveType: String,
    leaveDate: Date,
    leaveDuration: Number,
    approvalStatus: Number
})

const LeaveModel = mongoose.model("requestleave",LeaveSchema)
module.exports = LeaveModel