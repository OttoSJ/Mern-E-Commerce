import Orders from '../models/Order.js'
import asyncHandler from 'express-async-handler'

// @desc Get all orders
// @route GET /api/orders
// @access Private
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find({})

  res.status(200).json({ success: true, data: orders })
})

// @desc Get all logged in users orders
// @route GET /api/orders/myorders
// @access Private
const getAllMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString()

  const orders = await Orders.find({ user: userId })
  if (!orders.length === 0) {
    res.status(404)
    throw new Error('You have no orders')
  }
  res.status(200).json({ success: true, data: orders })
})

// @desc Get single order by id
// @route GET /api/orders/:orderId
// @access Private
const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.orderId).populate(
    'user',
    'name email'
  )

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  res.status(200).json({ success: true, data: order })
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

// @desc Update an order to paid
// @route PUT /api/orders/:orderId/pay
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.orderId)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.status.update_time,
      email_address: req.body.payer.email_address,
    }

    const updateOrder = await order.save()
    res.status(200).json({ success: true, data: updateOrder })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Delete an order
// @route DELETE /api/orders/:orderId
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
  const orders = await Orders.deleteOne(req.params)

  res.status(200).json({ success: true, data: 'Deleted an order' })
})

export {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllMyOrders,
}
