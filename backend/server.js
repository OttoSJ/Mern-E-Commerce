import express from 'express'
import connnectDB from './config/db.js'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

// Load env vars
const PORT = process.env.PORT || 5000

// Routes files
import products from './routes/products_routes.js'
import users from './routes/user_routes.js'

const app = express()

// Connecting to database
connnectDB()

// Middelware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

app.use('/api/products', products)
app.use('/api/users', users)

app.get('/', (req, res) => {
  res.send('Api is running')
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.NODE_ENV} running or port ${PORT}`.white
  )
)
