import './App.css';
import  Users from './components/layout/users'
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import deviceDetails from './components/layout/deviceDetails.jsx';
import shops from './components/layout/shops.jsx';



const App = () => {
  return (
    <div className="App">
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Users/>} />
        <Route path="/:role/:id" element={<Users/>} />

           {/* <Route path="/shops/:id" element={<UserInfo />} /> */}
          {/* <Route path="/deviceDetails/:deviceDetails" element={<deviceDetails />} /> */}
        </Routes>
      </div>
    </Router>
  </div>
  )
}



export default App;
