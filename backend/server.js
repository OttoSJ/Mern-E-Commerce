import express from 'express'
import connnectDB from './config/db.js'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

// Load env vars
const PORT = process.env.PORT || 5000

// Routes files
import products from './routes/products_routes.js'

const app = express()

// Connecting to database
connnectDB()

// Middelware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

app.use('/api/products', products)

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.NODE_ENV} running or port ${PORT}`.white
  )
)
