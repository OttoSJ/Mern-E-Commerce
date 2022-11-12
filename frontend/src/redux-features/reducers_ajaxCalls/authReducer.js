import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '../apiCalls/authApiCall'

const userInfoFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const initialState = {
  user: userInfoFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const login = createAsyncThunk(
  'loginUser',
  async (userInfo, thunkAPI) => {
    try {
      return await authAPI.loginUser(userInfo)
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk('loginUser', async (_, thunkAPI) => {
  try {
    return await authAPI.logoutUser()
  } catch (error) {
    const message =
      (error.response && error.reponse.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        // localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userReducer.actions
export default userReducer.reducer

//   .addCase(removeCartItem.pending, (state) => {
//     state.isLoading = true
//   })
//   .addCase(removeCartItem.fulfilled, (state, action) => {
//     state.isLoading = false
//     state.isSuccess = true
//     state.cartItems = state.cartItems.filter(
//       (cartItem) => cartItem.product !== action.payload.productId
//     )
//     localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
//   })

//   .addCase(removeCartItem.rejected, (state, action) => {
//     state.isLoading = false
//     state.isError = true
//     state.message = action.payload
//   })
