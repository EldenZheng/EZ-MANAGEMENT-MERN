const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    employeeName: { type: String, required: true },
    employeePassword: { type: String, required: true },
    employeeIC: { type: String, required: true, unique: true },
    employeeDept: { type: String, required: true },
    employeeRole: { type: String, required: true },
    employeeEmail: { type: String, required: true, unique: true },
    employeePhonenum: { type: String, required: true },
    employeeAddress: { type: String, required: true },
    employeeHireddate: { type: Date, required: true },
    employeeTotalrating: Number,
    employeeTeam: { type: Number, required: true },
    profilePicture: String
})

const EmployeeModel = mongoose.model("employee",EmployeeSchema)
module.exports = EmployeeModel