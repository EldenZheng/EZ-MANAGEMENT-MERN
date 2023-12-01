import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope , faUser , faAddressCard , faBriefcase , faPhone , faLocationDot , faUsers, faKey } from '@fortawesome/free-solid-svg-icons'

export default function AddUser(){
    const [file, setFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [emailExists, setEmailExists] = useState(false);
    const [icExists, setICExists] = useState(false);
    const [userData,setUserData]=useState({
		name: '',
		email: '',
        password: '',
		ic: '',
		dept: '',
		role: '',
		phone: '',
		address: '',
		team: '',
		picture: ''
	});

    const navigate = useNavigate()

    const AddUser = (e)=>{
        e.preventDefault();
        if (emailExists) {
            alert('Email is already in use. Please use a different email.');
            return;
        }
    
        if (icExists) {
            alert('IC is already in use. Please use a different IC.');
            return;
        }
        axios.post("http://localhost:3001/createUser",userData)
        .then(result =>{
            handleUpload()
            alert('Employee Added Successfully!')
            navigate('/Home')
        })
        .catch(err=>console.log(err))
    }

    const handleChange = (e) => {
        const {name,value}=e.target;
        // If "HR" is selected for "Role" or "Department," lock in "HR" for the other option
        if ((name === 'role' || name === 'dept') && value === 'HR') {
            setUserData((prevData) => ({
            ...prevData,
            role: 'HR',
            dept: 'HR',
            team: '', // Reset team when "HR" is selected for "Role" or "Department"
            }));
        } else {
            setUserData((prevData) => ({
            ...prevData,
            [name]: value,
            // Reset the other option if "HR" is selected
            ...(name === 'dept' && prevData.dept === 'HR' && value !== 'HR' ? { role: '', team: '' } : {}),
            // You can add similar conditions for other options
            }));
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
    
        setFile(selectedFile);
    
        if (selectedFile) {
            setProfilePicture(URL.createObjectURL(selectedFile));
        }
    };
    

	const handleUpload = async () => {
        let fileToUpload = file;

        if (!fileToUpload) {
            // If file is empty, use default profile picture
            fileToUpload = await fetchDefaultProfilePicture();
        }
    
        const formData = new FormData();
        formData.append('profilePicture', fileToUpload);

        try {
            await axios.post('http://localhost:3001/upload-profile-picture/'+userData.email, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        } catch (error) {
            alert('Profile picture upload failed');
			console.log(error)
        }
    };

    const fetchDefaultProfilePicture = async () => {
        try {
            const response = await fetch('./profile-picture/default-profile-picture.png');
            const blob = await response.blob();
            return new File([blob], 'default-profile-picture.png');
        } catch (error) {
            console.log(error);
            return null;
        }
    };
	useEffect(() => {
        // Function to check if email exists
        const checkEmailAvailability = async () => {
          try {
            const response = await axios.get('http://localhost:3001/checkEmailUser/'+userData.email);
            setEmailExists(response.data.emailExists);
          } catch (error) {
            console.error('Error checking email availability:', error);
          }
        };
    
        // Function to check if IC exists
        const checkICAvailability = async () => {
          try {
            const response = await axios.get('http://localhost:3001/checkICUser/'+userData.ic);
            setICExists(response.data.icExists);
          } catch (error) {
            console.error('Error checking IC availability:', error);
          }
        };
    
        // Perform email and IC checks when the user data changes
        if (userData.email) {
          checkEmailAvailability();
        }
    
        if (userData.ic) {
          checkICAvailability();
        }
      }, [userData.email, userData.ic]);

    return(
        <>
            <div className='employeeDetContainer'>
                <div className='imageContainer'>
                    <img className='circleImage'
                        src={ profilePicture || 'profile-picture/default-profile-picture.png'}
                        alt="Profile"
                    />
                </div>
                <div>
                    <form onSubmit={AddUser}>
                        <div>
                            <FontAwesomeIcon icon={faUser} />
                            <label htmlFor="">Name</label><br/>
                            <input
                                type="text"
                                placeholder="Enter Name" 
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <label htmlFor="">Email</label><br/>
                            <input
                                type="email"
                                placeholder="Enter Email" 
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {emailExists ? (
                            <span style={{ color: 'red' }}>Email is already in use. Please use a different email.</span>
                        ) : (
                            <span style={{ color: 'green' }}>Email is available.</span>
                        )}
                        <div>
                            <FontAwesomeIcon icon={faKey} />
                            <label htmlFor="">Password</label><br/>
                            <input
                                type="text"
                                placeholder="Enter Password" 
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                required
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
                                required
                            />
                        </div>
                        {icExists ? (
                            <span style={{ color: 'red' }}>IC is already in use. Please use a different IC.</span>
                        ) : (
                            <span style={{ color: 'green' }}>IC is available.</span>
                        )}
                        <div>
                            <FontAwesomeIcon icon={faBriefcase} />
                            <label htmlFor="dept">Department</label><br/>
                            <select
                                name="dept"
                                value={userData.dept}
                                onChange={handleChange}
                                required
                                // disabled={userData.role === 'HR'} // Disable if "HR" is selected for "Role"
                            >
                                <option value="">Select Department</option>
                                <option value="HR">HR Department</option>
                                <option value="IT Department">IT Department</option>
                                <option value="Sales">Sales Department</option>
                                <option value="Marketing">Marketing Department</option>
                            </select>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBriefcase} />
                            <label htmlFor="role">Role</label><br/>
                            <select
                                name="role"
                                value={userData.role}
                                onChange={handleChange}
                                disabled={userData.dept === 'HR'} // Disable if "HR" is selected for "Department"
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="Employee">Employee</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUsers} />
                            <label htmlFor="team">Team</label><br/>
                            <select
                                name="team"
                                value={userData.team}
                                onChange={handleChange}
                                disabled={userData.role === 'HR' || userData.dept === 'HR'} // Disable if "HR" is selected for "Role" or "Department"
                                required
                            >
                                <option value="">Select Team</option>
                                <option value="1">Team 1</option>
                                <option value="2">Team 2</option>
                                <option value="3">Team 3</option>
                            </select>
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
                                required
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
                                required
                            />
                        </div>
                        <button>Add User</button>
                    </form>
                </div>

            </div>
            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
            <br />
        </>
    )
}