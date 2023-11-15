import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jsonwebtoken'

export default function Home(){
    const [userData,setUserData]=useState();

    const navigate = useNavigate()

    async function fetchUserData() {
		const req = await fetch('http://localhost:3001/fetchData', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setUserData(data.userData)
            console.log("1")
            console.log(data.userData)
		} else {
			alert(data.error)
		}
	}

    useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				navigate('/');
			} else {
				fetchUserData()
			}
		}
	}, [])

    return(
        <div>
            <h1>hello world</h1>
            {/* <h3>{userData.employeeName}</h3> */}
        </div>
    )
}