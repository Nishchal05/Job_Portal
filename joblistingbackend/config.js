const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOURL);
        console.log(`Connected to MongoDB: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error in catch: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;
