import axios from 'axios'

const updateDelivery = async (orderInfo) => {
  const token = JSON.parse(localStorage.getItem('user')).token

  console.log(orderInfo)
  const { orderId, deliverStatus } = orderInfo
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const payload = {
    isDelivered: deliverStatus,
  }

  const {
    data: { data },
  } = await axios.put(`/api/orders/${orderId}/delivered`, payload, config)
  console.log(data)
  return
}

const orderDeliveryAPI = {
  updateDelivery,
}

export default orderDeliveryAPI
