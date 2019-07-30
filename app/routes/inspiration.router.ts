import controller from '../controllers/inspirations'
import { Router } from 'express'

const router = Router()

router.route('/')
    .get(controller.getRandom)
    .put(controller.create)
    .patch(controller.updateMany)
    .delete(controller.deleteMany)

router.route('/all')
    .get(controller.getAll)

router.route('/:id')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.delete)

router.route('/search?field=&regex=')
    .get(controller.searchBy)

export default router

