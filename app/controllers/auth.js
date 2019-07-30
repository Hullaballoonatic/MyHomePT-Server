"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    signin(req, res, next) {
        const { email, password } = req.body;
        user_1.default.findOne({ email })
            .then(user => {
            if (user) {
                user.authenticate(password)
                    .then(signature => {
                    const { exp, iat } = jsonwebtoken_1.default.decode(signature);
                    const _a = user.toObject(), { password } = _a, userWithoutPass = __rest(_a, ["password"]);
                    res.json(Object.assign({}, userWithoutPass, { signature, exp, iat }));
                })
                    .catch(() => res.status(401));
            }
            else {
                res.status(401);
            }
        })
            .catch(next);
    },
    signup(req, res, next) {
        user_1.default.findOne({ email: req.body.email }).then(userExists => {
            if (userExists) {
                res.status(400).json({ message: 'email already exists.' });
            }
            else {
                user_1.default.create(req.body)
                    .then(result => {
                    result.authenticate(req.body.password)
                        .then(signature => {
                        const { exp, iat } = jsonwebtoken_1.default.decode(signature);
                        const _a = result.toObject(), { password } = _a, userNoPass = __rest(_a, ["password"]);
                        res.status(200).json(Object.assign({}, userNoPass, { signature, exp, iat }));
                    })
                        .catch(next);
                }).catch(next);
            }
        });
    },
    signout(req, res, next) {
        user_1.default.findById(req.user.sub)
            .then(user => {
            if (user && req.headers.authorization) {
                const token = (jsonwebtoken_1.default.decode(req.headers.authorization.split(' ')[1]));
                user.signOut(token)
                    .then(() => res.status(200).json({ message: 'successful sign out.' }))
                    .catch(next);
            }
            else {
                res.status(404).json({ message: 'User not found. Can\'t be logged out.' });
            }
        }).catch(next);
    },
};
//# sourceMappingURL=auth.js.map