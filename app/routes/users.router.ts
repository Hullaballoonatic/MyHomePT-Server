import controller from '../controllers/users'
import { Router } from 'express'

const router = Router()

router.route('/')
    .get(controller.getCurrent)
    .put(controller.create)
    .patch(controller.updateCurrent)
    .delete(controller.deleteCurrent)

router.route('/?patientEmail=')
    .post()

router.get('/therapists/', controller.getTherapistsOfCurrentUser)
router.get('/patients/', controller.getPatientsOfCurrentUser)
router.get('/tasks/', controller.getTasksOfCurrentUser)
router.get('/exercises/', controller.getCreatedExercisesOfCurrentUser)

router.route('/all')
    .get(controller.getAll)

router.route('/date?start=&end=')
    .get(controller.getByDate)

router.route('/:id')
    .get(controller.getById)
    .patch(controller.updateById)
    .post(controller.replaceById)
    .delete(controller.deleteById)

router.get('/:id/tasks/', controller.getTasksOfUserById)
router.get('/:id/therapists/', controller.getTherapistsOfUserById)
router.get('/:id/patients/', controller.getPatientsOfUserById)
router.get('/:id/exercises/', controller.getCreatedExercisesOfUserById)
router.route('/:id/?therapistId=')
    .post(controller.assignTherapist)
    .delete(controller.unassignTherapist)

router.route('/search?field=&regex=')
    .get(controller.searchBy)

export default router
