import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderAPI from '../apiCalls/orderApiCall'

const orderFromLocalStorage = {
  shipping: JSON.parse(localStorage.getItem('shipping')),
  user: JSON.parse(localStorage.getItem('user')),
  paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')),
  orderItems: JSON.parse(localStorage.getItem('cartItems')),
}

const initialState = {
  order: orderFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const addOrder = createAsyncThunk(
  'addOrder',
  async (orderInfo, thunkAPI) => {
    try {
      return await orderAPI.createOrder(orderInfo)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload

        localStorage.setItem('order', JSON.stringify(action.payload))
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = orderReducer.actions
export default orderReducer.reducer
