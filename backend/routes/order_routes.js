import express from 'express'
import {
  getAllOrders,
  getAllMyOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  //   getAllTheseOrders,
} from '../controllers/order_controller.js'

import { protect } from '../middleware/auth_middleware.js'
const router = express.Router()

router.get('/', protect, getAllOrders)
router.get('/myorders', protect, getAllMyOrders)
router.get('/:orderId', protect, getSingleOrder)
router.post('/', protect, createOrder)
router.put('/:orderId/pay', protect, updateOrder)
router.delete('/:orderId', protect, deleteOrder)

export default router
