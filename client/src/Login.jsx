import React, { useState } from 'react';
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom';
import FormTemplate from './Form.jsx';

export default function Login(){
    const[formData, setFormData]=useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name,value}=e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value,
        }))
    }

    //ORIGINAL WAY TO LOGIN USING SESSIONSTORAGE
    // const Login = (e)=>{
    //     e.preventDefault();
    //     axios.post("http://localhost:3001/Login",formData)
    //     .then(result =>{
    //         if(result.data === "success"){
    //             localStorage.setItem('userData',JSON.stringify(formData))
    //             navigate('/Home')
    //         }
    //         else{
    //             console.log(result)
    //         }
    //     })
    //     .catch(err=>console.log(err))
    // }

    const Login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', formData)
            .then(result => {
                const { status, user, error } = result.data;

                if (status === 'ok') {
                    localStorage.setItem('token', user);
                    alert('Login successful');
                    navigate('/Home');
                } else if (status === 'error') {
                    alert(`Login failed: ${error}`);
                } else {
                    console.log(result);
                }
            })
            .catch(err => console.log(err));
    };

    //LOGIN USING JWT EXAMPLE
    // async function Login(event) {
	// 	event.preventDefault()

	// 	const response = await fetch('http://localhost:3001/Login', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			email,
	// 			password,
	// 		}),
	// 	})

	// 	const data = await response.json()

	// 	if (data.user) {
	// 		localStorage.setItem('token', data.user)
	// 		alert('Login successful')
	// 		navigate('/Home')
	// 	} else {
	// 		alert('Please check your username and password')
	// 	}
	// }

    return(
        <FormTemplate
            formData={formData}
            action={Login}
            title="Login"
            handleChange={handleChange}
            buttonText="Login"
            loggedIn={false}
            redirectButtonText="add new data"
        />
    )
}