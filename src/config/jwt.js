const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.jwtSecretKey || 'my_secret_is_mine_only'

const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecretKey, { expiresin: '7d'});
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecretKey)
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
    jwtSecretKey
}