import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
import Modal from './Modal.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faEnvelope , faUser , faAddressCard , faBriefcase , faPhone , faLocationDot , faCalendar , faStar , faUsers } from '@fortawesome/free-solid-svg-icons'


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

			<Modal
				isOpen={isOpen}
				closeModal={closeModal}
				headerIcon={faUser}
				headerText=" Employee Information"
			>
				<div className='employeeDetContainer'>
                    <div className='imageContainer'>
                            <img className='circleImage'
                                src={userData.picture || 'profile-picture/default-profile-picture.png'}
                                alt="Profile"
                            />
                    </div>
                    <div>
                        <table>
                            <tr style={{borderBottom: '1px solid gray'}}>
                                <td><h1>{userData.name}</h1></td>
                            </tr>
                            <tr style={{marginTop:'10px'}}>
                                <td><FontAwesomeIcon icon={faEnvelope} /></td>
                                <td><label>{userData.email}</label></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faAddressCard} /></td>
                                <td><label>{userData.ic}</label></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faBriefcase} /></td>
                                <td><label>{userData.dept} - {userData.role}</label></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faPhone} /></td>
                                <td><label>{userData.phone}</label></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faLocationDot} /></td>
                                <td><label>{userData.address}</label></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faCalendar} /></td>
                                <td><label>{userData.hiredDate}</label></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faStar} /></td>
                                <td><label>{userData.rating}</label></td>
                            </tr>
                            <tr>
                                <td><FontAwesomeIcon icon={faUsers} /></td>
                                <td><label>Team {userData.team}</label></td>
                            </tr>
                        </table>
                    </div>
                </div>
			</Modal>
        </div>
    )
}