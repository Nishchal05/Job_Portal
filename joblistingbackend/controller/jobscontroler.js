const mongoose = require("mongoose");
const jobSchema = require("../Schema/jobschema"); 
const moment = require("moment");
const jobschema = require("../Schema/jobschema");

const jobController = async (req, res, next) => {
    try {
        const { company, position } = req.body;
        if (!company || !position) {
            return next('Please provide all fields');
        }
        req.body.createdBy = req.user.userId;
        const job = await jobSchema.create(req.body);
        res.status(201).json({ 
            success: true,
            message: 'Successfully Created',
            job
        });
    } catch (error) {
        console.error(`Error in jobController ${error}`);
        next(error); 
    }
};

const SearchJob = async (req, res, next) => {
    try {
        const { search } = req.query;
        const queryObject = {};

        if (search) {
            
            queryObject.$or = [
                { position: { $regex: search, $options: "i" } },
                { workType: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } }
            ];
        }

        const jobs = await jobSchema.find(queryObject);
        res.status(200).json({
            totalJobs: jobs.length,
            jobs,
        });
    } catch (error) {
        console.log(`Error in SearchJob ${error}`);
        next(error);
    }
};
const jobapplication = async (req, res, next) => {
    try {
        const { jobId, userId, name, email, phonenumber, address, resume } = req.body;

        const job = await jobschema.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const applicant = {
            userId,
            name,
            email,
            phonenumber,
            address,
            resume,
        };

        job.applicants.push(applicant);

        await job.save();

        res.status(200).json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error(`Error in jobapplication ${error}`);
        next(error);
    }
};

const updateJob = async (req, res, next) => {
    try {
        const jobId = req.params.id; 
        const { company, position } = req.body;
        if (!company && !position) {
            return next('Please provide all the fields');
        }
        const job = await jobSchema.findById(jobId);
        if (!job) {
            return next('No job found');
        }
        if (req.user.userId !== job.createdBy.toString()) {
            return next('You are not authorized to update this');
        }
        const updatedJob = await jobSchema.findByIdAndUpdate(jobId, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ updatedJob });
    } catch (error) {
        console.log(`Error in updateJob ${error}`);
        next(error); 
    }
};

const Jobdelete = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const job = await jobschema.findById(id);  
        if (!job) {
            return next('No job found');
        }
        await job.deleteOne();
        res.status(200).json({
            message: 'Success, Deleted',
        });
    } catch (error) {
        console.error(`Error in Jobdelete ${error}`);
        next(error);
    }
};

const jobfilter = async (req, res) => {
    try {
        const stats = await jobSchema.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        const defaultStats = {
            reject: stats.find(stat => stat._id === 'reject')?.count || 0,
            pending: stats.find(stat => stat._id === 'pending')?.count || 0,
            interview: stats.find(stat => stat._id === 'interview')?.count || 0,
        };

        let monthStats = await jobSchema.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        monthStats = monthStats.map(item => {
            const { _id: { year, month }, count } = item;
            const date = moment().month(month - 1).year(year).format('MMM y');
            return { date, count };
        }).reverse();

        res.status(200).json({ totalJob: stats.length, stats: defaultStats, monthStats });
    } catch (error) {
        console.error(`Error in jobfilter ${error}`);
        next(error);
    }
};

module.exports = {
    jobController,
    updateJob,
    Jobdelete,
    jobfilter,
    SearchJob,
    jobapplication
};
