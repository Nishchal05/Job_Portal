import React, { useState, useEffect} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './Register.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Backend } from "../../Backend";

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [regType, setRegType] = useState('');
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const type = query.get('type');
  const navigate = useNavigate();
  useEffect(() => {
    if (type) {
      setRegType(type);
      console.log("regType set from query:", type); 
    }
  }, [type]);

  const registerUser = async (e) => {
    e.preventDefault();
    console.log("Final regType:", regType); 

    try {
      const response = await fetch(`${Backend}/api/v1/auth/Register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          location,
          regType,
        }),
      });

      const data = await response.json();
      setData(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("regType", regType);
        localStorage.setItem("Id", data.user._id);
        navigate('/');
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="Register-container">
      {data.success && (
        <Stack sx={{ width: '20%' }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {data.message}
          </Alert>
        </Stack>
      )}
      {data.success === false && (
        <Stack sx={{ width: '20%' }} spacing={2}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {data.message}
          </Alert>
        </Stack>
      )}
      <h1>Create Account</h1>
      <form onSubmit={registerUser}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <div className="NameIcon">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <AccountCircleIcon className="icon" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <div className="NameIcon">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <EmailIcon className="icon" />
          </div>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <div className="NameIcon">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LockIcon className="icon" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Location" className="form-label">
            Location
          </label>
          <div className="NameIcon">
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <LocationOnIcon className="icon" />
          </div>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
        <div className="register-button">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
