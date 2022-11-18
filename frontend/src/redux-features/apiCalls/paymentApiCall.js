const paymentMethod = async (paymentMethod) => {
  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
  return paymentMethod
}

const paymentAPI = { paymentMethod }
export default paymentAPI
