import controller from '../controllers/exercises'
import { Router } from 'express'

const router = Router()

router.route('/')
    .get(controller.getDefault)
    .put(controller.create)
    .patch(controller.updateMany)
    .delete(controller.deleteMany)

router.route('/all')
    .get(controller.getAll)

router.route('/date?start=&end=')
    .get(controller.getByDate)

router.route('/:id')
    .get(controller.getById)
    .patch(controller.updateById)
    .delete(controller.deleteById)

router.route('/search?field=&regex=')
    .get(controller.searchBy)

export default router
