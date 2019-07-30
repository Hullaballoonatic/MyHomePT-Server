import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'
import uuid from 'uuidv4'
import jwtSettings from '../config/jwt'
import RevokedToken from '../models/revokedToken'

export default {
    routeParam: () => {
        return expressJwt({secret: jwtSettings.secret, isRevoked: isRevokedCallback}).unless({path: ['/api/auth/']})
    },

    getToken: (user) => {
        return jwt.sign({sub: user._id, jti: uuid()}, jwtSettings.secret, {expiresIn: jwtSettings.expiresIn})
    },
}

function isRevokedCallback(req, payload, done) {
    RevokedToken.findOne({jti: payload.jti}, (err, token) => {
        err ? done(err) : done(null, !!token)
    })
}
