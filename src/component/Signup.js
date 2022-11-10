
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Firebase.js'
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ name: "", email: "", pass: "" });
    const [submitButton, setSubmitButton] = useState(false);
    const handleSubmit = () => {
        // console.log(values);

        setSubmitButton(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name
                })
                navigate("/Home");
                // console.log(user);
                setSubmitButton(false);
            })
            .catch((err) => {
                setSubmitButton(false);
                console.log(err.message);
            })
        // console.log(values);
    }
    return (
        
            <section className="vh-100 gradient-custom-3">
                <h3 className='text-center '>Come Join us!</h3>
                <div className="container" style={{ width: "50%", backgroundColor: "white", borderRadius:"30px" }}>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label my-3">Enter your UserName</label>
                            <input type="text" onChange={(event) => {
                                setValues((prev) => ({ ...prev, name: event.target.value }))
                            }} className="form-control" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" onChange={(event) => {
                                setValues((prev) => ({ ...prev, email: event.target.value }))
                            }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" onChange={(event) => {
                                setValues((prev) => ({ ...prev, pass: event.target.value }))
                            }} className="form-control" id="exampleInputPassword1" />
                        </div>
                        {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                        <button type="button" disabled={submitButton} className="btn btn-primary" onClick={handleSubmit}>Register Now</button>
                        <div className='form-text' style={{padding: "0.5rem"}}>
                            If you have already account <Link to='/Login'>Login Now!</Link>
                        </div>
                    </form>
                </div>
            </section>
        
    )
}

export default Signup
