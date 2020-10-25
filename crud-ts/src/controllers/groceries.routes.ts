import { Router } from 'express'
import { router as itemsRouter } from './item.routes'
import {
  showAllGroceries,
  deleteGroceries,
  updateGroceries,
  showOneGroceries,
  createNewGroceries
} from './groceries.handler'

export const router = Router()

router
  .route('/')
  .get(showAllGroceries)
  .post(createNewGroceries)

router
  .route('/:id')
  .get(showOneGroceries)
  .put(updateGroceries)
  .delete(deleteGroceries)

router.use('/:id/items', itemsRouter)
