import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../Firebase.js';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: "", pass: "" });
    const [submitButton, setSubmitButton] = useState(false);
    const handleSubmit = () => {

        setSubmitButton(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {

                navigate("/Home");
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
            <h3 className='text-center'>Welcome Again!</h3>
            <div className='container' style={{ width: "50%", backgroundColor: "white", borderRadius:"30px" }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label my-3">Email address</label>
                        <input type="email" onChange={(event) => {
                            setValues((prev) => ({ ...prev, email: event.target.value }))
                        }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={(event) => {
                            setValues((prev) => ({ ...prev, pass: event.target.value }))
                        }} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="button" disabled={submitButton} className="btn btn-primary" onClick={handleSubmit}>Login Now</button>
                    <div className='form-text' style={{padding: "0.5rem"}}>
                        If you did'nt have an account create one <Link to='/'>Register Now!</Link>
                    </div>
                </form>
            </div>
        </section>

    )
}

export default Login
