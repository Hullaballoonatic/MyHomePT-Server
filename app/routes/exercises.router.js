"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exercises_1 = __importDefault(require("../controllers/exercises"));
const express_1 = require("express");
const router = express_1.Router();
router.route('/')
    .get(exercises_1.default.getDefault)
    .put(exercises_1.default.create)
    .patch(exercises_1.default.updateMany)
    .delete(exercises_1.default.deleteMany);
router.route('/all')
    .get(exercises_1.default.getAll);
router.route('/date?start=&end=')
    .get(exercises_1.default.getByDate);
router.route('/:id')
    .get(exercises_1.default.getById)
    .patch(exercises_1.default.updateById)
    .delete(exercises_1.default.deleteById);
router.route('/search?field=&regex=')
    .get(exercises_1.default.searchBy);
exports.default = router;
//# sourceMappingURL=exercises.router.js.map