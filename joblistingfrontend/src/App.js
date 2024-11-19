import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Content/Register/Register';
import Login from './Content/Login/Login';
import Home from './Content/HomeCompnent/Home.jsx/Home';
import Navbar from './Content/HomeCompnent/Navbar/Navbar';
import CreateJob from './Content/CreateJob/CreateJob';
import Dashboard from './Content/Dashboard/Dashboard';
import Apply from './Content/Apply/Apply';

const App = () => {
  return (
    <div>
      <Navbar />
     
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/CreateJob' element={<CreateJob />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Apply' element={<Apply/>} />
        </Routes>
    </div>
  );
};

export default App;
