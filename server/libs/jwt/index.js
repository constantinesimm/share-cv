const jwt = require('jsonwebtoken');
const { secretString } = require('../../config');

class JWT {
    static signToken(type, data) {
        return jwt.sign(data, secretString, {
            expiresIn: type === 'service' ? '24h' : '6h'
        })
    }

    static verifyToken(token) {
        return jwt.verify(token, secretString, {}, (err, decoded) => err ? err : decoded)
    }
}

module.exports = JWT;
