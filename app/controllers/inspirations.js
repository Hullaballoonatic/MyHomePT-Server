"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inspiration_1 = __importDefault(require("../models/inspiration"));
exports.default = {
    get(req, res, next) {
        inspiration_1.default.find({ _id: req.params.id }).then(result => result ? res.status(200).json(result) : res.status(204).json({ message: 'there are no inspiring messages stored.' })).catch(next);
    },
    getAll(req, res, next) {
        inspiration_1.default.find({}).then(result => res.status(200).json(result)).catch(next);
    },
    getRandom(req, res, next) {
        inspiration_1.default.count()
            .then(count => {
            const skip = Math.floor(Math.random() * count);
            inspiration_1.default.findOne({}, null, { skip })
                .then(result => res.status(200).json(result))
                .catch(next);
        })
            .catch(next);
    },
    create(req, res, next) {
        inspiration_1.default.create(req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    update(req, res, next) {
        inspiration_1.default.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    updateMany(req, res, next) {
        inspiration_1.default.update(req.body.conditions, req.body.params, {
            runValidators: true,
            multi: true,
        }).then(result => res.status(200).json(result)).catch(next);
    },
    delete(req, res, next) {
        inspiration_1.default.findOneAndDelete({ _id: req.params._id })
            .then(result => res.status(200).json(result)).catch(next);
    },
    deleteMany(req, res, next) {
        inspiration_1.default.deleteMany(req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    searchBy(req, res, next) {
        inspiration_1.default.where(req.query.field, { $match: req.query.regex })
            .then(result => res.status(200).json(result)).catch(next);
    },
};
//# sourceMappingURL=inspirations.js.map