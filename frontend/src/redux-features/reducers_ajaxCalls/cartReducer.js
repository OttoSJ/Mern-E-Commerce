import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartItemAPI from '../apiCalls/cartApiCall'

const initialState = {
  cartItems: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const addCartItem = createAsyncThunk(
  'addCartItem',
  async (productId, thunkApi) => {
    try {
      return await cartItemAPI.addItemToCart(productId)
    } catch (error) {
      const message =
        (error.message && error.message.date && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const cartReducer = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        if (null) {
        }
        console.log('Payload', action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = action.payload
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cartReducer.actions
export default cartReducer.reducer
