const mongoose =require('mongoose');
const jobschema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company name is required"],
    },
    position: {
        type: String,
        required: [true, "Job Position is required"],
        minlength: 3,
    },
    JobDescription: {
        type: String,
        minlength: 10,
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending',
    },
    workType: {
        type: String,
        enum: ["Full Time", 'Part Time', 'Internship', 'Contract'],
        default: 'full-time',
    },
    workLocation: {
        type: String,
        default: 'Mumbai',
        required: [true, "work location is required"],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applicants: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: String,
        email: String,
        phonenumber: String,
        address: String,
        resume: String,
    }],
}, { timestamps: true });

module.exports = mongoose.model('job', jobschema);
