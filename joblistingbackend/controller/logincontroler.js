const userschema = require("../Schema/userschema");

const logincontroler = async (req, res) => {
    try {
        const { email, password } = req.body;

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

        const user = await userschema.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid Username or Password',
                success: false
            });
        }

        const ismatch = await user.comparePassword(password);
        if (!ismatch) {
            return res.status(400).json({
                message: "Password is incorrect",
                success: false
            });
        }

        const token = user.createJWT();
        res.status(200).json({
            success: true,
            message: 'Login Successfully',
            user: {
                name: user.name,
                email: user.email,
                location: user.location,
                regType: user.regType,
                _id: user._id,
            },
            token,
        });
    } catch (error) {
        console.error(`Error in login: ${error}`);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

module.exports = logincontroler;
