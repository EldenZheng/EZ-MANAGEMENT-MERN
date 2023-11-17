import React from 'react'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope , faUser , faAddressCard , faBriefcase , faPhone , faLocationDot , faCalendar , faStar , faUsers , faIdCard } from '@fortawesome/free-solid-svg-icons'

export default function EmployeeModal(props) {
	return (
	  <Modal
		{...props}
		size="lg"
		aria-labelledby="contained-modal-title-vcenter"
		centered
	  >
		<Modal.Header closeButton>
		  <Modal.Title id="contained-modal-title-vcenter">
          <FontAwesomeIcon icon={faIdCard} /> Employee Information
		  </Modal.Title>
		</Modal.Header>
		<Modal.Body>
            <div className='employeeDetContainer'>
                <div>
                    <div className='imageContainer'>
                            <img className='circleImage'
                                src={props.userdata.picture || 'profile-picture/default-profile-picture.png'}
                                alt="Profile"
                            />
                    </div>
                </div>
                <div>
                    <h4> <FontAwesomeIcon icon={faUser} /> {props.userdata.name}</h4>
                    <FontAwesomeIcon icon={faEnvelope} /> <label>{props.userdata.email}</label><br/>
                    <FontAwesomeIcon icon={faAddressCard} /> <label>{props.userdata.ic}</label><br/>
                    <FontAwesomeIcon icon={faBriefcase} /> <label>{props.userdata.dept} - {props.userdata.role}</label><br/>
                    <FontAwesomeIcon icon={faPhone} /> <label>{props.userdata.phone}</label><br/>
                    <FontAwesomeIcon icon={faLocationDot} /> <label>{props.userdata.address}</label><br/>
                    <FontAwesomeIcon icon={faCalendar} /> <label>{props.userdata.hiredDate}</label><br/>
                    <FontAwesomeIcon icon={faStar} /> <label>{props.userdata.rating}</label><br/>
                    <FontAwesomeIcon icon={faUsers} /> <label>Team {props.userdata.team}</label><br/>
                </div>
            </div>
		</Modal.Body>
		{/* <Modal.Footer>
		  <Button onClick={props.onHide}>Close</Button>
		</Modal.Footer> */}
	  </Modal>
	);
  }