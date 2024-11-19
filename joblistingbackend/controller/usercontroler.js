const userschema = require("../Schema/userschema");

const updateuser = async (req, res, next) => {
    const { name, email, location } = req.body;
    
    if (!name || !email || !location) {
        return next(new Error('Please provide all fields')); 
    }
    
    try {
        const user = await userschema.findOne({ _id: req.user.userId });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.location = location;
        
        await user.save();

        const token = user.createJWT();

        res.status(200).json({
            user,
            token,
        });
    } catch (error) {
        next(error); 
    }
};

module.exports = updateuser;
