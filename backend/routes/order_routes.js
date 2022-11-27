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

import { protect, authorize } from '../middleware/auth_middleware.js'
const router = express.Router()

router.get('/', protect, authorize, getAllOrders)
router.get('/myorders', protect, getAllMyOrders)
router.get('/:orderId', protect, authorize, getSingleOrder)
router.post('/', protect, authorize, createOrder)
router.put('/:orderId/pay', protect, authorize, updateOrder)
router.delete('/:orderId', protect, authorize, deleteOrder)

export default router
