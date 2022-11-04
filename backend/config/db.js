import mongoose from 'mongoose'

const connnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold)
    process.exit(1)
  }
}

export default connnectDB
