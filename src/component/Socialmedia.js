import React  from 'react'
import { auth } from '../Firebase'
import nature1 from './Image/nature1.webp'
import nature2 from './Image/nature2.jpg'
import nature3 from './Image/nature3.jpg'
import { useState, useEffect } from 'react'
import { storage } from '../Firebase'
import Navbar from './Navbar'
import {ref, uploadBytes} from 'firebase/storage';

const Socialmedia = () => {
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
    const [values, setValues] = useState({
        title:"",
        description:"",
    })
    const[imageUpload, setImageUpload] = useState(null);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {title,description} = values;
        const res = await fetch("https://basicproject-fbdd1-default-rtdb.asia-southeast1.firebasedatabase.app/Blog.json",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"   
            },
            body: JSON.stringify({
                title,
                description,
            })
        })
        const imageRef = ref(storage, `SocialImage/${imageUpload.name}`); // /iske baad file name aaega
        uploadBytes(imageRef, imageUpload).then(()=>{
            console.log("Image POSTED");
        })
        if (res) {
            alert("Successfully Posted");
        }
    }
    return (
        <>
        <Navbar userName = {userName}/>
            <section className="vh-100 gradient-custom-2">
                <div className="container">
                    <div className="row">

                        <div className="col-md-8 col-md-offset-2">

                            <h1>Create post</h1>

                            <form action="" method="POST">

                                <div className="form-group my-2">
                                    <label htmlFor="title">Title <span className="require">*</span></label>
                                    <input type="text" className="form-control" onChange={(event)=>{
                                         setValues((prev) => ({ ...prev, title: event.target.value }))
                                    }} name="title" />
                                </div>

                                <div className="form-group has-error my-2">
                                    <label htmlFor="slug">Attach Image,Videos<span className="require">*</span> </label>
                                    <input type="file" className="form-control" onChange={(event)=>{setImageUpload(event.target.files[0])}} name="image" />
                                </div>


                                <div className="form-group my-2">
                                    <label htmlFor="description">Description</label>
                                    <textarea rows="5" className="form-control" onChange={(event)=>{
                                         setValues((prev) => ({ ...prev, description: event.target.value }))
                                    }} name="description" ></textarea>
                                </div>

                                <div className="form-group">
                                    <p><span className="require">*</span> - required fields</p>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                        Create
                                    </button>
                                    <button className="btn btn-default">
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                    <div className='row my-4'>
                        <div className="card my-2 mx-4" style={{width: "18rem"}}>
                            <img src={nature1} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">What a beautiful View....</h5>
                                    <p className="card-text">Ea nulla qui ea laboris non occaecat laboris eiusmod cillum ullamco aliqua consectetur. Minim consequat duis ex commodo velit excepteur. Sunt sint sunt veniam labore anim ex ex ut.</p>
                                    <a href="#" className="btn btn-dark">View Post</a>
                                </div>
                        </div>
                        <div className="card my-2 mx-4" style={{width: "18rem"}}>
                            <img src={nature2} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Conquer this world...</h5>
                                    <p className="card-text">Ea nulla qui ea laboris non occaecat laboris eiusmod cillum ullamco aliqua consectetur. Minim consequat duis ex commodo velit excepteur. Sunt sint sunt veniam labore anim ex ex ut.</p>
                                    <a href="#" className="btn btn-dark">View Post</a>
                                </div>
                        </div>
                        <div className="card my-2 mx-4" style={{width: "18rem"}}>
                            <img src={nature3} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Planting a tree is a fun!</h5>
                                    <p className="card-text">Ea nulla qui ea laboris non occaecat laboris eiusmod cillum ullamco aliqua consectetur. Minim consequat duis ex commodo velit excepteur. Sunt sint sunt veniam labore anim ex ex ut.</p>
                                    <a href="#" className="btn btn-dark">View Post</a>
                                </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Socialmedia
