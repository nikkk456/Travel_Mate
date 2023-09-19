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
      "Transfer-Encoding": "chunked",
      "Connection": "keep-alive",
      "Vary": "Accept-Encoding",
      "CDN-PullZone": "93447",
      "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
      "CDN-RequestCountryCode": "GB",
      "CDN-ProxyVer": "1.03",
      "CDN-RequestPullSuccess": "True",
      "CDN-RequestPullCode": "200",
      "CDN-CachedAt": "12/11/2022 07:22:27",
      "CDN-EdgeStorageId": "946",
      "CDN-Status": "200",
      "CDN-RequestId": "a9cb0fe18a5cd45619e37fccc6f926e1",
      "CDN-Cache": "HIT",
      "Cache-Control": "public, max-age=180",
      "Content-Type": "application/json",
      "Date": "Sun, 11 Dec 2022 07:22:28 GMT",
      "Server": "BunnyCDN-FR1-951"
    }
  };
  const fetchWeather = async () => {
    const url2 = `http://api.weatherapi.com/v1/forecast.json?key=acc5a29a357e4169ac265929221112&q=${context}&days=5&aqi=no&alerts=no`
    try {
      const response = await fetch(url2, options2);
      const nikk2 = await response.json();
      setJson2(nikk2);
      console.log("weather api here");
      console.log(nikk2);
      // console.log("the work is done");
      console.log(json2.location.lat + " " + json2.location.lon);
    } catch (error) {
      console.log("error", error);
    }
  };


  //Hotel API
  const url3 = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${context}`
  const options4 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1d67b0a460msh9c97672f960fd40p1e2888jsn48c8c644025f',
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  };
  const fetchHotel = async () => {
    try {
      const response = await fetch(url3, options4);
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


  if (json === null || json4 === null) {
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
            <div style={{ borderRadius: "10px", padding: "3px", backgroundColor: "blue", color: "white", marginBottom: "3%" }}><h3 className='text-center'>{context} </h3></div>
            <img src={json2.current.condition.icon}></img>
            <h5 className='text-center' style={{ borderBottom: "2px solid black", padding: "3px" }}>{json2.current.condition.text}</h5>

            <p className='container' ><strong>Temp: </strong>{json2.current.temp_c}&#8451; <br /> <strong>Humidity:</strong> {json2.current.humidity} <strong>Pressure:</strong> {json2.current.pressure_mb} <br /><strong>Wind Speed:</strong> {json2.current.wind_mph} </p>
          </div>
        </div>
      </center>
      <h5>Weather forecast for upcoming days!</h5>
      <div className='d-flex flex-wrap'>

        {json2.forecast.forecastday.map((nikk, san) => (
          <>
            <div className="card my-2 mx-2" key={san} style={{ width: "18rem" }}>
              <div className="card-body">
                <div style={{ backgroundColor: "rgb(128 58 178)", color: "white", marginBottom: "3%", padding: "1%", borderRadius: "10px" }}><h4 className="card-title text-center">{nikk.date}</h4></div>
                <div className='text-center'><img src={nikk.day.condition.icon}></img></div>
                <h5 className='text-center' style={{ borderBottom: "2px solid black", padding: "3px" }}>{nikk.day.condition.text}</h5>
                {/* <h6 className='text-center' style={{ borderBottom: "2px solid black", padding: "3px" }}><strong>{nikk.text}</strong></h6> */}
                <p className='container'><strong>Max_temp:</strong> {nikk.day.maxtemp_c}&#8451;<br /> <strong>Min_Temp:</strong> {nikk.day.mintemp_c}&#8451; <br /><strong>Sunrise:</strong> {nikk.astro.sunrise} <strong>Sunset:</strong> {nikk.astro.sunset}</p>
              </div>
            </div>
          </>
        ))}

      </div>
      <div>
        <h3 className='text-center my-3'><b>List of hotels available in that places:</b></h3>

        <div className='d-flex container flex-wrap'>
          {json3.data.map((value, i) => (
            <>
              <div className="card my-2 mx-2" style={{ width: "18rem" }}>
                <div className="card-body">
                  <div style={{ backgroundColor: "rgb(155 75 75)", color: "white", marginBottom: "3%", padding: "1%", borderRadius: "10px" }}><h4 className="card-title text-center">{value.title}</h4></div>
                  <h6 style={{ borderBottom: "2px solid black", borderTop: "2px solid black", padding: "3px" }}>{value.secondaryText}</h6>
                  <p className='container'><strong>GeoId:</strong> {value.geoId} <br /> <strong>DocumentId:</strong> {value.documentId}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <GetGuide />
    </>)
  }


}



export default Result
