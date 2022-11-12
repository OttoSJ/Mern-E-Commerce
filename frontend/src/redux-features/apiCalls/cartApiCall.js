import axios from 'axios'

const addItemToCart = async ({ productId, qty }) => {
  const {
    data: { data },
  } = await axios.get(`/api/products/${productId}`)

  const payload = {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  }

  return payload
}

const removeItemFromCart = async (productId) => {
  const payload = {
    productId,
  }
  return payload
}

const cartItemAPI = {
  addItemToCart,
  removeItemFromCart,
}

export default cartItemAPI
