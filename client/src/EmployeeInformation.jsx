import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope , faUser , faAddressCard , faBriefcase , faPhone , faLocationDot , faCalendar , faStar , faUsers } from '@fortawesome/free-solid-svg-icons'

export default function EmployeeModal(props) {
    return(
        <div>
            {props.isOpen && (
                <dialog open={props.isOpen} className="modal">
                    <button onClick={props.closeModal}>Close</button>
                    <h1><FontAwesomeIcon icon={faUser} /> Employee Information</h1>
                    <hr/>
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
                            <table>
                                <tr style={{borderBottom: '1px solid gray'}}>
                                    {/* <td><h2><FontAwesomeIcon icon={faUser} /></h2></td> */}
                                    <td><h2>{props.userdata.name}</h2></td>
                                </tr>
                                <tr style={{marginTop:'10px'}}>
                                    <td><FontAwesomeIcon icon={faEnvelope} /></td>
                                    <td><label>{props.userdata.email}</label></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faAddressCard} /></td>
                                    <td><label>{props.userdata.ic}</label></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faBriefcase} /></td>
                                    <td><label>{props.userdata.dept} - {props.userdata.role}</label></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faPhone} /></td>
                                    <td><label>{props.userdata.phone}</label></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faLocationDot} /></td>
                                    <td><label>{props.userdata.address}</label></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faCalendar} /></td>
                                    <td><label>{props.userdata.hiredDate}</label></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faStar} /></td>
                                    <td><label>{props.userdata.rating}</label></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faUsers} /></td>
                                    <td><label>Team {props.userdata.team}</label></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    )
}