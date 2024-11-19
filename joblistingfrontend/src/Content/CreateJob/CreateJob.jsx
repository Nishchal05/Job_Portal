import React, { useState } from 'react';
import { Backend } from '../../Backend';
import './CreateJob.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
const CreateJob = () => {
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [JobDiscription, setJobDescription] = useState('');
    const [workType, setWorkType] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const applicant=0;
    const recuitmentData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${Backend}/api/v1/job/create-job`, {
                method: 'POST',
                body: JSON.stringify({
                    company,
                    position,
                    JobDiscription,
                    workLocation,
                    workType,
                    applicant
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setData(data);

            if (data && data.success) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error creating job:', error);
            setData({ success: false, message: 'Failed to create job' });
        }
    };

    return (
        <div className='recuitment-container'>
            <div className='recuitment-form'>
                {data && data.success && (
                    <Stack sx={{ width: '70%' }} spacing={2}>
                        <Alert severity='success'>
                            <AlertTitle>Success</AlertTitle>
                            {data.message}
                        </Alert>
                    </Stack>
                )}
                {data && data.success === false && (
                    <Stack sx={{ width: '70%' }} spacing={2}>
                        <Alert severity='info'>
                            <AlertTitle>Info</AlertTitle>
                            {data.message}
                        </Alert>
                    </Stack>
                )}
                <h2>Job Recruitment Form</h2>
                <div>
                    <label>Company Name:</label>
                    <input
                        type='text'
                        placeholder='Company Name'
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <div>
                    <label>Job Title:</label>
                    <input
                        type='text'
                        placeholder='Job Title'
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
                <div>
                    <label>Job Description:</label>
                    <textarea
                        type='text'
                        placeholder='Job Description'
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Work Type:</label>
                    <input
                        type='text'
                        placeholder='Work Type'
                        onChange={(e) => setWorkType(e.target.value)}
                    />
                </div>
                <div>
                    <label>Work Location:</label>
                    <input
                        type='text'
                        placeholder='Work Location'
                        onChange={(e) => setWorkLocation(e.target.value)}
                    />
                </div>
                <button onClick={recuitmentData}>Create Job</button>
            </div>
        </div>
    );
};

export default CreateJob;
