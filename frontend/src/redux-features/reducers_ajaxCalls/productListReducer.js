import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productsAPI from '../apiCalls/productListApiCall'

const productsFromLocalStorage = localStorage.getItem('products')
  ? JSON.parse(localStorage.getItem('products'))
  : []

const initialState = {
  products: productsFromLocalStorage,
  product: {},
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

export const getProductById = createAsyncThunk(
  'getProductById',
  async (productId, thunkAPI) => {
    try {
      return await productsAPI.getProductById(productId)
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createProduct = createAsyncThunk(
  'createProduct',
  async (productInfo, thunkAPI) => {
    const allProducts = thunkAPI.getState().products

    try {
      return await productsAPI.createProduct(productInfo, allProducts)
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (productInfo, thunkAPI) => {
    try {
      return await productsAPI.updateProduct(productInfo)
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (productId, thunkAPI) => {
    const {
      products: { data },
    } = thunkAPI.getState().products

    try {
      return await productsAPI.deleteProduct(productId, data)
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
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload

        localStorage.setItem('products', JSON.stringify(action.payload))
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
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
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload

        localStorage.setItem('products', JSON.stringify(action.payload))
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productReducer.actions
export default productReducer.reducer
