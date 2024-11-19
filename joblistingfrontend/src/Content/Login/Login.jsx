import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import "./Login.css";
import { Backend } from "../../Backend";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null); // Initialize data as null
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    console.log(email, password);
    
    try {
      const response = await fetch(`${Backend}/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setData(data);
      console.log("login", data);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("regType", data.user.regType);
        localStorage.setItem("Id", data.user._id);
        navigate('/');
      }

    } catch (error) {
      console.error("Error during login:", error);
      setData({ success: false, message: "An error occurred during login." });
    }
  };

  return (
    <div className="Login-container">
      {data && (
        <Stack sx={{ width: '20%' }} spacing={2}>
          <Alert severity={data.success ? "success" : "info"}>
            <AlertTitle>{data.success ? "Success" : "Info"}</AlertTitle>
            {data.message}
          </Alert>
        </Stack>
      )}
      <h1>Login Account</h1>
      <form onSubmit={LoginUser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <div className="NameIcon">
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            <EmailIcon className="icon" />
          </div>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <div className="NameIcon">
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            <LockIcon className="icon" />
          </div>
          <p>Create Account <Link to='/Register'>Create?</Link></p>
        </div>
        <div className="Login-button">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
