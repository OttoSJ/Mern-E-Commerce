import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderPaymentAPI from '../apiCalls/orderPaymentApiCall'

const initialState = {
  orderPayment: { success: false },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const orderPayment = createAsyncThunk(
  'payOrder',
  async (paymentResults, thunkAPI) => {
    const { order } = thunkAPI.getState().order

    try {
      return await orderPaymentAPI.updateOrder(order._id, paymentResults)
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

export const orderPaymentReducer = createSlice({
  name: 'orderPayment',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(orderPayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(orderPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orderPayment = { succuess: true }

        localStorage.removeItem('shipping')
        localStorage.removeItem('cartItems')
        localStorage.removeItem('order')
        localStorage.removeItem('paymentMethod')
      })
      .addCase(orderPayment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = orderPaymentReducer.actions
export default orderPaymentReducer.reducer
