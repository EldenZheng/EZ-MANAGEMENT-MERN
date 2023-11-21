import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
import EmployeeModal from './EmployeeInformation.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'


export default function Home(){
	const [isOpen, setIsOpen] = useState(false);
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
		team: '',
		picture: ''
	});

    const navigate = useNavigate()

	const openModal = () => {
		setIsOpen(true);
	  };
	
	  const closeModal = () => {
		setIsOpen(false);
	  };

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
			alert("You have been signed out, Please Login to gain access to our services!");
			navigate('/');
		}else {
			fetchUserData()
		}
	}, [])

    return(
        <div>
            <h1>Welcome! {userData.name}</h1>
			<button onClick={openModal}>
				<FontAwesomeIcon icon={faCircleInfo} /> View Details
			</button>

			<EmployeeModal
				isOpen={isOpen}
				closeModal={closeModal}
				userdata={userData}
			/>
            
        </div>
    )
}