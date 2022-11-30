import path from 'path'
import express from 'express'
import connnectDB from './config/db.js'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// Config env file
dotenv.config()

// Load env vars
const PORT = process.env.PORT || 5000

// Routes files
import products from './routes/products_routes.js'
import users from './routes/user_routes.js'
import orders from './routes/order_routes.js'
import uploadRoutes from './routes/upload_routes.js'

const app = express()

// Connecting to database
connnectDB()

// Middelware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json({ limit: '175mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/products', products)
app.use('/api/users', users)
app.use('/api/orders', orders)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve() // The __dirname onle works with commonjs not import syntax. So here I'm creating a variable for __dirname with the path module.

if (process.env.NODE_ENV === 'production') {
  // This creating a static path for the frontend build folder
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  // This is pointing the build folder for production
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Api is running')
  })
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(
    `Server is in ${process.env.NODE_ENV} running or port ${PORT}`.white
  )
)
