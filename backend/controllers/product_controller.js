import Product from '../models/Product.js'
// import Review from '../models/Review.js'
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

// @desc Create product
// @route POST /api/products/:productId
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body)
  const product = await Product.create(req.body)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.status(200).json({ success: true, data: product })
})

// @desc Create new review
// @route POST /api/products/:productId/reviews
// @access Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.productId)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    console.log(product)
    await product.save()
    res.status(201).json({ success: true, message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Update product
// @route PUT /api/products/:productId
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    {
      new: true,
    }
  )
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.status(200).json({ success: true, data: product })
})

// @desc Delete product
// @route DELETE /api/products/:productId
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId)

  res.status(200).json({ success: true, data: product })
})

export {
  getAllProducts,
  getProductById,
  createProduct,
  createReview,
  updateProduct,
  deleteProduct,
}
