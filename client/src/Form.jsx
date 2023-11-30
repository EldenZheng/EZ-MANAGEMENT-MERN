import React from "react";

export default function form (props){
    return(
        <div>
            <div>
                <form onSubmit={props.action}>
                    <h2>{props.title}</h2>
                    {props.loggedIn &&(
                        <div>
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Name" 
                                className='form-control' 
                                name="name"
                                value={props.formData.name}
                                onChange={props.handleChange}
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="text" 
                            placeholder="Enter Email" 
                            className='form-control' 
                            name="email"
                            value={props.formData.email}
                            onChange={props.handleChange}
                        />
                    </div>
                    {props.loggedIn &&(
                        <div>
                            <label htmlFor="">Age</label>
                            <input
                                type="text" 
                                placeholder="Enter Age" 
                                className='form-control' 
                                name="age"
                                value={props.formData.age}
                                onChange={props.handleChange}
                            />
                        </div>
                    )}
                    {!(props.loggedIn) &&(
                        <div>
                            <label htmlFor="">Password</label>
                            <input
                                type="password" 
                                placeholder="Enter Password" 
                                className='form-control' 
                                name="password"
                                value={props.formData.password}
                                onChange={props.handleChange}
                            />
                        </div>
                    )}
                    <button>{props.buttonText}</button>
                </form><br />
            </div>
        </div>
    )
}