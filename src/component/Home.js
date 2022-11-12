import React, { useContext, useEffect } from 'react'
import bg from "./Image/bg.jpg"
import Typewriter from "typewriter-effect";
import Footer from "./Footer"
import Navbar from './Navbar';
import {  useState } from 'react';
import { auth } from '../Firebase';
import { useNavigate } from "react-router-dom";
import { Context } from './context';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
const Home = () => {
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
    const navigate = useNavigate();
    const[context, setcontext] = useContext(Context);
    const[Text, setText] = useState("");
    const HandleChange = (event)=>{
        setText(event.target.value);
        // console.log(Text);
    }
    const result = ()=>{
        setcontext(Text);
        navigate("/result");
    }
    
    
    
    return (
        <>
            <Navbar userName = {userName}/>
            <div style={{ backgroundImage: `url(${bg})`, width: "100%", backgroundSize: 'cover', height: '100vh', zIndex: "-1" }}>
                <div className='container'>
                    <div className="App">
                        <Typewriter

                onInit={(typewriter) => {

                                typewriter
                                    .typeString("Travel_Mate welcomes you")
                                    .pauseFor(1000)
                                    .deleteAll()
                                    .typeString("One stop services")
                                    .start();
                                }}
                                />
                    </div>
                    <center>
                    <form role="search">
                        <input className="form-control me-1" style={{ width: "30%", borderRadius: "1.3rem" }} type="search" placeholder="Enter your destination" aria-label="Search" onChange={HandleChange} />
                        </form>
                    <Link to='/result'><button className="btn btn-outline-dark my-2" type="submit" onClick={result}>Search</button></Link>
                    </center>
                </div>
            </div>
            <div className='container'>
                <h3 className='text-center my-2 '><span className='my-2' style={{borderBottom: "2px solid yellow"}}>Travel_Mate</span></h3>
                <p style={{border: "1px solid black", borderRadius: "30px", padding: "25px"}}>
                    TravelMate is a website which provides you the one stop solution for all the problems of travelers whether it is regular Upadtes, Complete details of that place or how to reach That place with a cost effective way.
                    Travel mate also solve the language barrier problem as you can hire a guide on your journey According to the reviews of the other travellors (all the guides are truely certified and can be trustable ). 
                    Not only this you can search a travel blog related to your destination and find all the related thrill and experience by your travell mates.
                    and the last but not least you Can intreact with your travel mates with our app, you can chat with them and can enjoy your journey more joyfully.
                </p>
            </div>
            <Footer/>
        </>
    )
}

export default Home
