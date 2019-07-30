"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../controllers/users"));
const express_1 = require("express");
const router = express_1.Router();
router.route('/')
    .get(users_1.default.getCurrent)
    .put(users_1.default.create)
    .patch(users_1.default.updateCurrent)
    .delete(users_1.default.deleteCurrent);
router.get('/therapists/', users_1.default.getTherapistsOfCurrentUser);
router.get('/patients/', users_1.default.getPatientsOfCurrentUser);
router.get('/tasks/', users_1.default.getTasksOfCurrentUser);
router.get('/exercises/', users_1.default.getCreatedExercisesOfCurrentUser);
router.route('/all')
    .get(users_1.default.getAll);
router.route('/date?start=&end=')
    .get(users_1.default.getByDate);
router.route('/:id')
    .get(users_1.default.getById)
    .patch(users_1.default.updateById)
    .post(users_1.default.replaceById)
    .delete(users_1.default.deleteById);
router.get('/:id/tasks/', users_1.default.getTasksOfUserById);
router.get('/:id/therapists/', users_1.default.getTherapistsOfUserById);
router.get('/:id/patients/', users_1.default.getPatientsOfUserById);
router.get('/:id/exercises/', users_1.default.getCreatedExercisesOfUserById);
router.route('/:id/?therapistId=')
    .post(users_1.default.assignTherapist)
    .delete(users_1.default.unassignTherapist);
router.route('/search?field=&regex=')
    .get(users_1.default.searchBy);
exports.default = router;
//# sourceMappingURL=users.router.js.map