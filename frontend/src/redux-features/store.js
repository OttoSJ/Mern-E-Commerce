import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../redux-features/reducers_ajaxCalls/productListReducer'
import productDetailsReducer from '../redux-features/reducers_ajaxCalls/singleProductReducer'
import cartReducer from '../redux-features/reducers_ajaxCalls/cartReducer'
import userReducer from '../redux-features/reducers_ajaxCalls/authReducer'
import shippingReducer from '../redux-features/reducers_ajaxCalls/shippingReducer'
import paymentReducer from '../redux-features/reducers_ajaxCalls/paymentMethodReducer'
import orderReducer from '../redux-features/reducers_ajaxCalls/orderReducer'
import orderPaymentReducer from '../redux-features/reducers_ajaxCalls/orderPaymentReducer'
import userListReducer from '../redux-features/reducers_ajaxCalls/userReducer'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    shipping: shippingReducer,
    paymentMethod: paymentReducer,
    order: orderReducer,
    orderPayment: orderPaymentReducer,
    auth: userReducer,
    userList: userListReducer,
  },
})
