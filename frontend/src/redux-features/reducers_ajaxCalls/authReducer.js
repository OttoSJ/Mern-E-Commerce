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
  async (userLoginInfo, thunkAPI) => {
    try {
      return await authAPI.loginUser(userLoginInfo)
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

export const logout = createAsyncThunk(
  'logoutUser',
  async (userId, thunkAPI) => {
    try {
      return await authAPI.logoutUser()
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

export const registerUser = createAsyncThunk(
  'registerUser',
  async (userInfo, thunkAPI) => {
    try {
      return await authAPI.register(userInfo)
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

export const updateUser = createAsyncThunk(
  'updateUser',
  async (userInfo, thunkAPI) => {
    try {
      return await authAPI.updateUser(userInfo)
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
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = userReducer.actions
export default userReducer.reducer
