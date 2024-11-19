import React, { useEffect, useState } from 'react';
import { Backend } from '../../Backend';
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null); 
  const userId = localStorage.getItem("Id");

  const deletejob = async (jobid) => {
    try {
        const response = await fetch(`${Backend}/api/v1/job/DeleteJob/${jobid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log("Deleted:", result);
        userinfo();
    } catch (error) {
        console.error("Failed to delete job", error);
    }
};


  const userinfo = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(`${Backend}/api/v1/auth/User`, {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      setData(result.userdata);  
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    userinfo();
  }, []);

  if (!data) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='DashboardBody'>
      <div>
        <h3>Author Name: {data.name}</h3>
        <h3>Author Email: {data.email}</h3>
        <h3>Author Location: {data.location}</h3>
      </div>
      {data.regType === "jobprovider" ? (
        <div className='Createjobsection'>
          <h2>Jobs Created</h2>
          {data.jobs.length > 0 ? (
            data.jobs.map((job, index) => (
              <div key={index} className='DashboardJobs'>
                <h5>Company: {job.company}</h5>
                <h5>Position: {job.position}</h5>
                <h5>Created At: {new Date(job.createdAt).toLocaleDateString()}</h5>
                <h5>Applications: {job.applicants.length}</h5>
                <h5>
                  <button 
                    className='delete' 
                    onClick={() => deletejob(job._id)}
                  >
                    Delete
                  </button>
                </h5> 
              </div>
            ))
          ) : (
            <h3>No Jobs Created</h3>
          )}
        </div>
      ) : (
        <div>
          <h2>Welcome, {data.name}</h2>
          <p>Explore job opportunities and apply to positions that match your skills.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
