const jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {

    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (token && token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (!token) {
        console.log("Auth token is not supplied")
        return res.status(401).json({
            success: false,
            message: "Auth token is not supplied"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token is not valid")
            return res.status(401).json({
                success: false,
                message: "Token is not valid"
            });
        } else {
            req.user = decoded
            next();
        }
    });
};


module.exports = checkToken;