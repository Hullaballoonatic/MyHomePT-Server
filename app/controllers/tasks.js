"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("../models/task"));
exports.default = {
    getAll(req, res, next) {
        task_1.default.find({}).then(result => res.status(200).json(result)).catch(next);
    },
    getById(req, res, next) {
        task_1.default.findOne({ _id: req.params.id })
            .then(result => res.status(200).json(result)).catch(next);
    },
    getByDate(req, res, next) {
        task_1.default.find({ createdOn: { $gte: req.query.start, $lte: req.query.end } }, req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    create(req, res, next) {
        task_1.default.create(req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    updateById(req, res, next) {
        task_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true })
            .then(result => res.status(200).json(result)).catch(next);
    },
    updateMany(req, res, next) {
        task_1.default.update(req.body.conditions, req.body.params, { runValidators: true, multi: true })
            .then(result => res.status(200).json(result)).catch(next);
    },
    deleteById(req, res, next) {
        task_1.default.findOneAndRemove({ _id: req.params.id })
            .then(result => res.status(200).json(result)).catch(next);
    },
    deleteMany(req, res, next) {
        task_1.default.deleteMany(req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    replaceById(req, res, next) {
        task_1.default.findOneAndReplace({ _id: req.params.id }, req.body)
            .then(result => res.status(200).json(result)).catch(next);
    },
    searchBy(req, res, next) {
        task_1.default.where(req.query.field, { $match: req.query.regex })
            .then(result => res.status(200).json(result)).catch(next);
    },
};
//# sourceMappingURL=tasks.js.map