"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = __importDefault(require("../controllers/tasks"));
const express_1 = require("express");
const router = express_1.Router();
router.route('/')
    .put(tasks_1.default.create)
    .patch(tasks_1.default.updateMany)
    .delete(tasks_1.default.deleteMany);
router.route('/all')
    .get(tasks_1.default.getAll);
router.route('/date?start=&end=')
    .get(tasks_1.default.getByDate);
router.route('/:id')
    .get(tasks_1.default.getById)
    .patch(tasks_1.default.updateById)
    .post(tasks_1.default.replaceById)
    .delete(tasks_1.default.deleteById);
router.route('/search?field=&regex=')
    .get(tasks_1.default.searchBy);
exports.default = router;
//# sourceMappingURL=tasks.router.js.map