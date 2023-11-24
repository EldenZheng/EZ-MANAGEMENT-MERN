import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope , faUser , faAddressCard , faBriefcase , faPhone , faLocationDot , faUsers, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function AddUser(){
    const [file, setFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
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

    const AddUser = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/createUser",userData)
        .then(result =>{
            handleUpload()
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setProfilePicture(URL.createObjectURL(file))
    };

	const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            await axios.post('http://localhost:3001/upload-profile-picture/'+userData.email, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
            alert('Profile picture uploaded successfully');
        } catch (error) {
            alert('Profile picture upload failed');
			console.log(error)
        }
    };
	

    return(
        <>
            <div className='employeeDetContainer'>
                <div className='imageContainer'>
                    <img className='circleImage'
                        src={profilePicture || 'profile-picture/default-profile-picture.png'}
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

        </>
    )
}