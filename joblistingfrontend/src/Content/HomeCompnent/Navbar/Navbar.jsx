import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Backend } from '../../../Backend';
import "./Navbar.css";

const Navbar = () => {
  const [inputdata, setinputdata] = useState(""); 
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const regType = localStorage.getItem('regType'); 
  const getjobdata = async () => {
    try {
      const response = await fetch(`${Backend}/api/v1/job/search-jobs?search=${inputdata}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API response:", responseData);

    } catch (error) {
      console.error("Failed to fetch job data", error);
    }
  };

  useEffect(() => {
    if (inputdata !== "") {
      getjobdata();
    }
  }, [inputdata]);

  const userinfo = async () => {
    try {
      const response = await fetch(`${Backend}/api/v1/auth/User`);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userinfo();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); 
    setinputdata(inputdata);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><h1 className='listitems'><span>Talent</span>Hunt</h1></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/"><div className='listitems'>Home</div></a>
            </li>
            {token && (
              <li className="nav-item">
                <a className="nav-link" href="/Dashboard"><div className='listitems'>Dashboard</div></a>
              </li>
            )}
            <li className="dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className='listitems'>Job</div>
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/">Full time</a></li>
                <li><a className="dropdown-item" href="/">Internship</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">Contract</a></li>
              </ul>
            </li>
            {!token ? (
              <ul style={{display:'flex',gap:'10px'}}>
                <li className="dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className='listitems'>Register</div>
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/register?type=jobseeker">JobSeeker</Link></li>
                    <li><Link className="dropdown-item" to="/register?type=jobprovider">JobProvider</Link></li>
                  </ul>
                </li>
                <li>
                  <a href="/login">
                    <div className='listitems'>Login</div>
                  </a>
                </li>
              
              </ul>
            ) : (
              <ul><li className='logout'>
                <a onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }} href='/' >
                  <div className='listitems'>Logout</div>
                </a>
              </li>
              <li>
                  <a href="https://subtle-sprinkles-8da7ba.netlify.app">
                    <div className='listitems'>Resume</div>
                  </a>
                </li></ul>
            )}
            {regType === 'jobprovider' && (
              <li>
                <Link to={'/CreateJob'} className='listitems'>Create Job</Link>
              </li>
            )}
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={inputdata} onChange={(e) => setinputdata(e.target.value)} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
