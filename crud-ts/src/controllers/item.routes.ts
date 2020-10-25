import { Router } from 'express'
import {
  deleteItem,
  updateItem,
  showItem,
  createItem,
  showAllItems
} from './item.handler'

export const router = Router({ mergeParams: true })

router
  .route('/')
  .get(showAllItems)
  .post(createItem)

router
  .route('/:itemId')
  .get(showItem)
  .put(updateItem)
  .delete(deleteItem)
