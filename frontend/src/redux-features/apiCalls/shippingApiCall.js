const shippingAddress = async (shippingInfo) => {
  if (shippingInfo) {
    localStorage.setItem('shipping', JSON.stringify(shippingInfo))
  } else return {}
}

const shippingAPI = {
  shippingAddress,
}

export default shippingAPI
