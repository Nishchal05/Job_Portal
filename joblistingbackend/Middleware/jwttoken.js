const JWT = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new Error('Auth Failed'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = JWT.verify(token, process.env.JWTCODE);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        next(new Error('Auth Failed')); 
    }
};

module.exports = auth;
