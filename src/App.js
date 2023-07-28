import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline';
import ProfileDetails from './component/core/ProfileDetails';
import HobbyDetails from './component/core/HobbyDetails';
import PartyDetails from './component/core/PartyDetails';
import FriendDetails from './component/core/FriendDetails';
import CollageDetails from './component/core/CollageDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Hobby from './component/core/Hobby';
import Collage from './component/core/Collage';
import Friends from './component/core/Friends';
import Party from './component/core/Party';
import Footer from './component/common/Footer';
import Profile from './component/core/Profile';
import AddFavourite from './Pages/AddFavourite';
import Upload from './Pages/Upload';



function App() {

  
  const Authentication = ({ children }) => {
    const token = localStorage.getItem('token')
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    )
  }

  const publicRoutes = [
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/register',
      component: <Register />
    }
  ]

  const protectedRoute = [
    {
      component: <Footer />
    },
    {
      path: '/',
      component: <Profile />
    },
    {
      path: '/:id',
      component: <ProfileDetails />
    },
    {
      path: '/hobby',
      component: <Hobby/>
    },
    {
      path: '/hobby/:id',
      component: <HobbyDetails />
    },
    {
      path: '/friends',
      component: <Friends/>
    },
    {
      path: '/friends/:id',
      component: <FriendDetails />
    },
    {
      path: '/collage',
      component: <Collage/>
    },
    {
      path: '/collage/:id',
      component: <CollageDetails />
    },
    {
      path: '/party',
      component: <Party/>
    },
    {
      path: '/party/:id',
      component: <PartyDetails />
    },
    {
      path: '/upload',
      component: <Upload />
    },
    {
      path: '/addfavourite',
      component: <AddFavourite />
    }
  ]

  return (
    <>
      <Router>
        <CssBaseline />
        <Routes>
          {
            publicRoutes.map((e) => {
              return (
                <Route path={e.path} element={e.component} />
              )
            })
          }
          {
            protectedRoute.map((e) => {
              return (
                <Route exact path={e.path} element={<Authentication>{e.component}</Authentication>}/>
              )
            })
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
