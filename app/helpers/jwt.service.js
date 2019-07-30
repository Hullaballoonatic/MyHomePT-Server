"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuidv4_1 = __importDefault(require("uuidv4"));
const jwt_1 = __importDefault(require("../config/jwt"));
const revokedToken_1 = __importDefault(require("../models/revokedToken"));
exports.default = {
    routeParam: () => {
        return express_jwt_1.default({ secret: jwt_1.default.secret, isRevoked: isRevokedCallback }).unless({ path: ['/api/auth/'] });
    },
    getToken: (user) => {
        return jsonwebtoken_1.default.sign({ sub: user._id, jti: uuidv4_1.default() }, jwt_1.default.secret, { expiresIn: jwt_1.default.expiresIn });
    },
};
function isRevokedCallback(req, payload, done) {
    revokedToken_1.default.findOne({ jti: payload.jti }, (err, token) => {
        err ? done(err) : done(null, !!token);
    });
}
//# sourceMappingURL=jwt.service.js.map