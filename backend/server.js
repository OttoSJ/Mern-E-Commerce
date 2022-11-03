const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const products = require('./data/product')
const PORT = process.env.PORT || 5000
const app = express()

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

app.listen(PORT, () => console.log(`Server is running or port ${PORT}`))
