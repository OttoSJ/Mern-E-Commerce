import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import productsAPI from "./productListApiCall"

const initialState = {
  productList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const getProductList = createAsyncThunk(
  "getAllProducts",
  async (_, thuckAPI) => {
    try {
      return await productsAPI.getAllProducts()
    } catch (error) {
      const message =
        (error.message && error.reponse.data && error.reponse.data.message) ||
        error.message ||
        error.toString()
      return thuckAPI.rejectWithValue(message)
    }
  }
)

export const productReducer = createSlice({
  name: "products",
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
