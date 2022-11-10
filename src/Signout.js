import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';

const Signout = () => {
    const navigate = useNavigate();
    const handleSubmit = ()=>{
        signOut(auth).then(() => {
            console.log("Signout Successfully!")
            navigate("/");
          }).catch((error) => {
            console.log(error)
          });
    }
  return (
    <div className='container align-item-center'>
      <h3 className='text-center '>We will Miss You :( </h3>
      <h5 className='text-center'>Are You Sure You Want To Signout??</h5>
      <center><button type="button"className="btn btn-primary" onClick={handleSubmit}>Signout Now</button></center>
    </div>
  )
}

export default Signout
