import React, {useEffect} from 'react'

import { useLocation } from 'react-router-dom';

const Navbar = (props) => {
    let location = useLocation();
    useEffect(()=>{
    }, [location])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-custome navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand " href="/Home">TravelMate</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex justify-content-center " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link disabled`} aria-current="page" href="/">MeetUp<span className="badge bg-secondary">New</span></a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname === "/Blog"?"active": ""}`} aria-current="page" href="/Blog">Travel Blog</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname === "/Guide"?"active": ""}`} href="/Guide">Become a Guide</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/Signout">{props.userName}</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
