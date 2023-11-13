const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    employeeName: String,
    employeePassword: String,
    employeeIC: String,
    employeeDept: String,
    employeeRole: Number,
    employeeEmail: String,
    employeePhonenum: String,
    employeeAddress: String,
    employeeHireddate: Date,
    employeeTotalrating: Number,
    employeeTeam: Number,
    profilePicture: String
})

const EmployeeModel = mongoose.model("employee",EmployeeSchema)
module.exports = EmployeeModel