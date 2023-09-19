import React, { useContext, useEffect, useState } from 'react'
import { Context } from './context';
import { get } from 'firebase/database';
import { ref, child } from 'firebase/database';
import { db } from '../Firebase';

const GetGuide = () => {
  const [isActive, setIsActive] = useState(false);
  const [context, setcontext] = useContext(Context);
  const [arr, setArr] = useState([]);
  const getGuide = () => {
    const dbRef = ref(db);
    get(child(dbRef, `Guide/`)).then((snapshot) => {
      if (snapshot.exists()) {
        let temp = Object.keys(snapshot.val()).map(key => { return [key, snapshot.val()[key]]; })
        // console.log(temp);
        Array.prototype.push.apply(arr, temp);
        console.log(arr);
        setIsActive(true);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  
  
  useEffect(() => {
    getGuide();
  }, [])

  return (
    <>
      <div className='container '>
        <h3 className='text-center my-2'><b>List of Guides you can hire which guides you throughout the journey!</b></h3>
        
        {isActive?
        <div className='d-flex flex-wrap container'>
        {arr.map((animal, i) => (<>
          {animal[1].city == context?
          <div className="card mx-2 my-2" key={i} style={{ width: "18rem" }}>
          <div className="card-body">
            <div style={{backgroundColor: "#c63071", borderRadius :"15px", padding:"0.2rem"}}><h5 className="card-title text-center" style={{ color:"white"}}>{animal[1].fname} {animal[1].lname} </h5></div>
            <hr style={{border:"2px solid black"}}/>
            <p className="card-text"><b>Email:</b> {animal[1].email} <br />
              <b>Gender:</b> {animal[1].gender}
              <b> Date Of Birth:</b> {animal[1].dob} <br />
              <b>Address:</b> {animal[1].address} {animal[1].city} {animal[1].state} {animal[1].pincode} <br/>
              <b>Phone No.</b> {animal[1].phone} <br />
              <b>ID Number:</b> {animal[1].idno}
              </p>
            <a href="#" className="btn btn-dark">Hire Now</a>
          </div>
        </div>:""}
        </>))}
        </div>
        :""}  
        


      </div>
    </>
  )
}

export default GetGuide
