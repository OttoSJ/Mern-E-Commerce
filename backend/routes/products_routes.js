import express from 'express'
import {
  getAllProducts,
  getTopProducts,
  getProductById,
  createProduct,
  createReview,
  updateProduct,
  deleteProduct,
} from '../controllers/product_controller.js'

import { protect, authorize } from '../middleware/auth_middleware.js'
const router = express.Router()

router.get('/', getAllProducts)

router.get('/top', getTopProducts)

router.get('/:productId', getProductById)

router.post('/', protect, authorize, createProduct)

router.post('/:productId/reviews', protect, createReview)

router.put('/:productId', protect, authorize, updateProduct)

router.delete('/:productId', protect, authorize, deleteProduct)

export default router
