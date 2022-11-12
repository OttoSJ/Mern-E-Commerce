import express from 'express'
import {
  getAllProducts,
  getProductById,
  deleteProduct,
} from '../controllers/product_controller.js'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:productId', getProductById)

router.delete('/:productId', deleteProduct)

export default router
