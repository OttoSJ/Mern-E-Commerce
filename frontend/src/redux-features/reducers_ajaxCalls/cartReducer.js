import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartItemAPI from '../apiCalls/cartApiCall'

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cartItems: cartItemsFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const addCartItem = createAsyncThunk(
  'addCartItem',
  async (productInfo, thunkApi) => {
    // Getting current Items from the redux store
    let currentCartItems = thunkApi.getState().cart.cartItems

    // Geting the requested item from the database
    const item = await cartItemAPI.addItemToCart(productInfo)

    // Checking if requested item is in already in the currentCartItem array
    const existItem = currentCartItems.find((x) => x.product === item.product)

    try {
      if (existItem) {
        // Spreading the cart items here to remove the state
        currentCartItems = [...currentCartItems]
        currentCartItems.forEach((currentProduct, indx) => {
          // Checking to see if the quantity has changed
          if (
            currentProduct.product === item.product &&
            currentProduct.qty !== item.qty
          ) {
            // Updating the quantity of the item
            currentCartItems.splice(indx, 1, item)
          }
        })

        return [...currentCartItems]
      } else {
        return [...currentCartItems, item]
      }
    } catch (error) {
      const message =
        (error.message && error.message.date && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const removeCartItem = createAsyncThunk(
  'removeItemFromCart',
  async (productId, thunkAPI) => {
    try {
      return await cartItemAPI.removeItemFromCart(productId)
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
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
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = action.payload
        localStorage.setItem('cartItems', JSON.stringify(action.payload))
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload.productId
        )
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cartReducer.actions
export default cartReducer.reducer
