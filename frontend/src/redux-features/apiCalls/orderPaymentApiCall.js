import axios from 'axios'

const updateOrder = async (orderId, paymentResults) => {
  const userToken = JSON.parse(localStorage.getItem('user')).token

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  }

  const {
    data: { data },
  } = await axios.put(`/api/orders/${orderId}/pay`, paymentResults, config)

  console.log(data)

  return data
}

const orderPaymentAPI = {
  updateOrder,
}

export default orderPaymentAPI
