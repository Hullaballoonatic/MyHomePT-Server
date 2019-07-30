import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from '../helpers/jwt.service'
import Task from './task'

import RevokedToken from './revokedToken'
import media from './plugins/media'
import timestamp from './plugins/timestamp'

const saltRounds = 10

const schema = mongoose.Schema({
    signedInOn: Date,
    signedOutOn: Date,
    name: Object,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validateBeforeSave: true,
        validate: {
            validator: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: 'You must enter a valid email address.',
        },
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: [6, 'Password needs to be at least 6 letters long.'],
    },
    therapistIds: [
        {type: String},
    ],
    patientIds: [
        {type: String},
    ],
    taskIds: [
        {type: String},
    ],
    createdExerciseIds: [
        {type: String},
    ],
    bodyParts: [Object],
    privilege: {
        type: Number,
        default: 0,
    },
    address: Object,
    sex: Object,
    phoneNumber: Object,
    birthday: Date,
})

schema.plugin(timestamp)
schema.plugin(media)

schema.methods = {
    authenticate(plainText) {
        const user = this
        return new Promise((resolve, reject) => {
            if (bcrypt.compareSync(plainText, user.password)) {
                user.signedInOn = Date.now()
                user.save().then(() => resolve(jwt.getToken(user))).catch(reject)
            } else {
                reject('Password invalid.')
            }
        })
    },

    signOut(token) {
        const user = this
        return new Promise((resolve, reject) => {
            RevokedToken.create(token).then(() => {
                user.signedOutOn = Date.now()
                user.save().then(resolve).catch(reject)
            }).catch(reject)
        })
    },
}

schema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = bcrypt.hashSync(this.password, saltRounds)
    }
    if (!this.name.display) {
        this.name.display = `${this.name.given} ${this.name.family}`
    }
    next()
})

schema.pre('remove', function (next) {
    const user = this
    model.update({_id: {$in: user.therapistIds}}, {$pull: {patientIds: user._id}}, err => {
        if (err) next(err)
        model.update({_id: {$in: user.patientIds}}, {$pull: {therapistIds: user._id}}, err => {
            if (err) next(err)
            return Task.findAndDelete({_id: {$in: user.taskIds}})
        })
    })
    next()
})

schema.set('toJSON', {virtuals: true})

const model = mongoose.model('User', schema)

export default model
