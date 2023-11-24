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

app.post("/createUser",async(req, res) =>{
	const newPassword = await bcrypt.hash(req.body.password, 10)
    EmployeeModel.create({
		employeeName: req.body.name,
        employeePassword: newPassword,
        employeeIC: req.body.ic,
        employeeDept: req.body.dept,
        employeeRole: req.body.role,
        employeeEmail: req.body.email,
        employeePhonenum: req.body.phone,
        employeeAddress: req.body.address,
        employeeHireddate: new Date(),
        employeeTotalrating: 0,
        profilePicture: req.body.picture,
        employeeTeam: req.body.team
	})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

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
				id: user._id,
				// name: user.employeeName,
				// email: user.employeeEmail,
				// ic: user.employeeIC,
				// dept: user.employeeDept,
				// role: user.employeeRole,
				// phone: user.employeePhonenum,
				// address: user.employeeAddress,
				// hiredDate: user.employeeHireddate,
				// rating: user.employeeTotalrating,
				// team: user.employeeTeam,
				// picture: user.profilePicture,
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

		const id = decoded.id
		const user = await EmployeeModel.findById({ _id: id })

		return res.json({ status: 'ok', userdata: user })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

const upload = multer();

app.post('/upload-profile-picture/:id', upload.single('profilePicture'), (req, res) => {
    const userId = req.params.id;
    
    // Check if a file was uploaded
    if (req.file) {
		// Convert the image file to a Base64 string
		const profilePicture = req.file.buffer.toString('base64');

		// Update the user's profilePicture field in the database
		EmployeeModel.findOneAndUpdate({employeeEmail:userId}, { profilePicture: profilePicture })
		.then(users=>res.json(users))
		.catch(err=>res.json(err))
    } else {
        console.error('No file uploaded');
        res.status(400).json({ error: 'No file uploaded' });
    }
});

app.put("/updateUser/:id", (req, res) =>{
    const id = req.params.id;
    EmployeeModel.findByIdAndUpdate({_id:id} ,{
		employeeName: req.body.name,
		employeeEmail: req.body.email,
		employeeIC: req.body.ic,
		employeeDept: req.body.dept,
		employeeRole: req.body.role,
		employeePhonenum: req.body.phone,
		employeeAddress: req.body.address,
		employeeTeam: req.body.team})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
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