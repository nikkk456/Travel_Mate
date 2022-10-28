import React, { useContext, useEffect, useState } from 'react'
import { Context } from './context';

const Result = () => {
  const [context, setcontext] = useContext(Context);
  const [json, setJson] = useState("");
  const [json2, setJson2] = useState("");
  const [json3, setJson3] = useState("");


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
  const fetchWeather = async () => {
    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${context}&appid=ba28e84e18da0c3fe8e5345f9570a442`
    try {
      const response = await fetch(url2);
      const nikk2 = await response.json();
      setJson2(nikk2);
      console.log(nikk2);
      // console.log("the work is done");
    } catch (error) {
      console.log("error", error);
    }
  };


  //Hotel API
  const Hotel = [];
  const url3 = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${context}`;
  const options3 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '79c5aa5dcbmsh772702d82263cd8p1e1a21jsna38157aed036',
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
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

  useEffect(() => {
    fetchData();
    fetchWeather();
    fetchHotel();
  }, []);
  

  return (
      <>
        <div className='container'>
          <h3 className='my-3 text-center'>{context}</h3>
          <center><img src={json.image} style={{ width: "30%", border: "2px solid black", borderRadius: "30px" }}></img></center>
          <p className='text-center my-2'>{json.summary}...<a href={json.url} target='_blank' >Read more</a></p>
          <center>
            <div className="card my-2" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title text-center">{json.title}</h5>
                <h3 className='text-center'>{json2.weather[0].description} clouds: {json2.clouds.all} </h3>
                <p className="card-text">Temp: {(json2.main.temp-273).toFixed(2)} Max_temp: {(json2.main.temp_max - 273).toFixed(2)} Min_temp: {(json2.main.temp_min - 273).toFixed(2)} </p>
              </div>
            </div>
          </center>
          <div>
            <h5><b>List of hotels available in that places:</b></h5>
            <ul>
      {json3.data.map((animal, index) => (
        <li key={index}>{animal.title} <br/>Adress: {animal.secondaryText}</li>
      ))}
    </ul>
          </div>
        </div>
  
      </>
    )
  }
    
  

export default Result
