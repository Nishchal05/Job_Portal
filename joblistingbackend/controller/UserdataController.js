const jobschema = require("../Schema/jobschema");
const userschema = require("../Schema/userschema");

const userdatacontroller = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        console.log("Received user ID:", id);

        // Find the user by ID
        const userData = await userschema.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get jobs created by the user
        const jobsData = await jobschema.find({ createdBy: id });

        // Aggregate applicants for all jobs
        const applicants = jobsData.reduce((acc, job) => {
            if (job.applicants && job.applicants.length > 0) {
                acc.push(...job.applicants);
            }
            return acc;
        }, []);

        // Send the response
        res.status(200).json({
            userdata: {
                name: userData.name,
                email: userData.email,
                location: userData.location,
                regType: userData.regType,
                jobs: jobsData,
                applicants,
            }
        });
    } catch (error) {
        console.error("Error in userdatacontroller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = userdatacontroller;
