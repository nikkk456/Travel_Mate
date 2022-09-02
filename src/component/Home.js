import React from 'react'
import bg from "./Image/bg.jpg"
import Typewriter from "typewriter-effect";
const Home = () => {
    return (
        <>
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
                        <input className="form-control me-1" style={{ width: "30%", borderRadius: "1.3rem" }} type="search" placeholder="Enter your destination" aria-label="Search" />
                        </form>
                    <button className="btn btn-outline-dark my-2" type="submit">Search</button>
                    </center>
                </div>
            </div>
            <div className='container'>
                <h3>Travel_Mate</h3>
                <p>
                    TravelMate is a website which provides you the one stop solution for all the problems of travelers whether it is regular Upadtes, Complete details of that place or how to reach That place with a cost effective way.
                    Travel mate also solve the language barrier problem as you can hire a guide on your journey According to the reviews of the other travellors (all the guides are truely certified and can be trustable ). 
                    Not only this you can search a travel blog related to your destination and find all the related thrill and experience by your travell mates.
                    and the last but not least you Can intreact with your travel mates with our app, you can chat with them and can enjoy your journey more joyfully.
                </p>
            </div>
        </>
    )
}

export default Home
