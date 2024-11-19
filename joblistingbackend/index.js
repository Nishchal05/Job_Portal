const express = require('express');
const connectDB = require('./config');
const mongosenitize=require('express-mongo-sanitize');
const cors = require('cors');
const route = require('./Router/testroute');
const auth = require('./Router/auth');
const userauth = require('./Router/userauth');
const jobsrouter = require('./Router/jobsroute');
const errormiddleware = require('./Middleware/errorhandling');
require('dotenv').config();

const Port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(mongosenitize());
app.use(cors());
app.use(express.json());
app.use('/api/v1/test', route);
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', userauth);
app.use('/api/v1/job',jobsrouter);
app.use(errormiddleware);

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}!!!`);
});
