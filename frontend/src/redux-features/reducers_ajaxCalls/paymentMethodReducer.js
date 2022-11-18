import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import paymentAPI from '../apiCalls/paymentApiCall'

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null

const initialState = {
  paymentMethod: paymentMethodFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const savePaymentMethod = createAsyncThunk(
  'savePaymentMethod',
  async (paymentMethod, thunkAPI) => {
    try {
      return await paymentAPI.paymentMethod(paymentMethod)
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

export const paymentReducer = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(savePaymentMethod.pending, (state) => {
        state.isLoading = true
      })
      .addCase(savePaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.paymentMethod = action.payload
      })
      .addCase(savePaymentMethod.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = paymentReducer.actions
export default paymentReducer.reducer
