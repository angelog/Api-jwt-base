const jwt = require('jsonwebtoken');
var secret = 'jwttokenaplication';

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            var decoded = jwt.verify(token, secret);
            console.log(decoded);
            if (decoded.role == 1) {
                next()
            } else {
                res.status(401).json({message: "Unauthorized"});
            }
        } catch (error) {
            res.status(401).json({message: "invalid token"});
        }
    } else {
        res.status(401).json({message: "Unauthorized"});
    }
};