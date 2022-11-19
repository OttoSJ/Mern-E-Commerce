import axios from 'axios'

const createOrder = async (orderInfo) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${orderInfo.userToken}`,
    },
  }

  console.log('Order Created', orderInfo.cartItems)
  const orderDetails = {
    orderItems: orderInfo.cartItems,
    shippingAddress: orderInfo.shipping,
    paymentMethod: orderInfo.paymentMethod,
    taxPrice: orderInfo.taxPrice,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
  }

  const {
    data: { data },
  } = await axios.post(`/api/orders`, orderDetails, config)

  console.log(data)

  return data
}
const orderAPI = {
  createOrder,
}

export default orderAPI
