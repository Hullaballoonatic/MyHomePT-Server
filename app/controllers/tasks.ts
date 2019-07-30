import Task from '../models/task'

export default {
    getAll(req, res, next) {
        Task.find({}).then(result => res.status(200).json(result)).catch(next)
    },

    getById(req, res, next) {
        Task.findOne({_id: req.params.id})
            .then(result => res.status(200).json(result)).catch(next)
    },

    getByDate(req, res, next) {
        Task.find({createdOn: {$gte: req.query.start, $lte: req.query.end}}, req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    create(req, res, next) {
        Task.create(req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    updateById(req, res, next) {
        Task.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true})
            .then(result => res.status(200).json(result)).catch(next)
    },

    updateMany(req, res, next) {
        Task.update(req.body.conditions, req.body.params, {runValidators: true, multi: true})
            .then(result => res.status(200).json(result)).catch(next)
    },

    deleteById(req, res, next) {
        Task.findOneAndRemove({_id: req.params.id})
            .then(result => res.status(200).json(result)).catch(next)
    },

    deleteMany(req, res, next) {
        Task.deleteMany(req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    replaceById(req, res, next) {
        Task.findOneAndReplace({_id: req.params.id}, req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    searchBy(req, res, next) {
        Task.where(req.query.field, {$match: req.query.regex})
            .then(result => res.status(200).json(result)).catch(next)
    },
}
