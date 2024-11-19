import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Body.css";
import { Backend } from "../../../Backend";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Body = () => {
  const [findjob, setFindJob] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 4;
  const navigate = useNavigate();

  const getJobData = async () => {
    try {
      const response = await fetch(`${Backend}/api/v1/job/search-jobs?search=${findjob}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API response:", responseData);

      setData(responseData.jobs || []);
    } catch (error) {
      console.error("Failed to fetch job data", error);
    }
  };

  useEffect(() => {
    getJobData();
  }, [findjob]);

  const applyForJob = (jobId) => {
    const token = localStorage.getItem("token");
    localStorage.setItem("jobId", jobId);
    if (token) {
      navigate('/Apply');
    } else {
      alert('To apply, please create an account');
    }
  };

  const totalPages = Math.ceil(data.length / jobsPerPage);
  const visibleJobs = data.slice(currentPage * jobsPerPage, (currentPage + 1) * jobsPerPage);

  return (
    <div className="bodyController">
      <main>
        <section className="jobBody">
          <div className="Slogan">
            <h1>
              <span>F</span>ind <span>Y</span>our <span>D</span>ream <span>J</span>ob <span>N</span>ow
            </h1>
          </div>
          <div className="jobInput">
            <input
              type="text"
              placeholder="Find your job"
              value={findjob}
              onChange={(e) => setFindJob(e.target.value)}
            />
            <button onClick={getJobData}>
              <SearchIcon />
            </button>
          </div>
        </section>
        <section className="jobdata">
          <div className="jobdiscription">
            {currentPage > 0 && (
              <ArrowBackIcon
                onClick={() => setCurrentPage(currentPage - 1)}
                className="arrow"
              />
            )}
            {visibleJobs.length > 0 ? (
              visibleJobs.map((val, index) => (
                <div key={index} className="Jobdetail">
                  <div><img src={val.Logo} height={100} alt="Company Logo"/><h3>{val.company}</h3></div>
                  <div className="post-location"><h6>{val.position}</h6>
                  <h6><LocationOnIcon/>{val.workLocation}</h6></div>
                  <h6>Status: {val.status}</h6>
                  <h6>Mode: {val.workType}</h6>
                  <button onClick={() => applyForJob(val._id)}><h5>Apply</h5></button>
                </div>
              ))
            ) : (
              <p>No jobs found</p>
            )}
            {currentPage < totalPages - 1 && (
              <ArrowForwardIcon
                onClick={() => setCurrentPage(currentPage + 1)}
                className="arrow"
              />
            )}
          </div>
        </section>
      </main>
      <footer>
        <div className="FooterIntro">
          <h2><span>Talent</span>Hunt</h2>
          <h5>Connect With Us:</h5>
          <div className="SocialmediaHandle">
            <FacebookIcon />
            <InstagramIcon />
            <LinkedInIcon />
            <XIcon />
          </div>
        </div>
        <div>
          <h4>About us</h4>
          <h4>Careers</h4>
          <h4>Employer home</h4>
          <h4>Sitemap</h4>
          <h4>Credits</h4>
        </div>
        <div>
          <h4>Help center</h4>
          <h4>Summons</h4>
          <h4>Grievances</h4>
          <h4>Report issue</h4>
        </div>
        <div>
          <h4>Privacy policy</h4>
          <h4>Term & conditions</h4>
          <h4>Fraud alert</h4>
          <h4>Trust & safety</h4>
        </div>
      </footer>
    </div>
  );
};

export default Body;
