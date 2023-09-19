import React from 'react'
import { db } from '../Firebase';
import { ref as ref_database, child, set, get } from 'firebase/database';
import { auth } from '../Firebase'
import nature1 from './Image/nature1.webp'
import nature2 from './Image/nature2.jpg'
import nature3 from './Image/nature3.jpg'
import { useState, useEffect } from 'react'
import { storage } from '../Firebase'
import Navbar from './Navbar'
import { ref as ref_storage, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';


const Socialmedia = () => {
    const [arr, setArr] = useState([]);
    const [uploaded, setUploaded] = useState(false);

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
    const [values, setValues] = useState({
        title: "",
        description: "",
    })
    const urls = [];
    const [imageUpload, setImageUpload] = useState([]);
    const imageListref = ref_storage(storage, `SocialImage/`);
    var isuploaded = false;
    const handleSubmit =  async(e) => {
        e.preventDefault();
        const { title, description } = values;
         imageUpload.map( async (image) => {
            const imageRef = ref_storage(storage, `SocialImage/${image.name}`); // /iske baad file name aaega
             await uploadBytes(imageRef, image).then(async() => {
                console.log("Image POSTED");
                // setImageUpload(null);
               await getDownloadURL(imageRef).then((url) => {
                    urls.push(url);
                    console.log(urls);
                });

            });
            isuploaded = true;
            console.log(isuploaded);
        })
        setTimeout(() => {
            set(ref_database(db, 'Blog/' + title), {
                title: title,
                description: description,
                imageUrl: urls,
            }).then(() => {
                alert("Successfully Posted");
                setValues({
                    title: "", description: "",
                })
                setImageUpload(null);
                // window.location.reload(true);
            })
        }, 4000);
        
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const { title, description } = values;

    //     const imageRef = ref_storage(storage, `SocialImage/${imageUpload.name}`); // /iske baad file name aaega
    //     uploadBytes(imageRef, imageUpload).then(() => {
    //         // console.log("Image POSTED");
    //         setImageUpload(null);
    //         getDownloadURL(imageRef).then((url) => {
    //             set(ref_database(db, 'Blog/' + title), {
    //                 title: title,
    //                 description: description,
    //                 imageUrl: url,
    //             }).then(() => {
    //                 alert("Successfully Posted");
    //                 setValues({
    //                     title: "", description: "",
    //                 })
    //                 setImageUpload(null);
    //                 window.location.reload(true);
    //             })
    //         })
    //     })

    // }

    const getBlogs = () => {
        const dbRef = ref_database(db);
        get(child(dbRef, `Blog/`)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                let temp = Object.keys(snapshot.val()).map(key => { return [key, snapshot.val()[key]]; })
                // console.log(temp);
                Array.prototype.push.apply(arr, temp);
                console.log(arr);
                setUploaded(true);

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getBlogs();
    }, [])


    return (
        <>
            <Navbar userName={userName} />
            <section className="vh-100 gradient-custom-2">
                <div className="container">
                    <div className="row">

                        <div className="col-md-8 col-md-offset-2">
                            <h1>Create post</h1>
                            <form action="" method="POST">

                                <div className="form-group my-2">
                                    <label htmlFor="title">Title <span className="require">*</span></label>
                                    <input type="text" className="form-control" value={values.title} onChange={(event) => {
                                        setValues((prev) => ({ ...prev, title: event.target.value }))
                                    }} name="title" />
                                </div>

                                <div className="form-group has-error my-2">
                                    <label htmlFor="slug">Attach Image,Videos<span className="require">*</span> </label>
                                    <input type="file" className="form-control" multiple onChange={(event) => { for (let index = 0; index < event.target.files.length; index++) {
                                            const newImage = event.target.files[index];
                                            newImage["id"] = Math.random();
                                            setImageUpload((prevState)=>[...prevState, newImage]) ;
                                        }
                                        }} name="image" />
                                </div>


                                <div className="form-group my-2">
                                    <label htmlFor="description">Description</label>
                                    <textarea rows="5" className="form-control" value={values.description} onChange={(event) => {
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
                    {uploaded ? <div className='d-flex flex-wrap container'>
                        {arr.map((animal, i) => (<>
                            <div className="card my-2 mx-4" key={i} style={{ width: "18rem" }}>
                                <img src={animal[1].imageUrl} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{animal[1].title}</h5>
                                    <p className="card-text">{animal[1].description}</p>
                                </div>
                            </div>
                        </>))}

                    </div> : ""}
                    <div className='row my-4'>

                        <div className="card my-2 mx-4" style={{ width: "18rem" }}>
                            <img src={nature1} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">What a beautiful View....</h5>
                                <p className="card-text">Ea nulla qui ea laboris non occaecat laboris eiusmod cillum ullamco aliqua consectetur. Minim consequat duis ex commodo velit excepteur. Sunt sint sunt veniam labore anim ex ex ut.</p>
                            </div>
                        </div>
                        <div className="card my-2 mx-4" style={{ width: "18rem" }}>
                            <img src={nature2} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Conquer this world...</h5>
                                <p className="card-text">Ea nulla qui ea laboris non occaecat laboris eiusmod cillum ullamco aliqua consectetur. Minim consequat duis ex commodo velit excepteur. Sunt sint sunt veniam labore anim ex ex ut.</p>
                                
                            </div>
                        </div>
                        <div className="card my-2 mx-4" style={{ width: "18rem" }}>
                            <img src={nature3} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Planting a tree is a fun!</h5>
                                <p className="card-text">Ea nulla qui ea laboris non occaecat laboris eiusmod cillum ullamco aliqua consectetur. Minim consequat duis ex commodo velit excepteur. Sunt sint sunt veniam labore anim ex ex ut.</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Socialmedia
