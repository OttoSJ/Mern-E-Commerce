import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shippingAPI from '../apiCalls/shippingApiCall'

const shippingInfoFromLocalStorage = localStorage.getItem('shipping')
  ? JSON.parse(localStorage.getItem('shipping'))
  : null

const initialState = {
  shippingAddress: shippingInfoFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const saveShippingAddress = createAsyncThunk(
  'saveShippingAddress',
  async (shippingInfo, thunkAPI) => {
    try {
      return await shippingAPI.shippingAddress(shippingInfo, thunkAPI)
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

export const shippingReducer = createSlice({
  name: 'shippingAddress',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveShippingAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveShippingAddress.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(saveShippingAddress.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = shippingReducer.actions
export default shippingReducer.reducer
