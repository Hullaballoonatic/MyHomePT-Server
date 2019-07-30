import User from '../models/user'
import jwt from 'jsonwebtoken'

export default {
    signin(req, res, next) {
        const {email, password} = req.body
        User.findOne({email})
            .then(user => {
                if (user) {
                    user.authenticate(password)
                        .then(signature => {
                            const {exp, iat} = jwt.decode(signature)
                            const {password, ...userWithoutPass} = user.toObject()
                            res.json({...userWithoutPass, signature, exp, iat})
                        })
                        .catch(() => res.status(401))
                } else {
                    res.status(401)
                }
            })
            .catch(next)
    },

    signup(req, res, next) {
        User.findOne({email: req.body.email}).then(userExists => {
            if (userExists) {
                res.status(400).json({message: 'email already exists.'})
            } else {
                User.create(req.body)
                    .then(result => {
                        result.authenticate(req.body.password)
                            .then(signature => {
                                const {exp, iat} = jwt.decode(signature)
                                const {password, ...userNoPass} = result.toObject()
                                res.status(200).json({...userNoPass, signature, exp, iat})
                            })
                            .catch(next)
                    }).catch(next)
            }
        })
    },

    signout(req, res, next) {
        User.findById(req.user.sub)
            .then(user => {
                if (user && req.headers.authorization) {
                    const token = (jwt.decode(req.headers.authorization.split(' ')[1]))
                    user.signOut(token)
                        .then(() => res.status(200).json({message: 'successful sign out.'}))
                        .catch(next)
                } else {
                    res.status(404).json({message: 'User not found. Can\'t be logged out.'})
                }
            }).catch(next)
    },
}
