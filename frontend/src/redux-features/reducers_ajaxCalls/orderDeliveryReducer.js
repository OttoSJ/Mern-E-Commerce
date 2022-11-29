import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderDeliveryAPI from '../apiCalls/orderDeliveryApiCall'

const initialState = {
  orderDelivery: { success: false },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const orderDelivery = createAsyncThunk(
  'payOrder',
  async (orderInfo, thunkAPI) => {
    try {
      console.log(orderInfo)

      return await orderDeliveryAPI.updateDelivery(orderInfo)
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

export const orderDeliveryReducer = createSlice({
  name: 'orderDelivery',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(orderDelivery.pending, (state) => {
        state.isLoading = true
      })
      .addCase(orderDelivery.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orderDelivery = { succuess: true }
      })
      .addCase(orderDelivery.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = orderDeliveryReducer.actions
export default orderDeliveryReducer.reducer
