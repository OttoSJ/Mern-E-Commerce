import Orders from '../models/Order.js'
import asyncHandler from 'express-async-handler'

// @desc Get all orders
// @route GET /api/orders
// @access Private
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find({})

  res.status(200).json({ success: true, data: orders })
})

// @desc Get single order
// @route GET /api/orders/:orderId
// @access Private
const getSingleOrder = asyncHandler(async (req, res) => {
  const orders = await Orders.findById(req.params.orderId)

  res.status(200).json({ success: true, data: orders })
})

// @desc Create an order
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items given')
  } else {
    const order = new Orders({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(200).json({ success: true, data: createdOrder })
  }
})

// @desc Update an order
// @route PUT /api/orders/:orderId
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
  //   const orders = await Orders.updateOne(req.params, req.body)

  res.status(200).json({ success: true, data: 'Updated an order' })
})

// @desc Delete an order
// @route DELETE /api/orders/:orderId
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
  const orders = await Orders.deleteOne(req.params)

  res.status(200).json({ success: true, data: 'Deleted an order' })
})

export { getAllOrders, getSingleOrder, createOrder, updateOrder, deleteOrder }
