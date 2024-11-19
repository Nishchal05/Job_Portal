import React, {  useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HomeIcon from "@mui/icons-material/Home";
import { Backend } from "../../Backend";
import {useNavigate} from 'react-router-dom';
import "./Apply.css";
const Apply = () => {
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [address, setAddress] = useState("");
    const [resume, setResume] = useState("");
    const jobid = localStorage.getItem('jobId');
    const userId = localStorage.getItem("Id");

    const jobsubmitdata = async () => {
        try {
            const response = await fetch(`${Backend}/api/v1/job/jobapplication`, {
                method: "POST",
                body: JSON.stringify({
                    jobId: jobid,
                    userId,
                    name,
                    email,
                    phonenumber,
                    address,
                    resume,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Application submitted successfully');
                navigate('/')

            } else {
                console.error('Failed to submit application');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const apply = (e) => {
        e.preventDefault();
        jobsubmitdata();
    };

    return (
        <div className="apply">
            <h1>Apply Form</h1>
            <form onSubmit={apply}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <div className="NameIcon">
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                        <AccountCircleIcon className="icon" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <div className="NameIcon">
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <EmailIcon className="icon" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputphonenumber1" className="form-label">Mobile No.</label>
                    <div className="NameIcon">
                        <input type="tel" className="form-control" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
                        <LockIcon className="icon" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Address</label>
                    <div className="NameIcon">
                        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        <HomeIcon className="icon" />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Location" className="form-label">Attach Resume</label>
                    <div className="NameIcon">
                        <input type="file" className="form-control" value={resume} onChange={(e) => setResume(e.target.value)} required />
                        <AttachFileIcon className="icon" />
                    </div>
                </div>
                <div className="register-button">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Apply;