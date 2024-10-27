import './App.css';
import Navbar from './components/Navbar.js';
import Library from './components/Library';
import Profile from './components/Profile';
import Page from './components/Page';
import DistributeFile from './components/DistributeFile';
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {

  const [loggedIn, setLoggedIn ] = useState('')
  
  const childToParent = (childdata) => {
    setLoggedIn(childdata);
  }
  
  const toggleRoute = () =>{
    setLoggedIn(true)
  }
  
  return (
    <div>
	<BrowserRouter>
	 <Navbar childToParent={childToParent}/>
        <Routes>
			<Route path="/" element={<Library />}/>
			<Route path="/Page/:tokenId" element={<Page />}/>
			<Route path="/profile" element={<Profile />}/> 
			<Route path="/DistributeFile" element={<DistributeFile />}/>
        </Routes>
	</BrowserRouter>
    </div>
   );
};

export default App;
