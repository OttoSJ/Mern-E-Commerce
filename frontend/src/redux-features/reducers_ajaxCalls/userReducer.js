import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersAPI from '../apiCalls/usersApiCall'

const allUsersFromLocalStorage = localStorage.getItem('allUsers')
  ? JSON.parse(localStorage.getItem('allUsers'))
  : []

const initialState = {
  allUsers: allUsersFromLocalStorage,
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getAllUsers = createAsyncThunk(
  'getAllUsersAdmin',
  async (_, thunkAPI) => {
    try {
      return await usersAPI.getUserList()
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

export const getUserById = createAsyncThunk(
  'getUserByIdAdmin',
  async (userId, thunkAPI) => {
    try {
      return await usersAPI.getUserById(userId)
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
  'updateUserAdmin',
  async (userInfo, thunkAPI) => {
    console.log(userInfo)
    try {
      return await usersAPI.updateUser(userInfo)
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
export const deleteUser = createAsyncThunk(
  'deleteUserAdmin',
  async (userId, thunkAPI) => {
    try {
      return await usersAPI.deleteUser(userId)
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

export const userListReducer = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allUsers = action.payload

        localStorage.setItem('allUsers', JSON.stringify(action.payload))
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload._id
        )

        localStorage.setItem('allUsers', JSON.stringify(state.allUsers))
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
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
      })
  },
})

export const { reset } = userListReducer.actions
export default userListReducer.reducer
