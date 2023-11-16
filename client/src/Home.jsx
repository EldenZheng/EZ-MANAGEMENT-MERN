import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home(){
    const [userData,setUserData]=useState({
		name: '',
		email: '',
		ic: '',
		dept: '',
		role: '',
		phone: '',
		address: '',
		hiredDate: '',
		rating: '',
		team: ''
	});

    const navigate = useNavigate()

    async function fetchUserData() {
		const req = await fetch('http://localhost:3001/fetchData', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			const user = data.userdata;
		
			const formattedHiredDate = new Date(user.hiredDate).toLocaleDateString('en-US', {
			  year: 'numeric',
			  month: 'long',
			  day: 'numeric',
			});
		
			setUserData({
			  ...user,
			  hiredDate: formattedHiredDate,
			});
		  } else {
			alert(data.error);
		  }
	}

    useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			localStorage.removeItem('token')
			navigate('/');
		}else {
			fetchUserData()
		}
	}, [])

    return(
        <div>
            <h1>hello world</h1>
            <h3>{userData.name}</h3>
			<h3>{userData.email}</h3>
			<h3>{userData.ic}</h3>
			<h3>{userData.dept}</h3>
			<h3>{userData.role}</h3>
			<h3>{userData.phone}</h3>
			<h3>{userData.address}</h3>
			<h3>{userData.hiredDate}</h3>
			<h3>{userData.rating}</h3>
			<h3>{userData.team}</h3>
        </div>
    )
}