import React, { useContext, useEffect, useState } from 'react'
import { Context } from './context';
import Typewriter from "typewriter-effect";
import { auth } from '../Firebase';
import Navbar from './Navbar';
import { db } from '../Firebase';
import { get } from 'firebase/database';
import { ref, child } from 'firebase/database';
import GetGuide from './GetGuide';

const Result = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    })
  }, [])
  const [context, setcontext] = useContext(Context);
  const [json, setJson] = useState(null);
  const [json2, setJson2] = useState(null);
  const [json3, setJson3] = useState(null);
  const [json4, setJson4] = useState(null);


  const url = `https://wiki-briefs.p.rapidapi.com/search?q=${context}&topk=5`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '79c5aa5dcbmsh772702d82263cd8p1e1a21jsna38157aed036',
      'X-RapidAPI-Host': 'wiki-briefs.p.rapidapi.com'
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      const nikk = await response.json();
      setJson(nikk);
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };



  //Weather API
  const options2 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '79c5aa5dcbmsh772702d82263cd8p1e1a21jsna38157aed036',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };
  const fetchWeather = async () => {
    const url2 = `https://yahoo-weather5.p.rapidapi.com/weather?location=${context}&format=json&u=c`
    try {
      const response = await fetch(url2, options2);
      const nikk2 = await response.json();
      setJson2(nikk2);
      console.log(nikk2);
      // console.log("the work is done");
    } catch (error) {
      console.log("error", error);
    }
  };


  //Hotel API
  const url3 = `https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?query=${context}&currency=INR&locale=en_US`
  const options3 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '79c5aa5dcbmsh772702d82263cd8p1e1a21jsna38157aed036',
      'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
    }
  };
  const fetchHotel = async () => {
    try {
      const response = await fetch(url3, options3);
      const nikk3 = await response.json();
      setJson3(nikk3);
      console.log(nikk3);
    } catch (error) {
      console.log("error", error);
    }
  };


  //GUIDE FETCH
  const getGuide = () => {
    const dbRef = ref(db);
    get(child(dbRef, `Guide/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setJson4(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  

  useEffect(() => {
    fetchData();
    fetchWeather();
    fetchHotel();
    getGuide();
  }, []);


  if (json === null || json2 === null || json3 === null || json4 === null) {
    return (<>
      <div className="loader">Loading...</div>
    </>)
  }
  else {
    return (<>
      <Navbar userName={userName} />
      <div className='container'>
        <div className="App">
          <Typewriter

            onInit={(typewriter) => {

              typewriter
                .typeString(`${json.title}`)
                .pauseFor(1000)
                .deleteAll()
                .typeString("Details")
                .start();
            }}
          />
        </div>
        <center><img src={json.image} style={{ width: "30%", border: "2px solid black", borderRadius: "30px" }}></img></center>
        <p className='text-center my-2'>{json.summary}...<a href={json.url} target='_blank' >Read more</a></p>
      </div>
      <center>
        <div className="card my-2" style={{ width: "18rem" }}>
          <div className="card-body">
            <div style={{ borderRadius: "10px", padding: "3px", backgroundColor: "blue", color: "white", marginBottom: "3%" }}><h3 className='text-center'>{json2.location.city} ({json2.location.country})</h3></div>
            <h5 className='text-center' style={{ borderBottom: "2px solid black", padding: "3px" }}>{json2.current_observation
              .condition.text}</h5>

            <p className='container' ><strong>Temp: </strong>{json2.current_observation
              .condition.temperature}&#8451; <br /> <strong>Sunrise:</strong> {json2.current_observation
                .astronomy.sunrise}<br />  <strong>Sunset:</strong> {json2.current_observation
                  .astronomy.sunset} <br /> <strong>Humidity:</strong> {json2.current_observation.atmosphere.humidity} <strong>Pressure:</strong> {json2.current_observation.atmosphere.pressure} <br /><strong>Wind Speed:</strong> {json2.current_observation.wind.speed} </p>
          </div>
        </div>
      </center>
      <h5>Weather forecast for upcoming 10 days!</h5>
      <div className='d-flex flex-wrap'>

        {json2.forecasts.map((nikk, san) => (
          <>
            <div className="card my-2 mx-2" style={{ width: "18rem" }}>
              <div className="card-body">
                <div style={{ backgroundColor: "rgb(128 58 178)", color: "white", marginBottom: "3%", padding: "1%", borderRadius: "10px" }}><h4 className="card-title text-center">{nikk.day}</h4></div>
                <h6 className='text-center' style={{ borderBottom: "2px solid black", padding: "3px" }}><strong>{nikk.text}</strong></h6>
                <p className='container'><strong>Max_temp:</strong> {nikk.high}&#8451;<br /> <strong>Min_Temp:</strong> {nikk.low}&#8451;</p>
              </div>
            </div>
          </>
        ))}

      </div>


      {/* //LIST OF HOTELS */}
      <div>
        <h3 className='text-center my-3'><b>List of hotels available in that places:</b></h3>
        <ul>
          {json3.suggestions.map((animal, index) => (
            <>
              <h5 className='my-2 mx-2' key={index}><span style={{ borderBottom: "2px solid yellow" }}>{animal.group}</span></h5>
              <div className='d-flex container flex-wrap'>
                {animal.entities.map((value, i) => (
                  <>
                    <div className="card my-2 mx-2" style={{ width: "18rem" }}>
                      <div className="card-body">
                        <div style={{ backgroundColor: "rgb(155 75 75)", color: "white", marginBottom: "3%", padding: "1%", borderRadius: "10px" }}><h4 className="card-title text-center">{value.name}</h4></div>
                        <h6 style={{ borderBottom: "2px solid black", borderTop: "2px solid black", padding: "3px" }}>{value.caption}</h6>
                        <p className='container'><strong>Destination Id:</strong> {value.destinationId} <br /> <strong>Latitude:</strong> {value.latitude}<br /> <strong>Longitude:</strong> {value.longitude}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>

          ))}
        </ul>
      </div>
      <GetGuide/>
    </>)
  }


}



export default Result
