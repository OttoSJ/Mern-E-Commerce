import express from 'express'
import products from './data/product.js'
import connnectDB from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

// Connecting to database
connnectDB()

// Middelware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:productId', (req, res) => {
  const product = products.find((p) => p._id === req.params.productId)
  res.json(product)
})

app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.NODE_ENV} running or port ${PORT}`.white
  )
)
