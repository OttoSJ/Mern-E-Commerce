import { updateShippingInfo } from '../../redux-features/reducers_ajaxCalls/cartReducer'

const shippingAddress = async (shippingInfo, thunkAPI) => {
  if (shippingInfo) {
    thunkAPI.dispatch(updateShippingInfo(shippingInfo))

    localStorage.setItem('shipping', JSON.stringify(shippingInfo))
  } else return {}
}

const shippingAPI = {
  shippingAddress,
}

export default shippingAPI
