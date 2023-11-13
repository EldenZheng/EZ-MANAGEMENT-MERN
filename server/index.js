const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const EmployeeModel = require('./models/Employees.js')
const LayoffModel = require('./models/Layoff.js')
const ProjectModel = require('./models/Project.js')
const RequestLeaveModel = require('./models/Requestleave.js')
const RequestLetterModel = require('./models/Requestletter.js')
const ShiftModel = require('./models/Shift.js')
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer');

const app= express()
app.use(cors())
app.use(express.json())

const dbConnection= mongoose.createConnection("mongodb://127.0.0.1:27017/EZ_Management")

const employeeModel = dbConnection.model('employees',EmployeeModel.schema)
const layoffModel = dbConnection.model('layoff',LayoffModel.schema)
const projectModel = dbConnection.model('project',ProjectModel.schema)
const requestLeaveModel = dbConnection.model('requestleave',RequestLeaveModel.schema)
const requestLetterModel = dbConnection.model('requestletter',RequestLetterModel.schema)
const shiftModel = dbConnection.model('shift',ShiftModel.schema)


app.listen(3001, ()=>{
    console.log("Server is Running")
})