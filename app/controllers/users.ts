import User from '../models/user'
import Task from '../models/task'
import Exercise from '../models/exercise'

export default {
    getAll(req, res, next) {
        User.find({}).then(result => res.status(200).json(result)).catch(next)
    },

    getById(req, res, next) {
        User.findOne({_id: req.params.id})
            .then(result => res.status(200).json(result)).catch(next)
    },

    getByDate(req, res, next) {
        User.find({createdOn: {$gte: req.query.start, $lte: req.query.end}}, req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    create(req, res, next) {
        User.create(req.body)
            .then(result => {
                res.status(200).json(result)
                return result
            })
            .catch(next)
    },

    updateById(req, res, next) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true})
            .then(result => res.status(200).json(result)).catch(next)
    },

    updateCurrent(req, res, next) {
        User.findByIdAndUpdate(req.user.sub, req.body, {runValidators: true})
            .then(result => res.status(200).json(result)).catch(next)
    },

    deleteCurrent(req, res, next) {
        User.findByIdAndRemove(req.user.sub)
            .then(result => res.status(200).json(result)).catch(next)
    },

    deleteById(req, res, next) {
        User.findOneAndRemove({_id: req.params.id})
            .then(result => res.status(200).json(result)).catch(next)
    },

    replaceById(req, res, next) {
        User.findOneAndReplace({_id: req.params.id}, req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    getCurrent(req, res, next) {
        User.findById(req.user.sub)
            .then(result => res.status(200).json(result)).catch(next)
    },

    assignTherapist(req, res, next) {
        const patientId = req.params.id
        const therapistId = req.query.therapistId
        User.updateOne({_id: patientId}, {$addToSet: {therapistIds: therapistId}})
            .then(patient => {
                User.updateOne({_id: therapistId}, {$addToSet: {patientIds: patientId}})
                    .then(therapist => res.status(200).json({therapist, patient}))
                    .catch(next)
            }).catch(next)
    },

    unassignTherapist(req, res, next) {
        const patientId = req.params.id
        const therapistId = req.query.therapistId
        User.updateOne({_id: patientId}, {$pull: {therapistIds: therapistId}})
            .then(patient => {
                User.updateOne({_id: therapistId}, {$pull: {patientIds: patientId}})
                    .then(therapist => res.status(200).json({therapist, patient}))
                    .catch(next)
            }).catch(next)
    },

    getTherapistsOfUserById(req, res, next) {
        User.findOne({_id: req.params.id})
            .then(user => {
                User.find({_id: {$in: user.therapistIds}})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            }).catch(next)
    },

    getPatientsOfUserById(req, res, next) {
        User.findOne({_id: req.params.id})
            .then(user => {
                User.find({_id: {$in: user.patientIds}})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            }).catch(next)
    },

    getTasksOfUserById(req, res, next) {
        User.findOne({_id: req.params.id})
            .then(user => {
                Task.find({_id: {$in: user.taskIds}})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            }).catch(next)
    },

    getCreatedExercisesOfUserById(req, res, next) {
        User.findById({_id: req.params.id})
            .then(user => {
                Exercise.find({_id: {$in: user.createdExerciseIds}})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            }).catch(next)
    },

    getTherapistsOfCurrentUser(req, res, next) {
        User.findById(req.user.sub)
            .then(user => {
                User.find({_id: {$in: user.therapistIds}})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            }).catch(next)
    },

    getPatientsOfCurrentUser(req, res, next) {
        User.findById(req.user.sub)
            .then(user => {
                User.find({_id: {$in: user.patientIds}})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            }).catch(next)
    },

    getTasksOfCurrentUser(req, res, next) {
        User.findById(req.user.sub)
            .then(user => {
                Task.find({_id: {$in: user.taskIds}})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            }).catch(next)
    },

    getCreatedExercisesOfCurrentUser(req, res, next) {
        User.findById(req.user.sub)
            .then(user => {
                Exercise.find({_id: {$in: user.createdExerciseIds}})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            }).catch(next)
    },

    searchBy(req, res, next) {
        User.where(req.query.field, {$match: req.query.regex})
            .then(result => res.status(200).json(result)).catch(next)
    },
}
