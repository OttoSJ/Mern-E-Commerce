import { updatePaymentMethod } from '../reducers_ajaxCalls/cartReducer'

const paymentMethod = async (paymentMethod, thunkAPI) => {
  thunkAPI.dispatch(updatePaymentMethod(paymentMethod))

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))

  return paymentMethod
}

const paymentAPI = { paymentMethod }
export default paymentAPI
