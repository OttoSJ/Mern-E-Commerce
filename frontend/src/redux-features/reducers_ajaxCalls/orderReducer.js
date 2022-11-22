import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderAPI from '../apiCalls/orderApiCall'

const orderFromLocalStorage = localStorage.getItem('order')
  ? JSON.parse(localStorage.getItem('order'))
  : {}

const initialState = {
  order: orderFromLocalStorage,
  myOrders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const addOrder = createAsyncThunk(
  'addOrder',
  async (orderInfo, thunkAPI) => {
    try {
      return await orderAPI.createOrder(orderInfo)
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

export const getOrderDetails = createAsyncThunk(
  'getOrderDetails',
  async (orderInfo, thunkAPI) => {
    try {
      return await orderAPI.getOrder(orderInfo)
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

export const getAllMyOrders = createAsyncThunk(
  'getAllMyOrders',
  async (_, thunkAPI) => {
    try {
      return await orderAPI.getAllOrders()
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

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload

        localStorage.setItem('order', JSON.stringify(action.payload))
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload

        localStorage.setItem('order', JSON.stringify(action.payload))
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllMyOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllMyOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myOrders = action.payload

        localStorage.setItem('myOrders', JSON.stringify(action.payload))
      })
      .addCase(getAllMyOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = orderReducer.actions
export default orderReducer.reducer
