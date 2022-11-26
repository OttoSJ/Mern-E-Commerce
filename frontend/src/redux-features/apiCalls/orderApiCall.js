import axios from 'axios'

const createOrder = async (orderInfo) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${orderInfo.userToken}`,
    },
  }

  const orderDetails = {
    orderItems: orderInfo.cartItems,
    shippingAddress: orderInfo.shippingAddress,
    paymentMethod: orderInfo.paymentMethod,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
  }

  const {
    data: { data },
  } = await axios.post(`/api/orders`, orderDetails, config)

  return data
}

const getOrder = async (orderId) => {
  const token = JSON.parse(localStorage.getItem('user')).token

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const {
    data: { data },
  } = await axios.get(`/api/orders/${orderId}`, config)

  return data
}

const getAllMyOrders = async () => {
  const userToken = JSON.parse(localStorage.getItem('user')).token

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }

  const {
    data: { data },
  } = await axios.get(`/api/orders/myorders`, config)

  return data
}

const getAllOrders = async () => {
  const userToken = JSON.parse(localStorage.getItem('user')).token

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }

  const {
    data: { data },
  } = await axios.get(`/api/orders`, config)

  console.log(data)

  return data
}

const orderAPI = {
  createOrder,
  getOrder,
  getAllMyOrders,
  getAllOrders,
}

export default orderAPI
