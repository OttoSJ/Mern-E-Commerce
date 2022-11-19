import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import singleProductAPI from '../apiCalls/singleProductApiCall'

const initialState = {
  product: { reviews: [] },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getProductById = createAsyncThunk(
  'getProductById',
  async (productId, thunkAPI) => {
    try {
      return await singleProductAPI.getSingleProduct(productId)
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const singleProductReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = singleProductReducer.actions
export default singleProductReducer.reducer
