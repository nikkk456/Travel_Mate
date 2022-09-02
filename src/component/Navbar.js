import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-custome ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">TravelMate</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex justify-content-center " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link disabled " aria-current="page" href="/">MeetUp<span className="badge bg-secondary">New</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/">Travel Blog</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Become a Guide</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">About Us</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
