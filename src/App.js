import './App.css';
import Result from './component/Result.js';
import {Context} from './component/context';
import Home from './component/Home';
import Navbar from './component/Navbar.js';
import Socialmedia from './component/Socialmedia';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Guide from './component/Guide';
import Signup from './component/Signup';
import { auth } from './Firebase';
import Login from './component/Login';
import Signout from './Signout';
import GetGuide from './component/GetGuide';


function App() {
    const [context, setcontext] = useState("default context value");
    

    return (
        <div >
            
                
                <Context.Provider value={[context,setcontext]}>
                <Routes>
                    <Route path='/' element={<Signup/>}/>
                    <Route path='/Home' element={<Home/>}/>
                    <Route path='/result' element={<Result  />} />
                    <Route path='/Guide' element={<Guide  />} />
                    <Route path='/Blog' element={<Socialmedia />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/Signout' element={<Signout />} />
                    <Route path='/GetGuide' element={<GetGuide />} />
                </Routes>
                </Context.Provider>
            
        </div>
    );
}

export default App;
