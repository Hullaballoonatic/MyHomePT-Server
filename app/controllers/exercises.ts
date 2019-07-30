import Exercise from '../models/exercise'

export default {
    getAll(req, res, next) {
        Exercise.find({})
            .then(result => res.status(200).json(result))
            .catch(next)
    },

    getDefault(req, res, next) {
        Exercise.find({creatorId: null})
            .then(result => res.status(200).json(result))
            .catch(next)
    },

    getById(req, res, next) {
        Exercise.findOne({_id: req.params.id})
            .then(result => res.status(200).json(result))
            .catch(next)
    },

    getByDate(req, res, next) {
        Exercise.find({createdOn: {$gte: req.params.start, $lte: req.params.end}}, req.body)
            .then(result => res.status(200).json(result))
            .catch(next)
    },

    create(req, res, next) {
        Exercise.create(req.body)
            .then(result => res.status(200).json(result))
            .catch(next)
    },

    updateById(req, res, next) {
        Exercise.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true})
            .then(result => res.status(200).json(result))
            .catch(next)
    },

    updateMany(req, res, next) {
        Exercise.update(req.body.conditions, req.body.params, {runValidators: true, multi: true})
            .then(result => res.status(200).json(result))
            .catch(next)
    },

    deleteById(req, res, next) {
        Exercise.findOneAndRemove({_id: req.params.id})
            .then(result => res.status(200)
                .json(result)).catch(next)
    },

    deleteMany(req, res, next) {
        Exercise.deleteMany(req.body)
            .then(result => res.status(200).json(result))
            .catch(next)
    },

    searchBy(req, res, next) {
        Exercise.where(req.query.field, {$match: req.query.regex})
            .then(result => res.status(200).json(result)).catch(next)
    },
}
