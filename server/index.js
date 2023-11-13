const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const EmployeeModel = require('./models/Employees.js')
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



app.listen(3001, ()=>{
    console.log("Server is Running")
})