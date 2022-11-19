import { updatePaymentMethod } from '../../redux-features/reducers_ajaxCalls/cartReducer'

const paymentMethod = async (paymentMethod, thunkAPI) => {
  thunkAPI.dispatch(updatePaymentMethod(paymentMethod))

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))

  return paymentMethod
}

const paymentAPI = { paymentMethod }
export default paymentAPI
