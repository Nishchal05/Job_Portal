const User = require('../Schema/userschema');

const RegisterController = async (req, res) => {
    try {
        const { name, email, password, location,regType } = req.body;

        if (!name) {
            return res.status(400).json({
                message: 'Please provide name',
                success: false
            });
        }
        if (!email) {
            return res.status(400).json({
                message: 'Please provide email',
                success: false
            });
        }
        if (!password) {
            return res.status(400).json({
                message: 'Please provide password',
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Already have an account',
                success: false
            });
        }

        const user = await User.create({ name, email, password,location,regType});
        const token = user.createJWT(); 
        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: {
                name: user.name,
                email: user.email,
                location: user.location,
                _id: user._id,
            },
            token,
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send({
            message: `${error}`,
            success: false
        });
    }
};

module.exports =  RegisterController ;
