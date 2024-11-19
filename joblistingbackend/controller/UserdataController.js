const jobschema = require("../Schema/jobschema");
const userschema = require("../Schema/userschema");

const userdatacontroller = async (req, res, next) => {
    try {
        const { userId } = req.body;

      
        const userData = await userschema.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

      
        const jobsData = await jobschema.find({ createdBy: userId });

      
        const applicants = jobsData.reduce((acc, job) => {
            if (job.applicants && job.applicants.length > 0) {
                acc.push(...job.applicants);
            }
            return acc;
        }, []);

      
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
