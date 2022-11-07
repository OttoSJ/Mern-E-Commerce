import express from 'express'
import {
  getAllProducts,
  getProductById,
} from '../controllers/product_controller.js'

const router = express.Router()

router.get('/', getAllProducts)

router.get('/:productId', getProductById)

export default router
