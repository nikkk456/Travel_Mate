import './App.css';
import Result from './component/Result.js';
import {Context} from './component/context';
import Home from './component/Home';
import Navbar from './component/Navbar.js';
import bg from "./component/Image/bg.jpg"
import Typewriter from "typewriter-effect";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
} from "react-router-dom";


function App() {
    const [context, setcontext] = useState("default context value");
    

    return (
        <div >
            
                <Navbar />
                <Context.Provider value={[context,setcontext]}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/result' element={<Result  />} />
                </Routes>
                </Context.Provider>
            
        </div>
    );
}

export default App;
