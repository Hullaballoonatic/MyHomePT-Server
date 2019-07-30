import InspiringMessage from '../models/inspiration'

export default {
    get(req, res, next) {
        InspiringMessage.find({_id: req.params.id}).then(result => result ? res.status(200).json(result) : res.status(204).json({message: 'there are no inspiring messages stored.'})).catch(next)
    },

    getAll(req, res, next) {
        InspiringMessage.find({}).then(result => res.status(200).json(result)).catch(next)
    },

    getRandom(req, res, next) {
        InspiringMessage.count()
            .then(count => {
                const skip = Math.floor(Math.random() * count)
                InspiringMessage.findOne({}, null, {skip})
                    .then(result => res.status(200).json(result))
                    .catch(next)
            })
            .catch(next)
    },

    create(req, res, next) {
        InspiringMessage.create(req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    update(req, res, next) {
        InspiringMessage.findOneAndUpdate({_id: req.params.id}, req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    updateMany(req, res, next) {
        InspiringMessage.update(req.body.conditions, req.body.params, {
            runValidators: true,
            multi: true,
        }).then(result => res.status(200).json(result)).catch(next)
    },

    delete(req, res, next) {
        InspiringMessage.findOneAndDelete({_id: req.params._id})
            .then(result => res.status(200).json(result)).catch(next)
    },

    deleteMany(req, res, next) {
        InspiringMessage.deleteMany(req.body)
            .then(result => res.status(200).json(result)).catch(next)
    },

    searchBy(req, res, next) {
        InspiringMessage.where(req.query.field, {$match: req.query.regex})
            .then(result => res.status(200).json(result)).catch(next)
    },
}
