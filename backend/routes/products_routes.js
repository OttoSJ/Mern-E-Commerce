import express from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product_controller.js'

import { protect, authorize } from '../middleware/auth_middleware.js'
const router = express.Router()

router.get('/', getAllProducts)

router.get('/:productId', getProductById)

router.post('/', protect, authorize, createProduct)

router.put('/:productId', protect, authorize, updateProduct)

router.delete('/:productId', protect, authorize, deleteProduct)

export default router
