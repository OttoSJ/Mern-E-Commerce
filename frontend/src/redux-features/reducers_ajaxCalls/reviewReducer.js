import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reviewAPI from '../apiCalls/reviewApiCall'

const initialState = {
  reviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createReview = createAsyncThunk(
  'creatReview',
  async (reviewInfo, thunkAPI) => {
    try {
      return await reviewAPI.createReview(reviewInfo)
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

export const reviewReducer = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.reviews = action.payload
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = reviewReducer.actions
export default reviewReducer.reducer
