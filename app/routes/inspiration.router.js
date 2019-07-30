"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inspirations_1 = __importDefault(require("../controllers/inspirations"));
const express_1 = require("express");
const router = express_1.Router();
router.route('/')
    .get(inspirations_1.default.getRandom)
    .put(inspirations_1.default.create)
    .patch(inspirations_1.default.updateMany)
    .delete(inspirations_1.default.deleteMany);
router.route('/all')
    .get(inspirations_1.default.getAll);
router.route('/:id')
    .get(inspirations_1.default.get)
    .patch(inspirations_1.default.update)
    .delete(inspirations_1.default.delete);
router.route('/search?field=&regex=')
    .get(inspirations_1.default.searchBy);
exports.default = router;
//# sourceMappingURL=inspiration.router.js.map