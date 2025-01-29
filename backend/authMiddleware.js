// middleware/authenticate.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token == null) return res.sendStatus(401); // If no token, return Unauthorized

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, return Forbidden
        
        req.user = user; // Attach user information to request object
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;