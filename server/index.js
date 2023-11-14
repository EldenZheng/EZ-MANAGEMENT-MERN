const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const EmployeeModel = require('./models/Employees.js')
const LayoffModel = require('./models/Layoff.js')
const ProjectModel = require('./models/Project.js')
const RequestLeaveModel = require('./models/Requestleave.js')
const RequestLetterModel = require('./models/Requestletter.js')
const ShiftModel = require('./models/Shift.js')


const app= express()
app.use(cors())
app.use(express.json())

//MULTIPLE DATABASE
// const dbConnection= mongoose.connect("mongodb://127.0.0.1:27017/EZ_Management")

// const employeeModel = dbConnection.model('employees',EmployeeModel.schema)
// const layoffModel = dbConnection.model('layoff',LayoffModel.schema)
// const projectModel = dbConnection.model('project',ProjectModel.schema)
// const requestLeaveModel = dbConnection.model('requestleave',RequestLeaveModel.schema)
// const requestLetterModel = dbConnection.model('requestletter',RequestLetterModel.schema)
// const shiftModel = dbConnection.model('shift',ShiftModel.schema)

mongoose.connect("mongodb://127.0.0.1:27017/EZ_Management")


app.post("/register",async(req, res) =>{
    try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await EmployeeModel.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Check if the provided password matches the stored password
                if (user.password === password) {
                    // If credentials are valid, generate a JWT
                    const token = generateToken(user);

                    // Send the token back to the client
                    res.json({ token });
                } else {
                    res.json("Incorrect credentials");
                }
            } else {
                res.json("Incorrect credentials");
            }
        })
        .catch(err => res.json(err));
});

app.post("/Dummydata",async(req, res) =>{
    const sampleEmployee = {
        employeeName: 'John Doe',
        employeePassword: 'password123',
        employeeIC: '1234567890',
        employeeDept: 'IT',
        employeeRole: 1,
        employeeEmail: 'john.doe@example.com',
        employeePhonenum: '1234567890',
        employeeAddress: '123 Main St, City',
        employeeHireddate: new Date('2023-01-01'),
        employeeTotalrating: 0,
        profilePicture: '',
        employeeTeam: 1
    };
    try {
		const newEmployee = new EmployeeModel(sampleEmployee);

        // Save the document to MongoDB
        newEmployee.save()
            .then(result => {
                console.log('Employee saved to MongoDB:', result);
            })
            .catch(error => {
                console.error('Error saving employee to MongoDB:', error);
            });
	} catch (err) {
        console.log(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.listen(3001, ()=>{
    console.log("Server is Running")
})