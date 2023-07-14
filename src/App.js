import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from "./Pages/Main";
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from './component/common/Footer';
import Navbar from './component/common/Navbar';
import ProfileDetails from './component/core/ProfileDetails';
import Hobby1Details from './component/core/Hobby1Details';
import Hobby2Details from './component/core/Hobby2Details';
import PartyDetails from './component/core/PartyDetails';
import FriendDetails from './component/core/FriendDetails';
import CollageDetails from './component/core/CollageDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {

  const [darkMode, setDarkMode] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    },
  });

  return (
    <>
      <Router>
        <Navbar />
        <CssBaseline />
        <ThemeProvider theme={darkTheme}>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Main />} />
            <Route path='/:id' element={ <ProfileDetails/>} />
            <Route path='/hobby1/:id' element={<Hobby1Details/>}/>
            <Route path='/hobby2/:id' element={<Hobby2Details/>}/>
            <Route path='/friends/:id' element={<FriendDetails/>}/>
            <Route path='/collage/:id' element={<CollageDetails/>}/> 
            <Route path='/party/:id' element={<PartyDetails/>}/>
          </Routes>
          <Footer />
        </ThemeProvider>
      </Router>
      <div className="mt-5">
      </div>

    </>
  );
}

export default App;
