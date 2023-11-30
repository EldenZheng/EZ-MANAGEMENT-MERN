import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
import axios from "axios";
import Modal from './Modal.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faEnvelope , faUser , faAddressCard , faBriefcase , faPhone , faLocationDot , faCalendar , faStar , faUsers, faPenToSquare, faUserPlus } from '@fortawesome/free-solid-svg-icons'


export default function Home(){
	const [isOpenInfo, setIsOpenInfo] = useState(false);
	const [isOpenUpdate, setIsOpenUpdate] = useState(false);
	const [file, setFile] = useState(null);
    const [userData,setUserData]=useState({
		id:'',
		name: '',
		email: '',
		// password: '',
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

	const openModalInfo = () => {
		setIsOpenInfo(true);
	};
	
	const closeModalInfo = () => {
		setIsOpenInfo(false);
	};

	const openModalUp = () => {
		setIsOpenUpdate(true);
	};
	
	const closeModalUp = () => {
		setIsOpenUpdate(false);
	};

	const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

	const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            await axios.post('http://localhost:3001/upload-profile-picture/'+userData.email, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
			setUserData((prevData)=>({
				...prevData,
				picture:URL.createObjectURL(file),
        	}));
            alert('Profile picture uploaded successfully');
        } catch (error) {
            alert('Profile picture upload failed');
			console.log(error)
        }
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
		
			const formattedHiredDate = new Date(user.employeeHireddate).toLocaleDateString('en-US', {
			  year: 'numeric',
			  month: 'long',
			  day: 'numeric',
			});
		
			setUserData({
				id:user._id,
				name: user.employeeName,
				email: user.employeeEmail,
				ic: user.employeeIC,
				dept: user.employeeDept,
				role: user.employeeRole,
				phone: user.employeePhonenum,
				address: user.employeeAddress,
				rating: user.employeeTotalrating,
				team: user.employeeTeam,
				hiredDate: formattedHiredDate,
				picture: "data:image/jpeg;base64," + user.profilePicture,
			});
		  } else {
			alert(data.error);
		  }
	}

	const UpdateData = (e)=>{
        e.preventDefault()
        axios.put("http://localhost:3001/updateUser/"+userData.id,userData)
        .then(result =>{
            console.log(result)
            navigate('/Home')
        })
        .catch(err=>console.log(err))
    }

    const handleChange = (e) => {
        const {name,value}=e.target;
        setUserData((prevData)=>({
            ...prevData,
            [name]:value,
        }))
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
			<table>
				<tr>
					<td style={{borderRight:'2px solid black'}}>
						<div className='imageContainerSmall'>
						<img
							className='circleImageSmall'
							src={userData.picture}
							alt="Profile"
						/>
						</div>
					</td>
					<td>
						<div className="textContainer">
						<h1>{userData.name}</h1>
						<label>{userData.dept} - {userData.role}</label><br/>
						<label>Team {userData.team}</label>
						</div>
					</td>
				</tr>
			</table>
			<button onClick={openModalInfo}>
				<FontAwesomeIcon icon={faCircleInfo} /> View Details
			</button>

			<Modal
				isOpen={isOpenInfo}
				closeModal={closeModalInfo}
				headerIcon={faUser}
				headerText=" Employee Information"
			>
				<div className='employeeDetContainer' style={{width:'50em'}}>
                    <div className='imageContainer'>
						<img className='circleImage'
							src={userData.picture}
							alt="Profile"
						/>
                    </div>
                    <div>
                        <table>
                            <tr className='nameDet'>
                                <td><h1>{userData.name}</h1></td>
                            </tr>
                            <tr className='otherDet'>
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
			<button onClick={openModalUp}>
				<FontAwesomeIcon icon={faPenToSquare} /> Update Details
			</button>
			<Modal
				isOpen={isOpenUpdate}
				closeModal={closeModalUp}
				headerIcon={faPenToSquare}
				headerText=" Edit Information"
			>
				<div className='employeeDetContainer'>
                    <div className='imageContainer'>
						<img className='circleImage'
							src={userData.picture}
							alt="Profile"
						/>
                    </div>
					
                    <div>
						
                        <form onSubmit={UpdateData}>
                            <div>
								<FontAwesomeIcon icon={faUser} />
								<label htmlFor="">Name</label><br/>
								<input
									type="text"
									placeholder="Enter Name" 
									name="name"
									value={userData.name}
									onChange={handleChange}
								/>
                            </div>
							<div>
								<FontAwesomeIcon icon={faEnvelope} />
								<label htmlFor="">Password</label><br/>
								<input
									type="text"
									placeholder="Enter Password" 
									name="password"
									value={userData.password}
									onChange={handleChange}
								/>
                            </div>
							<div>
								<FontAwesomeIcon icon={faEnvelope} />
								<label htmlFor="">Email</label><br/>
								<input
									type="text"
									placeholder="Enter Email" 
									name="email"
									value={userData.email}
									onChange={handleChange}
								/>
                            </div>
							<div>
								<FontAwesomeIcon icon={faAddressCard} />
								<label htmlFor="">IC</label><br/>
								<input
									type="text"
									placeholder="Enter IC" 
									name="ic"
									value={userData.ic}
									onChange={handleChange}
								/>
                            </div>
							<div>
								<FontAwesomeIcon icon={faBriefcase} />
								<label htmlFor="">Deptartment</label><br/>
								<input
									type="text"
									placeholder="Enter Department" 
									name="dept"
									value={userData.dept}
									onChange={handleChange}
								/>
                            </div>
							<div>
								<FontAwesomeIcon icon={faBriefcase} />
								<label htmlFor="">Role</label><br/>
								<input
									type="text"
									placeholder="Enter Role" 
									name="role"
									value={userData.role}
									onChange={handleChange}
								/>
                            </div>
							<div>
								<FontAwesomeIcon icon={faPhone} />
								<label htmlFor="">Phone</label><br/>
								<input
									type="text"
									placeholder="Enter Phone" 
									name="phone"
									value={userData.phone}
									onChange={handleChange}
								/>
                            </div>
							<div>
								<FontAwesomeIcon icon={faLocationDot} />
								<label htmlFor="">Address</label><br/>
								<input
									type="text"
									placeholder="Enter Address" 
									name="address"
									value={userData.address}
									onChange={handleChange}
								/>
                            </div>
							<div>
								<FontAwesomeIcon icon={faUsers} />
								<label htmlFor="">Team</label><br/>
								<input
									type="text"
									placeholder="Enter Team" 
									name="team"
									value={userData.team}
									onChange={handleChange}
								/>
                            </div>
							<button>Save Details</button>
                        </form>
                    </div>

                </div>
				<input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
				<br />
				<button onClick={handleUpload}>
					<FontAwesomeIcon icon={faPenToSquare} />Change Profile Picture
				</button>
			</Modal>
			<button onClick={()=>navigate('/AddUser')}>
				<FontAwesomeIcon icon={faUserPlus} /> Edit Password
			</button>

			<button onClick={()=>navigate('/AddUser')}>
				<FontAwesomeIcon icon={faUserPlus} /> Add User
			</button>

			<button onClick={()=>navigate('/AddUser')}>
				<FontAwesomeIcon icon={faUserPlus} /> Sign Out
			</button>
        </div>
    )
}