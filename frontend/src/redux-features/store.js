import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../redux-features/reducers_ajaxCalls/productListReducer"
import singleProductReducer from "../redux-features/reducers_ajaxCalls/singleProductReducer"

export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: singleProductReducer,
  },
})
