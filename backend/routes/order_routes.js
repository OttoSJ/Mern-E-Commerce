import express from 'express'
import {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/order_controller.js'

import { protect } from '../middleware/auth_middleware.js'
const router = express.Router()

router.get('/', protect, getAllOrders)
router.get('/:orderId', protect, getSingleOrder)
router.post('/', protect, createOrder)
router.put('/:orderId', protect, updateOrder)
router.delete('/:orderId', protect, deleteOrder)

export default router
