import { get } from 'firebase/database';
import { ref, child, set } from 'firebase/database';
import React, { useState, useEffect } from 'react'
import { db } from '../Firebase';
import Navbar from './Navbar';
import { auth } from '../Firebase';

const Guide = () => {
    const[userName, setUserName] = useState("");
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if (user) {
                setUserName(user.displayName);
            } else {
                setUserName("");
            }
        })
    },[])
    const [json, setJson] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [values, setValues] = useState({fname: "",lname: "",email: "",phone: "",address: "",dob: "",gender: "",state: "",city: "",pincode: "",charge: "",idno: "",
    });

    const handleSubmit = async (e) => {

        e.preventDefault();
        const { fname, lname, email, phone, address, dob, gender, state, city, pincode, charge, idno } = values;
        set(ref(db, 'Guide/' + fname), {
            fname: fname,
            email: email,
            lname: lname,
            phone: phone,
            address: address,
            dob: dob,
            gender: gender,
            state: state,
            city: city,
            pincode: pincode,
            charge: charge,
            idno: idno,
        }).then(() => {
            alert("Data Added successfully");
            setValues({
                fname: "", lname: "", email: "", phone: "", address: "", dob: "", state: "", city: "", pincode: "", charge: "", idno: "",
            })
            const dbRef = ref(db);
            get(child(dbRef, `Guide/${values.fname}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setJson(snapshot.val());
                    setIsActive(!isActive);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });


        });

    }

    return (
        <>
        <Navbar userName = {userName}/>
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100" style={{ display: isActive ? "block" : "none" }}>
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-2 pb-2 pb-md-0 mb-md-3">Registration Form</h3>
                                    <form>

                                        <div className="row">
                                            <div className="col-md-6 mb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="firstName">First Name</label>
                                                    <input type="text" id="firstName" value={values.fname} required onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, fname: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="lastName">Last Name</label>
                                                    <input type="text" id="lastName" value={values.lname} onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, lname: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-2 d-flex align-items-center">

                                                <div className="form-outline datepicker w-100">
                                                    <label htmlFor="birthdayDate" className="form-label">DOB (DD/MM/YYYY)</label>
                                                    <input type="text" value={values.dob} onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, dob: event.target.value }))
                                                    }} className="form-control form-control-lg" id="birthdayDate" />
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-2">

                                                <h6 className="mb-2 pb-1">Gender: </h6>

                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                                        value="female" onChange={(event)=>{
                                                            setValues((prev)=>({...prev, gender:event.target.value}))
                                                        }} />
                                                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                                        value="male"onChange={(event)=>{
                                                            setValues((prev)=>({...prev, gender:event.target.value}))
                                                        }} defaultChecked />
                                                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                                                        value="Others" onChange={(event)=>{
                                                            setValues((prev)=>({...prev, gender:event.target.value}))
                                                        }} />
                                                    <label className="form-check-label" htmlFor="otherGender">Other</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-2 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="emailAddress">Email</label>
                                                    <input type="email" value={values.email} id="emailAddress" onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, email: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-2 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                                    <input type="tel" value={values.phone} id="phoneNumber" onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, phone: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-2 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="emailAddress">Enter Your permanent adress</label>
                                                    <input type="text" value={values.address} id="Adress" onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, address: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mb-2 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="emailAddress">State</label>
                                                    <input type="text" value={values.state} id="State" onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, state: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                            <div className="col-md-4 mb-2 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="phoneNumber">City</label>
                                                    <input type="text" value={values.city} id="City" onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, city: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                            <div className="col-md-4 mb-2 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="phoneNumber">Pin Code</label>
                                                    <input type="tel" value={values.pincode} id="Pincode" onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, pincode: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-2 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="emailAddress">Enter your charge per day</label>
                                                    <input type="tel" value={values.charge} id="Charge" onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, charge: event.target.value }))
                                                    }} className="form-control form-control-lg" />
                                                </div>

                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-12">

                                                <select className="select form-control-lg" style={{ fontSize: "1rem" }}>
                                                    <option value="1" disabled>Choose option</option>
                                                    <option value="2">Aadhar Card</option>
                                                    <option value="3">Voter ID</option>
                                                    <option value="4">Driving License</option>
                                                </select>
                                                <label className="form-label select-label mx-2">Select Valid ID Proof</label>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-2 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label my-2" htmlFor="emailAddress">Enter the ID number</label>
                                                    <input type="text" value={values.idno} id="file" onChange={(event) => {
                                                        setValues((prev) => ({ ...prev, idno: event.target.value }))
                                                    }} className="form-control " />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="mt-2 pt-2">
                                            <input className="btn btn-primary btn-lg" type="submit" value="Submit" onClick={handleSubmit} />
                                        </div>
                                        {/* <div className="mt-2 pt-2">
                                            <input className="btn btn-primary btn-lg" type="submit" value="data" onClick={getdata} />
                                        </div> */}

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isActive ? "" : <center>
                <div className='container '>
                    <div className="card " style={{ width: "22rem" }}>
                        <div className="card-body">
                            <h5 className="card-title text-center">{json.fname} {json.lname} </h5><hr style={{border: "2px solid black"}}/>
                            <p className="card-text"><b>Email:</b> {json.email} <br />
                                <b>Gender:</b> {json.gender}
                                <b>Date Of Birth:</b> {json.dob} <br />
                                <b>Address:</b> {json.address} {json.city} {json.state} {json.pincode} <br />
                                <b>Phone No.</b> {json.phone} <br />
                                <b>ID Number:</b> {json.idno}

                            </p>
                            <h5>We are currently Verifying Your details Come back soon!</h5>
                            <h6>Thankyou!!</h6>
                        </div>
                    </div>
                </div>
                </center>}
            </section>
        </div>
        </>
        
    )
}

export default Guide
