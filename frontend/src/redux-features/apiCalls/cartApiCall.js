import axios from 'axios'

const addItemToCart = async (productId, qty) => {
  console.log('Got the id', productId)
}

const cartItemAPI = {
  addItemToCart,
}

export default cartItemAPI
