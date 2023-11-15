const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const EmployeeModel = require('./models/Employees.js')
const LayoffModel = require('./models/Layoff.js')
const ProjectModel = require('./models/Project.js')
const RequestLeaveModel = require('./models/Requestleave.js')
const RequestLetterModel = require('./models/Requestletter.js')
const ShiftModel = require('./models/Shift.js')


const app= express()
app.use(cors())
app.use(express.json())

//IF INSERTING TO MULTIPLE DATABASE
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

// ORIGINAL WAY TO LOGIN USING SESSIONSTORAGE
// app.post("/login",(req, res) =>{
//     const {email,password} = req.body;
//     employeeModel.findOne({email:email})
//     .then(users=>{
//         if(users){
//             if(users.password===password){
//                 res.json("success")
//             }
//             else{
//                 res.json("incorrect credential")
//             }
//         }
//         else{
//             res.json("incorrect credential")
//         }
//     })
//     .catch(err=>res.json(err))
// })

app.post('/login', async (req, res) => {
	const user = await EmployeeModel.findOne({
		employeeEmail: req.body.email,
	})

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid login' });
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.employeePassword
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/fetchData', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', userData: user })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post("/Dummydata",async(req, res) =>{
    const sampleEmployee = {
        employeeName: 'John Doe',
        employeePassword: await bcrypt.hash('password123', 10),
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