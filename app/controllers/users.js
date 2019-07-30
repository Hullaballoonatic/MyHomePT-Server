"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const task_1 = __importDefault(require("../models/task"));
const exercise_1 = __importDefault(require("../models/exercise"));
exports.default = {
    getAll(req, res, next) {
        user_1.default.find({}).then(result => res.status(200).json(result)).catch(next);
    },
    getById(req, res, next) {
        user_1.default.findOne({ _id: req.params.id })
            .then(result => res.status(200).json(result)).catch(next);
    },
    getByDate(req, res, next) {
        user_1.default.find({ createdOn: { $gte: req.query.start, $lte: req.query.end } }, req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    create(req, res, next) {
        user_1.default.create(req.body)
            .then(result => {
            res.status(200).json(result);
            return result;
        })
            .catch(next);
    },
    updateById(req, res, next) {
        user_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true })
            .then(result => res.status(200).json(result)).catch(next);
    },
    updateCurrent(req, res, next) {
        user_1.default.findByIdAndUpdate(req.user.sub, req.body, { runValidators: true })
            .then(result => res.status(200).json(result)).catch(next);
    },
    deleteCurrent(req, res, next) {
        user_1.default.findByIdAndRemove(req.user.sub)
            .then(result => res.status(200).json(result)).catch(next);
    },
    deleteById(req, res, next) {
        user_1.default.findOneAndRemove({ _id: req.params.id })
            .then(result => res.status(200).json(result)).catch(next);
    },
    replaceById(req, res, next) {
        user_1.default.findOneAndReplace({ _id: req.params.id }, req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    getCurrent(req, res, next) {
        user_1.default.findById(req.user.sub)
            .then(result => res.status(200).json(result)).catch(next);
    },
    assignTherapist(req, res, next) {
        const patientId = req.params.id;
        const therapistId = req.query.therapistId;
        user_1.default.updateOne({ _id: patientId }, { $addToSet: { therapistIds: therapistId } })
            .then(patient => {
            user_1.default.updateOne({ _id: therapistId }, { $addToSet: { patientIds: patientId } })
                .then(therapist => res.status(200).json({ therapist, patient }))
                .catch(next);
        }).catch(next);
    },
    unassignTherapist(req, res, next) {
        const patientId = req.params.id;
        const therapistId = req.query.therapistId;
        user_1.default.updateOne({ _id: patientId }, { $pull: { therapistIds: therapistId } })
            .then(patient => {
            user_1.default.updateOne({ _id: therapistId }, { $pull: { patientIds: patientId } })
                .then(therapist => res.status(200).json({ therapist, patient }))
                .catch(next);
        }).catch(next);
    },
    getTherapistsOfUserById(req, res, next) {
        user_1.default.findOne({ _id: req.params.id })
            .then(user => {
            user_1.default.find({ _id: { $in: user.therapistIds } })
                .then(result => res.status(200).json(result))
                .catch(next);
        }).catch(next);
    },
    getPatientsOfUserById(req, res, next) {
        user_1.default.findOne({ _id: req.params.id })
            .then(user => {
            user_1.default.find({ _id: { $in: user.patientIds } })
                .then(result => res.status(200).json(result))
                .catch(next);
        }).catch(next);
    },
    getTasksOfUserById(req, res, next) {
        user_1.default.findOne({ _id: req.params.id })
            .then(user => {
            task_1.default.find({ _id: { $in: user.taskIds } })
                .then(result => res.status(200).json(result))
                .catch(next);
        }).catch(next);
    },
    getCreatedExercisesOfUserById(req, res, next) {
        user_1.default.findById({ _id: req.params.id })
            .then(user => {
            exercise_1.default.find({ _id: { $in: user.createdExerciseIds } })
                .then(result => res.status(200).json(result))
                .catch(next);
        }).catch(next);
    },
    getTherapistsOfCurrentUser(req, res, next) {
        user_1.default.findById(req.user.sub)
            .then(user => {
            user_1.default.find({ _id: { $in: user.therapistIds } })
                .then(result => res.status(200).json(result))
                .catch(next);
        }).catch(next);
    },
    getPatientsOfCurrentUser(req, res, next) {
        user_1.default.findById(req.user.sub)
            .then(user => {
            user_1.default.find({ _id: { $in: user.patientIds } })
                .then(result => res.status(200).json(result))
                .catch(next);
        }).catch(next);
    },
    getTasksOfCurrentUser(req, res, next) {
        user_1.default.findById(req.user.sub)
            .then(user => {
            task_1.default.find({ _id: { $in: user.taskIds } })
                .then(result => res.status(200).json(result))
                .catch(next);
        }).catch(next);
    },
    getCreatedExercisesOfCurrentUser(req, res, next) {
        user_1.default.findById(req.user.sub)
            .then(user => {
            exercise_1.default.find({ _id: { $in: user.createdExerciseIds } })
                .then(result => res.status(200).json(result))
                .catch(next);
        }).catch(next);
    },
    searchBy(req, res, next) {
        user_1.default.where(req.query.field, { $match: req.query.regex })
            .then(result => res.status(200).json(result)).catch(next);
    },
};
//# sourceMappingURL=users.js.map