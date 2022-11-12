import Product from '../models/Product.js'
import asyncHandler from 'express-async-handler'

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // res.status(401)
  // throw new Error('Not Authorized')
  res.status(200).json({ success: true, data: products })
})

// @desc Get single product
// @route GET /api/products/:productId
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId)

  if (product) {
    res.status(200).json({ success: true, data: product })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Delete single product by id
// @route DELETE /api/products/:productId
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId)

  res.status(200).json({ success: true, data: product })
})

export { getAllProducts, getProductById, deleteProduct }
