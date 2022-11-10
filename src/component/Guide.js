import React, { useState } from 'react'

const Guide = () => {
    const [values, setValues] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        gender: "",
        state: "",
        city: "",
        pincode: "",
        charge: "",
        idno: "",
    });

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {fname,lname,email,phone,address,dob,gender,state,city,pincode,charge,idno} = values;
        const res = await fetch("https://basicproject-fbdd1-default-rtdb.asia-southeast1.firebasedatabase.app/Guide.json",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"   
            },
            body: JSON.stringify({fname,
                lname,
                email,
                phone,
                address,
                dob,
                gender,
                state,
                city,
                pincode,
                charge,
                idno
            })
        });//Firebase me / ke baad hume database ka naam likhna padega to create a database

        if (res) {
            setValues({
                fname: "",
                lname: "",
                email: "",
                phone: "",
                address: "",
                dob: "",
                state: "",
                city: "",
                pincode: "",
                charge: "",
                idno: "",
            })
            console.log("yaha pe to aara hai");
            alert("Data Stores Successfully");
        }
    }
    return (
        <div>
            <section className="vh-100 gradient-custom">
                <form method='POST'>
                    <div className="container py-5 h-100">
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
                                                        <input type="text" id="firstName" required onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, fname: event.target.value }))
                                                        }} className="form-control form-control-lg" />
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="lastName">Last Name</label>
                                                        <input type="text" id="lastName" onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, lname: event.target.value }))
                                                        }} className="form-control form-control-lg" />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-2 d-flex align-items-center">

                                                    <div className="form-outline datepicker w-100">
                                                        <label htmlFor="birthdayDate" className="form-label">DOB (DD/MM/YYYY)</label>
                                                        <input type="text" required onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, dob: event.target.value }))
                                                        }} className="form-control form-control-lg" id="birthdayDate" />
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-2">

                                                    <h6 className="mb-2 pb-1">Gender: </h6>

                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                                            value="option1" />
                                                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                                    </div>

                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                                            value="option2" defaultChecked />
                                                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                                                    </div>

                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                                                            value="option3" />
                                                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-2 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="emailAddress">Email</label>
                                                        <input type="email" id="emailAddress" onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, email: event.target.value }))
                                                        }} className="form-control form-control-lg" />
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-2 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                                        <input type="tel" id="phoneNumber" onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, phone: event.target.value }))
                                                        }} className="form-control form-control-lg" />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-2 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="emailAddress">Enter Your permanent adress</label>
                                                        <input type="text" id="Adress" onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, address: event.target.value }))
                                                        }} className="form-control form-control-lg" />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 mb-2 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="emailAddress">State</label>
                                                        <input type="text" id="State" onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, state: event.target.value }))
                                                        }} className="form-control form-control-lg" />
                                                    </div>

                                                </div>
                                                <div className="col-md-4 mb-2 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="phoneNumber">City</label>
                                                        <input type="text" id="City" onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, city: event.target.value }))
                                                        }} className="form-control form-control-lg" />
                                                    </div>

                                                </div>
                                                <div className="col-md-4 mb-2 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="phoneNumber">Pin Code</label>
                                                        <input type="tel" id="Pincode" onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, pincode: event.target.value }))
                                                        }} className="form-control form-control-lg" />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-2 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="emailAddress">Enter your charge per day</label>
                                                        <input type="tel" id="Charge" onChange={(event) => {
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
                                                        <input type="text" id="file" onChange={(event) => {
                                                            setValues((prev) => ({ ...prev, idno: event.target.value }))
                                                        }} className="form-control " />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="mt-2 pt-2">
                                                <input className="btn btn-primary btn-lg" type="submit" value="Submit" onClick={handleSubmit} />
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </section>
        </div>
    )
}

export default Guide
