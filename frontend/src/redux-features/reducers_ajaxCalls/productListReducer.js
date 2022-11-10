import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productsAPI from '../apiCalls/productListApiCall'

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getProductList = createAsyncThunk(
  'getAllProducts',
  async (_, thunkAPI) => {
    try {
      return await productsAPI.getAllProducts()
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productReducer.actions
export default productReducer.reducer
