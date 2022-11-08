import { configureStore } from "@reduxjs/toolkit"
import productReducer from "../redux-features/reducers_ajaxCalls/productListReducer"

export const store = configureStore({
  reducer: {
    productList: productReducer,
  },
})
